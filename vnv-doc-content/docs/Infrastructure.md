
Voici un descriptif de l'architecture...

## Context

#### Servers
- vnv-rest ( 3000 ) - serveur avec les processus métier sur la db neo4j
- vnv-proxy ( 8080 ) - serveur proxy; gere les ESS ainsi que la communication avec les autres serveurs et sers aussi d'orchestrateur.
- vnv-pnp ( 8081 ) - serveur dédié à la communication avec les services microsofts.
- vnv-event-bridge ( 8082 ) - serveur dédié à la reception et traitement des signaux externes.
- minio ( 9000 ) - Blob storage imitant S3.
- neo4j ( 7474 ) - Base de donnée globale.
- redis ( 6379 ) - Base de donnée cluster.
#### Packages
- vnv-sdk - Librairie permettant tout les traitement métiers, modeles métiers , etc...  Elle est utilisée en front et backend. Elle permet de manipuler des modeles de données qui transites ainsi que l'uniformiser l'utilisation des processus métiers dans tout les services et applications. Elle continent aussi un client fetch permettant d'interagir avec l'infrastructure au travers de layers API dédié.


```mermaid

```

### Minio

---description de minio---

Dans notre systeme minio représente S3. Minio est utilisé localement pour le développement, mais dans le systeme cloud il s'agit de S3.

### Neo4j

---description de neo4j---

Neo4j est notre base de rétention de data inter-cluster.

### Redis

---description de redis ---

Redis est notre base de rétention d'orchestration mise en place par le proxy. Il permet au proxy de créer des flux d'interaction complexe avec les autres services. 
Redis est aussi utilisé pour stocker les états des ressources provenant de sharepoint pour faire des calculs de différences.

## Elastic Session System

Le concept de Elastic session system veut centraliser les données de session ( session = travail sur un projet mis dans une session ). Une session de travail comporte des documents ainsi que de la data. Un ESS est une base de donnée sql contenant toute ces informations, permettant ainsi de capturer une image d'un projet pour faire des modification avant de faire un commit par la suite. 
### Context

La sauvegarde de l'information se fait en plusieurs étapes comme github. Je tire mon projet, puis je modifie puis je commit et push. Pour cella il faut un systeme qui découple ce qui est prévu pour retenir l'information de maniere a le mettre dans un autre systeme qui pourra faire une rétention des modification pour les propagés correctement. C'est le but de l'elastic session system.

Pour comprendre le placement de l'elastic session system, il faut comprendre comment il serra mis en place en dev et en prod. En développement on pourrait croire que c'est un systeme de rétention d'information intra-cluster. Mais en prod les ESS sont stocké dans un Elastic File System, permettant d'avoir une interaction inter-cluster.

### Local

```mermaid

```

### Cloud

```mermaid
```

### Global cloud infrastructure
Ici on peut voir que l'infrastructure décrite plus haut est en fait un cluster orchestré et déployé par aws. Le systeme est scalable et c'est pourquoi on parle de systeme intra/inter cluster.

```mermaid

```
