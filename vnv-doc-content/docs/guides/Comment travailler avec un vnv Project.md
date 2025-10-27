# Comment travailler avec un projet VNV

Un **Project DUMP** provient directement de la base de données et contient toutes les données d'un projet VNV au format JSON.

Un **VPI** (Virtual Project Interface) est une interface virtuelle de projet, c'est-à-dire une représentation virtuelle d'un projet permettant d'interagir avec celui-ci de manière simplifiée et structurée.

 ## Project DUMP et VPI : quelles différences ?

 - Un **Project DUMP** est un fichier JSON brut, ce qui signifie qu'il faut effectuer des manipulations manuelles dans l'objet pour interagir avec le projet.
 - Un **VPI** se construit à partir d'un DUMP et permet d'interagir avec celui-ci de manière unifiée et globale. Lorsqu'un élément est créé et qu'il implique la création d'un lien, celui-ci est automatiquement géré par le VPI, permettant de réduire les interactions et de les simplifier.

Le VPI offre également des fonctionnalités de recherche, d'ajout, de mise à jour et de suppression de données. Il utilise un système de calcul de différences (diff) entre les opérations qui s'exécutent dans le VPI, permettant une gestion de l'historique des modifications ainsi qu'un système possible d'annulation/rétablissement (undo/redo).

Ce sont ces différences qui sont utilisées pour appliquer les changements effectués dans un VPI vers le projet stocké dans la base de données.
## Utilisation d'un VPI

Le VPI s'instancie avec le package `VPI` du SDK `@infrasoftbe/vnv-sdk`.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

const JSONDump = /* votre dump JSON */;

const vpi = vnv.VPI.ProjectInstance.init(JSONDump);
```

Une fois instancié, le VPI est prêt à être utilisé pour toutes les opérations sur le projet.

## Types de données contenues dans le DUMP

Le dump est un objet clé-valeur contenant plusieurs champs principaux :

- **`self`** : Contient les informations du projet lui-même ainsi que ses métadonnées
- **`data.nodes`** : Contient les nœuds (nodes) du projet
- **`data.relations`** : Contient les relations entre les nœuds du projet
- **`data.metas`** : Contient les métadonnées des nœuds, structures et listes
- **`data.structures`** : Contient les structures du projet
- **`data.lists`** : Contient les listes du projet

## Types de données contenues dans le VPI

Le VPI contient les mêmes jeux de données que le JSON DUMP, à ceci près qu'il ajoute des utilitaires permettant de faciliter les interactions. Il modifie également certains types de données, comme les tableaux qui sont remplacés par des Map, permettant d'effectuer des accès directs plutôt que des recherches sur les jeux de données.

Cette optimisation améliore considérablement les performances lors de la manipulation de gros volumes de données.

## Fonctionnalités d'un VPI

Un VPI offre de nombreuses fonctionnalités pour gérer un projet VNV :

### Gestion des tokens
- **Calcul unifié de token** : Génération automatique d'identifiants uniques
- **Validation d'un token** : Vérification de la validité des identifiants

### Gestion des événements
- `vpi.emit()` : Émet un événement
- `vpi.on()` : Écoute un événement

### Gestion des nœuds (Nodes)
- `vpi.addNode()` : Ajoute un nouveau nœud
- `vpi.setNode()` : Met à jour un nœud existant
- `vpi.hasNode()` : Vérifie l'existence d'un nœud
- `vpi.deleteNode()` : Supprime un nœud
- `vpi.getNodeByToken()` : Récupère un nœud par son token
- `vpi.queryNodeAll()` : Recherche dans tous les nœuds
- `vpi.getNodesByType()` : Récupère les nœuds par type

### Gestion des relations
- `vpi.addRelation()` : Ajoute une nouvelle relation
- `vpi.setRelation()` : Met à jour une relation existante
- `vpi.hasRelation()` : Vérifie l'existence d'une relation
- `vpi.deleteRelation()` : Supprime une relation
- `vpi.getRelationByToken()` : Récupère une relation par son token
- `vpi.queryRelationAll()` : Recherche dans toutes les relations
- `vpi.getRelationFromNodeToken()` : Récupère les relations depuis un nœud
- `vpi.getRelationToToken()` : Récupère les relations vers un nœud

### Gestion des métadonnées
- `vpi.addMetadata()` : Ajoute des métadonnées
- `vpi.setMetadata()` : Met à jour des métadonnées
- `vpi.hasMetadata()` : Vérifie l'existence de métadonnées
- `vpi.deleteMetadata()` : Supprime des métadonnées
- `vpi.getMetadataByToken()` : Récupère des métadonnées par token
- `vpi.queryMetadataAll()` : Recherche dans toutes les métadonnées

### Gestion des structures
- `vpi.addStructure()` : Ajoute une nouvelle structure
- `vpi.setStructure()` : Met à jour une structure existante
- `vpi.hasStructure()` : Vérifie l'existence d'une structure
- `vpi.deleteStructure()` : Supprime une structure
- `vpi.getStructureByToken()` : Récupère une structure par son token
- `vpi.queryStructureAll()` : Recherche dans toutes les structures

### Gestion des listes
- `vpi.addList()` : Ajoute une nouvelle liste
- `vpi.setList()` : Met à jour une liste existante
- `vpi.hasList()` : Vérifie l'existence d'une liste
- `vpi.deleteList()` : Supprime une liste
- `vpi.getListBytoken()` : Récupère une liste par son token
- `vpi.queryListAll()` : Recherche dans toutes les listes

### Propriétés utiles
- `vpi.nodeTypeList` : Retourne un tableau des types de nœuds possibles dans le projet
- `vpi.relationTypeList` : Retourne un tableau des types de liens possibles dans le projet
- `vpi.projectToken` : Token du projet contenu dans le champ `self.token`
- `vpi.json` : Expression JSON du VPI
- `vpi.findNodeByToken` : Permet de rechercher un nœud par son token dans les `nodes`, `lists`, `structures` ou `childs` du projet

### Utilitaires
- `vpi.ensureInstance` : Assure qu'une instance est valide
- `vpi.createAvailableToken` : Crée un token disponible
- `vpi.isAvailableToken` : Vérifie la disponibilité d'un token

### Fonctionnalités d'un nœud

Un nœud au sein d'un VPI n'est pas simplement un objet, mais une instance de la classe `Node`, ce qui signifie qu'il possède également des utilitaires permettant d'interagir en tant que nœud dans le projet.

#### Gestion des métadonnées
- `node.getMetadata()` : Récupère les métadonnées du nœud
- `node.setMetadata()` : Définit les métadonnées du nœud

#### Gestion des relations
- `node.inRelationships` : Relations entrantes vers ce nœud
- `node.outRelationships` : Relations sortantes depuis ce nœud
- `node.fromRelationships` : Relations provenant de ce nœud
- `node.forRelationships` : Relations destinées à ce nœud

#### Gestion des nœuds liés
- `node.inNodes` : Nœuds connectés en entrée
- `node.outNodes` : Nœuds connectés en sortie
- `node.fromNodes` : Nœuds source
- `node.forNodes` : Nœuds destination

#### Opérations sur le nœud
- `node.update()` : Met à jour le nœud
- `node.delete()` : Supprime le nœud
- `node.linkTo()` : Crée un lien vers un autre nœud de type `HAS_...`.
- `node.linkFor()` : Crée un lien vers un autre nœud de type `IS_..._FOR_...`.

#### Propriétés
- `node.flat` : Représentation aplatie du nœud
- `node.schema` : Schéma du nœud
### Fonctionnalités d'une Structure

Une structure au sein d'un VPI est également une instance de la classe `Node` qui a été étendue par la classe `Structure`. Cela signifie que la structure possède les mêmes utilitaires que le nœud, en plus des fonctionnalités spécifiques suivantes :

#### Gestion des nœuds enfants
- `structure.addNode()` : Ajoute un nœud enfant à la structure
- `structure.setNode()` : Met à jour un nœud enfant
- `structure.hasNode()` : Vérifie l'existence d'un nœud enfant
- `structure.deleteNode()` : Supprime un nœud enfant
- `structure.queryNodeAll()` : Recherche dans tous les nœuds enfants
- `structure.getChildByToken()` : Récupère un enfant par son token

#### Validation de la structure
- `structure.isConsistant()` : Vérifie la cohérence de la structure
- `structure.isComplete()` : Vérifie si la structure est complète
- `structure.isCorrect()` : Vérifie la validité de la structure

#### Représentations de données
- `structure.nestedv1()` : Représentation imbriquée ( Structure - Childs )
- `structure.nestedv2()` : Représentation imbriquée ( Structure - Childs - Nodes )
- `structure.flatv1()` : Représentation aplatie ( Structure - Childs )
- `structure.flatv2()` : Représentation aplatie ( Structure - Childs - Nodes )

### Fonctionnalités d'une Liste

Une liste au sein d'un VPI est une instance de la classe `List` qui hérite de la classe `Structure`. Cela signifie qu'elle possède les mêmes utilitaires que la structure, avec des optimisations spécifiques pour la gestion de collections ordonnées d'éléments.

### CRUD, Transactions et Opérations

Toutes les opérations sont stockées dans `vpi.operations`. Une opération représente une transaction entre deux états de données pour un élément donné, avec un calcul de différences sur les champs modifiés. Les valeurs sont stockées sous la forme `clé: [ancienneValeur, nouvelleValeur]`, permettant de conserver une trace de chaque modification.

#### Structure d'une opération

Une opération se structure de la manière suivante :

- **`operation._id`** : Identifiant interne de l'opération
- **`operation.eventTime`** : Horodatage interne de l'opération
- **`operation.method`** : Méthode CRUD associée à l'opération (POST, UPDATE, DELETE)
- **`operation.data`** : Données de l'opération
- **`operation.operationtype`** : Type d'élément associé à l'opération (node, relation, structure, etc.)
- **`operation.operationId`** : Identifiant idempotent de l'opération, permettant d'assurer l'unicité d'une opération dans le temps
- **`operation.ref`** : Référence interne à l'élément modifié par l'opération
- **`operation.delta`** : Delta de la modification (différences entre l'ancien et le nouvel état)

#### Avantages du système d'opérations

Ce système offre plusieurs avantages :

1. **Traçabilité complète** : Chaque modification est enregistrée avec son contexte
2. **Synchronisation** : Les deltas permettent de synchroniser efficacement avec la base de données
3. **Annulation/Rétablissement** : Possibilité d'implémenter des fonctionnalités undo/redo
4. **Audit** : Historique complet des modifications pour l'audit et le debugging
5. **Performance** : Seules les différences sont transmises lors de la synchronisation
