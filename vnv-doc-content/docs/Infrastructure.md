# Infrastructure

Voici un descriptif de l'architecture de notre système VNV (Validation & Verification).

## Context

Notre infrastructure est composée de plusieurs serveurs interconnectés qui travaillent ensemble pour fournir une plateforme complète de gestion de projets et de documents.

#### Servers
- **vnv-rest** (port 3000) - Serveur principal contenant les processus métier qui interagissent avec la base de données Neo4j. Il expose une API REST pour toutes les opérations métier.
- **vnv-proxy** (port 8080) - Serveur proxy central qui gère les Elastic Session Systems (ESS), orchestre la communication entre tous les services et agit comme point d'entrée principal de l'infrastructure.
- **vnv-pnp** (port 8081) - Serveur dédié à la communication avec les services Microsoft (SharePoint, OneDrive, Teams, etc.).
- **vnv-event-bridge** (port 8082) - Serveur dédié à la réception et au traitement des signaux et événements externes (webhooks, notifications, etc.).
- **minio** (port 9000) - Serveur de stockage d'objets (blob storage) compatible avec l'API S3 d'Amazon.
- **neo4j** (port 7474) - Base de données orientée graphe servant de base de données globale pour toutes les entités métier.
- **redis** (port 6379) - Base de données en mémoire utilisée pour l'orchestration, la gestion de cache et la synchronisation inter-services.

#### Packages
- **vnv-sdk** - Librairie partagée permettant tous les traitements métier, modèles métier, etc. Elle est utilisée à la fois en front-end et back-end. Elle permet de manipuler des modèles de données qui transitent entre les services et d'uniformiser l'utilisation des processus métier dans tous les services et applications. Elle contient aussi un client fetch permettant d'interagir avec l'infrastructure au travers de layers API dédiés.

```mermaid
graph TB
    subgraph "Frontend"
        APP[Applications Client]
    end
    
    subgraph "Backend Services"
        PROXY[vnv-proxy:8080<br/>Orchestrateur & ESS]
        REST[vnv-rest:3000<br/>Processus Métier]
        PNP[vnv-pnp:8081<br/>Services Microsoft]
        BRIDGE[vnv-event-bridge:8082<br/>Événements Externes]
    end
    
    subgraph "Data Layer"
        NEO4J[(neo4j:7474<br/>Base Graphe)]
        REDIS[(redis:6379<br/>Cache & Orchestration)]
        MINIO[(minio:9000<br/>Blob Storage)]
    end
    
    APP -->|HTTP/WebSocket| PROXY
    PROXY --> REST
    PROXY --> PNP
    PROXY --> BRIDGE
    PROXY --> REDIS
    PROXY --> MINIO
    REST --> NEO4J
    PNP -->|API Microsoft| MS[Microsoft 365]
    BRIDGE -->|Webhooks| EXT[Services Externes]
    
    style PROXY fill:#4a90e2
    style REST fill:#50c878
    style PNP fill:#ff6b6b
    style BRIDGE fill:#feca57
```

## Data Layer

### Minio

Minio est un serveur de stockage d'objets open-source compatible avec l'API Amazon S3. Il permet de stocker et gérer des fichiers de toute taille de manière scalable et performante.

**Utilisation dans notre système :**
- **Développement local** : Minio est déployé localement via Docker pour simuler un environnement S3
- **Production cloud** : AWS S3 remplace Minio pour bénéficier de la scalabilité et de la fiabilité d'AWS

**Cas d'usage :**
- Stockage des documents de projets (PDF, Word, Excel, etc.)
- Stockage des fichiers temporaires générés par les processus métier
- Stockage des exports et rapports
- Gestion des versions de fichiers
- Hébergement des assets statiques

### Neo4j

Neo4j est une base de données orientée graphe qui stocke les données sous forme de nœuds et de relations. Elle est particulièrement adaptée pour modéliser des structures complexes et interconnectées.

**Utilisation dans notre système :**
Neo4j est notre base de rétention de données inter-cluster. Elle stocke toutes les entités métier et leurs relations de manière persistante.

**Cas d'usage :**
- Modélisation des projets et de leur hiérarchie
- Gestion des relations entre entités (documents, utilisateurs, tâches, etc.)
- Traçabilité et historique des modifications
- Requêtes complexes sur les relations entre entités
- Gestion des droits et permissions
- Navigation dans l'arborescence des projets

**Avantages :**
- Performance élevée pour les requêtes de traversée de graphe
- Flexibilité du schéma de données
- Langage de requête Cypher intuitif et puissant

### Redis

Redis est une base de données clé-valeur en mémoire ultra-rapide, utilisée principalement pour le cache et l'orchestration.

**Utilisation dans notre système :**
Redis est notre base de rétention d'orchestration mise en place par le proxy. Il permet au proxy de créer des flux d'interaction complexes avec les autres services.

**Cas d'usage :**
- **Orchestration des services** : Coordination des appels entre vnv-proxy et les autres services
- **Cache de sessions** : Stockage temporaire des sessions utilisateur
- **Gestion d'état** : Stockage des états des ressources provenant de SharePoint pour calculer les différences
- **File d'attente** : Gestion des tâches asynchrones et des jobs en arrière-plan
- **Pub/Sub** : Communication en temps réel entre services
- **Rate limiting** : Limitation du nombre de requêtes par utilisateur/service
- **Locks distribués** : Synchronisation des accès concurrents aux ressources

**Avantages :**
- Performances exceptionnelles (opérations en microsecondes)
- Support natif des structures de données complexes (listes, sets, hashes)
- Persistance optionnelle des données
- Scalabilité horizontale via clustering

## Elastic Session System (ESS)

Le concept d'Elastic Session System vise à centraliser les données de session (une session = travail sur un projet mis dans une session). Une session de travail comporte des documents ainsi que des données métier. Un ESS est une base de données SQL contenant toutes ces informations, permettant ainsi de capturer une image d'un projet pour faire des modifications avant de faire un commit par la suite.

### Context

La sauvegarde de l'information se fait en plusieurs étapes, similaire au workflow Git :

1. **Pull** : Je récupère mon projet depuis la source de vérité (Neo4j)
2. **Modify** : Je modifie les données et documents dans ma session isolée
3. **Commit** : Je valide mes modifications localement
4. **Push** : Je propage mes modifications vers la source de vérité

Pour cela, il faut un système qui découple ce qui est prévu pour retenir l'information de manière à le mettre dans un autre système qui pourra faire une rétention des modifications pour les propager correctement. C'est le but de l'Elastic Session System.

**Caractéristiques clés :**
- **Isolation** : Chaque session est isolée dans sa propre base de données SQLite
- **Versionning** : Gestion de l'historique des modifications au sein d'une session
- **Concurrence** : Plusieurs utilisateurs peuvent travailler sur différentes sessions du même projet
- **Performance** : Les opérations sont rapides car elles sont locales à la session
- **Merge** : Système de résolution de conflits lors du push vers Neo4j

Pour comprendre le placement de l'Elastic Session System, il faut comprendre comment il sera mis en place en dev et en prod. En développement, on pourrait croire que c'est un système de rétention d'information intra-cluster. Mais en production, les ESS sont stockés dans un Elastic File System (EFS), permettant d'avoir une interaction inter-cluster.

### Local Development

En développement local, chaque ESS est stocké localement sur le système de fichiers du serveur vnv-proxy.

```mermaid
graph TB
    subgraph "Machine Développeur"
        subgraph "Docker Compose"
            PROXY[vnv-proxy:8080]
            REST[vnv-rest:3000]
            NEO4J[(neo4j:7474)]
            REDIS[(redis:6379)]
            MINIO[(minio:9000)]
        end
        
        subgraph "Système de Fichiers Local"
            ESS1[(ESS - Project A<br/>SQLite)]
            ESS2[(ESS - Project B<br/>SQLite)]
            ESS3[(ESS - Project C<br/>SQLite)]
        end
    end
    
    PROXY -->|Créer/Gérer| ESS1
    PROXY -->|Créer/Gérer| ESS2
    PROXY -->|Créer/Gérer| ESS3
    PROXY -->|Pull/Push| NEO4J
    PROXY --> REDIS
    PROXY --> MINIO
    REST --> NEO4J
    
    style ESS1 fill:#9b59b6
    style ESS2 fill:#9b59b6
    style ESS3 fill:#9b59b6
    style PROXY fill:#4a90e2
```

### Cloud Production

En production cloud, les ESS sont stockés dans AWS EFS (Elastic File System), permettant un accès partagé entre tous les pods du cluster.

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "ECS/EKS Cluster"
            subgraph "Pod 1"
                PROXY1[vnv-proxy:8080]
            end
            
            subgraph "Pod 2"
                PROXY2[vnv-proxy:8080]
            end
            
            subgraph "Pod 3"
                PROXY3[vnv-proxy:8080]
            end
        end
        
        subgraph "AWS EFS (Elastic File System)"
            ESS1[(ESS - Project A)]
            ESS2[(ESS - Project B)]
            ESS3[(ESS - Project C)]
            ESSn[(ESS - Project N...)]
        end
        
        subgraph "AWS Services"
            NEO4J[(Neo4j Cluster)]
            REDIS[(Redis Cluster)]
            S3[(S3 Bucket)]
        end
        
        ALB[Application Load Balancer]
    end
    
    ALB --> PROXY1
    ALB --> PROXY2
    ALB --> PROXY3
    
    PROXY1 -.->|Mount EFS| ESS1
    PROXY1 -.->|Mount EFS| ESS2
    PROXY2 -.->|Mount EFS| ESS2
    PROXY2 -.->|Mount EFS| ESS3
    PROXY3 -.->|Mount EFS| ESS3
    PROXY3 -.->|Mount EFS| ESSn
    
    PROXY1 --> NEO4J
    PROXY2 --> NEO4J
    PROXY3 --> NEO4J
    
    PROXY1 --> REDIS
    PROXY2 --> REDIS
    PROXY3 --> REDIS
    
    style ESS1 fill:#9b59b6
    style ESS2 fill:#9b59b6
    style ESS3 fill:#9b59b6
    style ESSn fill:#9b59b6
    style ALB fill:#e74c3c
```

**Avantages de l'approche cloud :**
- **Scalabilité** : N'importe quel pod peut accéder à n'importe quel ESS
- **Haute disponibilité** : Si un pod tombe, un autre peut reprendre la session
- **Performance** : EFS offre un accès rapide et concurrent
- **Persistence** : Les ESS survivent aux redémarrages de pods

### Global Cloud Infrastructure

Ici on peut voir que l'infrastructure décrite plus haut est en fait un cluster orchestré et déployé par AWS. Le système est scalable et c'est pourquoi on parle de système intra/inter cluster.

```mermaid
graph TB
    subgraph "Internet"
        USERS[Utilisateurs]
    end
    
    subgraph "AWS Region"
        subgraph "VPC"
            ALB[Application<br/>Load Balancer]
            
            subgraph "Availability Zone 1"
                subgraph "ECS/EKS Cluster AZ1"
                    P1[vnv-proxy]
                    R1[vnv-rest]
                    PNP1[vnv-pnp]
                    EB1[vnv-event-bridge]
                end
            end
            
            subgraph "Availability Zone 2"
                subgraph "ECS/EKS Cluster AZ2"
                    P2[vnv-proxy]
                    R2[vnv-rest]
                    PNP2[vnv-pnp]
                    EB2[vnv-event-bridge]
                end
            end
            
            subgraph "Shared Storage"
                EFS[(AWS EFS<br/>Elastic Sessions)]
            end
            
            subgraph "Database Layer"
                NEO4J[(Neo4j Cluster<br/>Multi-AZ)]
                REDIS[(ElastiCache Redis<br/>Multi-AZ)]
            end
            
            subgraph "Object Storage"
                S3[(AWS S3<br/>Documents & Assets)]
            end
        end
        
        subgraph "Monitoring & Logs"
            CW[CloudWatch]
            XR[X-Ray]
        end
        
        subgraph "External Services"
            MS365[Microsoft 365]
            WEBHOOK[External Webhooks]
        end
    end
    
    USERS -->|HTTPS| ALB
    
    ALB --> P1
    ALB --> P2
    
    P1 --> R1
    P1 --> PNP1
    P1 --> EB1
    P2 --> R2
    P2 --> PNP2
    P2 --> EB2
    
    P1 -.->|Mount| EFS
    P2 -.->|Mount| EFS
    
    R1 --> NEO4J
    R2 --> NEO4J
    
    P1 --> REDIS
    P2 --> REDIS
    
    P1 --> S3
    P2 --> S3
    
    PNP1 -->|API| MS365
    PNP2 -->|API| MS365
    
    EB1 -.->|Receive| WEBHOOK
    EB2 -.->|Receive| WEBHOOK
    
    P1 -.->|Metrics/Logs| CW
    P2 -.->|Metrics/Logs| CW
    R1 -.->|Traces| XR
    R2 -.->|Traces| XR
    
    style ALB fill:#e74c3c
    style EFS fill:#9b59b6
    style NEO4J fill:#3498db
    style REDIS fill:#e67e22
    style S3 fill:#27ae60
    style MS365 fill:#0078d4
```

**Architecture Cloud - Caractéristiques :**

- **Multi-AZ (Availability Zones)** : Répartition sur plusieurs zones de disponibilité pour la haute disponibilité
- **Auto-scaling** : Ajustement automatique du nombre de pods selon la charge
- **Load Balancing** : Distribution intelligente du trafic entre les instances
- **Managed Services** : Utilisation de services managés AWS (EFS, S3, ElastiCache)
- **Monitoring & Observabilité** : CloudWatch pour les métriques et logs, X-Ray pour le tracing distribué
- **Security** : VPC isolé, Security Groups, IAM roles, encryption at rest et in transit
- **Disaster Recovery** : Backups automatiques, snapshots, réplication inter-régions possible

**Flux de données :**

1. L'utilisateur se connecte via HTTPS au Load Balancer
2. Le Load Balancer route vers un pod vnv-proxy disponible
3. vnv-proxy orchestre les appels vers les autres services
4. Les ESS sont partagés via EFS entre tous les pods
5. Neo4j centralise les données persistantes
6. Redis gère l'orchestration et le cache
7. S3 stocke les fichiers et documents
8. CloudWatch et X-Ray collectent les métriques et traces

Cette architecture permet une scalabilité horizontale infinie tout en maintenant la cohérence des données et des sessions utilisateur.