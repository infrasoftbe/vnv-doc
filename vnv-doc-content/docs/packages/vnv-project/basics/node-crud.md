---
sidebar_position: 1
---

# Node CRUD avec Fragments

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les **Fragments de Nœuds** d'un projet VNV en utilisant le VPI.

## Architecture des Fragments de Nœuds

Le VPI travaille avec des **Fragments** - des unités atomiques de données. Un nœud au sein d'un VPI n'est pas simplement un objet, mais une instance de la classe `Node` qui possède des utilitaires permettant d'interagir en tant que nœud dans le projet.

### Séparation Node/Metadata

Le VPI maintient une séparation claire entre :
- **Node Fragment** : L'entité de base (ID, nom, type, token)
- **MetaContainer** : Encapsule les metadata avec une référence au node propriétaire

## Ajouter un Nœud (Create) - Processus en 2 étapes

La création d'un nœud se fait en **2 étapes distinctes** : `addNode()` puis `addMetadata()`.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let vpi = vnv.VPI.ProjectInstance.init({/* votre projet */});

// ÉTAPE 1 : Ajout du fragment de nœud
let [operation, node] = vpi.addNode({
  type: 'file',
  name: 'Mon nouveau document'
});

// ÉTAPE 2 : Ajout des métadonnées via MetaContainer
let metaContainer = {
  id: crypto.randomUUID(),
  token: node.token,
  meta: {
    description: 'Contenu du document',
    path: [],
    category: 'Documentation',
    tags: ['important', 'projet']
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [metaOperation, metadata] = vpi.addMetadata(metaContainer);
```

### Explication du Code

- `ProjectInstance.init(...)` : Initialise un projet en retournant un ProxyProjectInstance qui permet un accès simplifié à toutes les couches du projet.
- `vpi.addNode(...)` : Crée le **Fragment de Node** de base. Cette méthode retourne un tableau contenant deux éléments :
  - `operation` : L'opération associée à l'ajout du nœud.
  - `node` : Le fragment de nœud qui a été ajouté.
- `vpi.addMetadata(metaContainer)` : Crée le **MetaContainer** associé au node. Prend un objet IMetaContainer complet avec id, token, meta, create_dt, update_dt.

### Pourquoi 2 étapes ?

Cette séparation permet :
- Une validation indépendante du node et de ses metadata
- Une gestion flexible des MetaContainers
- Une architecture claire entre entité et propriétés

## Lire un Nœud (Read)

Pour récupérer un nœud existant et ses métadonnées, plusieurs méthodes sont disponibles :

```typescript
// Récupérer un fragment de nœud par son token
const node = vpi.getNodeByToken('node-token');

// Récupérer les métadonnées associées au nœud
const nodeMetadata = vpi.getMetadataByNodeToken('node-token');

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

Pour mettre à jour un fragment de nœud et ses métadonnées, vous pouvez agir sur chaque composant séparément.

```typescript
// Mise à jour du fragment de nœud lui-même
let [operation, updatedNode] = vpi.setNode(node.token, {
  name: 'Nom modifié'
});

// Mise à jour des métadonnées via le MetaContainer
let updatedMetaContainer = {
  ...metadata, // récupère l'objet metadata existant
  meta: {
    ...metadata.meta, // garde les métadonnées existantes
    description: 'Nouveau contenu',
    category: 'Documentation Mise à Jour',
    tags: ['modifié', 'important']
  },
  update_dt: Date.now()
};
let [metaOperation, updatedMetadata] = vpi.setMetadata(updatedMetaContainer);

// Alternative : utiliser la méthode update du nœud directement
const updateOperation = node.update({
  name: 'Nom modifié via le nœud'
});
```

### Explication du Code

- `vpi.setNode(node.token, updatedProperties)` : Met à jour le **Fragment de Node** identifié par `node.token`. Cette méthode retourne l'opération effectuée et le fragment mis à jour.
- `vpi.setMetadata(metaContainer)` : Met à jour le **MetaContainer** associé au node. Prend un objet IMetaContainer complet mis à jour.
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

