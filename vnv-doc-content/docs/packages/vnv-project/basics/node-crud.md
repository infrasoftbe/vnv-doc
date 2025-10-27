---
sidebar_position: 1
---

# Node CRUD

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les nœuds (Nodes) d'un projet VNV en utilisant le VPI.

## Fonctionnalités d'un nœud

Un nœud au sein d'un VPI n'est pas simplement un objet, mais une instance de la classe `Node`, ce qui signifie qu'il possède des utilitaires permettant d'interagir en tant que nœud dans le projet.

## Ajouter un Nœud (Create)

Pour ajouter un nœud à un projet, vous pouvez utiliser la méthode `addNode` après avoir initialisé le projet avec `ProjectInstance.init`.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let vpi = vnv.VPI.ProjectInstance.init({/* votre projet */});

// Ajout d'un nouveau nœud
let [operation, node] = vpi.addNode({
  type: 'file',
  name: 'Mon nouveau document',
  metadata: {
    description: 'Contenu du document',
    path: []
  }
});
```

### Explication du Code

- `ProjectInstance.init(...)` : Initialise un projet en retournant un ProxyProjectInstance qui permet un accès simplifié à toutes les couches du projet.
- `vpi.addNode(...)` : Ajoute un nouveau nœud au projet. Cette méthode retourne un tableau contenant deux éléments :
  - `operation` : L'opération associée à l'ajout du nœud.
  - `node` : Le nœud qui a été ajouté.

## Lire un Nœud (Read)

Pour récupérer un nœud existant, plusieurs méthodes sont disponibles :

```typescript
// Récupérer un nœud par son token
const node = vpi.getNodeByToken('node-token');

// Vérifier l'existence d'un nœud
const exists = vpi.hasNode('node-token');

// Récupérer tous les nœuds d'un type spécifique
const fileNodes = vpi.getNodesByType('file');

// Rechercher dans tous les nœuds avec des critères
const searchResults = vpi.queryNodeAll({ type: 'file' });

// Rechercher un nœud dans toutes les collections (nodes, lists, structures, childs)
const foundNode = vpi.findNodeByToken('any-token');
```

## Mettre à Jour un Nœud (Update)

Pour mettre à jour un nœud existant, utilisez la méthode `setNode` en passant les modifications souhaitées.

```typescript
// Mise à jour d'un nœud existant
let [operation, updatedNode] = vpi.setNode(node.token, {
  name: 'Nom modifié',
  metadata: {
    description: 'Nouveau contenu',
    path: []
  }
});

// Alternative : utiliser la méthode update du nœud directement
const updateOperation = node.update({
  name: 'Nom modifié via le nœud'
});
```

### Explication du Code

- `vpi.setNode(node.token, updatedProperties)` : Met à jour un nœud existant identifié par `node.token` avec les propriétés spécifiées dans `updatedProperties`. Cette méthode retourne également un tableau contenant l'opération effectuée et le nœud mis à jour.
- `node.update(...)` : Méthode directe sur l'instance du nœud pour le mettre à jour.

## Supprimer un Nœud (Delete)

Pour supprimer un nœud, utilisez la méthode `deleteNode` en spécifiant l'identifiant du nœud à supprimer.

```typescript
// Suppression d'un nœud via le projet
let operation = vpi.deleteNode(node.token);

// Alternative : suppression directe via le nœud
const deleteOperation = node.delete();
```

### Explication du Code

- `vpi.deleteNode(node.token)` : Supprime le nœud identifié par `node.token` du projet. Cette méthode retourne l'opération associée à la suppression.
- `node.delete()` : Méthode directe sur l'instance du nœud pour le supprimer.

## Fonctionnalités avancées des nœuds

### Gestion des métadonnées

```typescript
// Récupérer les métadonnées du nœud
const metadata = node.getMetadata();

// Définir les métadonnées du nœud
node.setMetadata({
  description: 'Description du nœud',
  tags: ['important', 'document']
});
```

### Gestion des relations

```typescript
// Relations entrantes vers ce nœud
const incomingRelations = node.inRelationships;

// Relations sortantes depuis ce nœud
const outgoingRelations = node.outRelationships;

// Relations provenant de ce nœud
const fromRelations = node.fromRelationships;

// Relations destinées à ce nœud
const forRelations = node.forRelationships;
```

### Gestion des nœuds liés

```typescript
// Nœuds connectés en entrée
const incomingNodes = node.inNodes;

// Nœuds connectés en sortie
const outgoingNodes = node.outNodes;

// Nœuds source
const sourceNodes = node.fromNodes;

// Nœuds destination
const destinationNodes = node.forNodes;
```

### Création de liens

```typescript
// Créer un lien vers un autre nœud de type HAS_...
node.linkTo(otherNode, 'HAS_FILE');

// Créer un lien vers un autre nœud de type IS_..._FOR_...
node.linkFor(otherNode, 'IS_REQUIREMENT_FOR_FILE');
```

### Propriétés du nœud

```typescript
// Représentation aplatie du nœud
const flatRepresentation = node.flat;

// Schéma du nœud
const nodeSchema = node.schema;
```

## Résumé des Opérations

- **Création (addNode)** : Ajoute un nouveau nœud au projet et retourne à la fois l'opération et le nœud créé.
- **Lecture (getNodeByToken, hasNode, getNodesByType, queryNodeAll)** : Différentes méthodes pour récupérer et rechercher des nœuds.
- **Mise à jour (setNode, node.update)** : Modifie les propriétés d'un nœud existant et retourne l'opération et le nœud mis à jour.
- **Suppression (deleteNode, node.delete)** : Supprime un nœud du projet et retourne l'opération associée.

Ces opérations vous permettent de manipuler efficacement les nœuds dans un projet VNV, en utilisant les fonctionnalités exposées par le ProxyProjectInstance pour accéder directement aux différentes couches du projet.

