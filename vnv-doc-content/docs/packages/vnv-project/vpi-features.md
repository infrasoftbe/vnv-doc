---
sidebar_position: 3
---

# Fonctionnalités du VPI

Un VPI offre de nombreuses fonctionnalités pour gérer un projet VNV de manière efficace et structurée.

## Gestion des tokens

Le VPI fournit des utilitaires pour la gestion des identifiants uniques :

- **Calcul unifié de token** : Génération automatique d'identifiants uniques
- **Validation d'un token** : Vérification de la validité des identifiants

```typescript
// Créer un token disponible
const newToken = vpi.createAvailableToken();

// Vérifier la disponibilité d'un token
const isAvailable = vpi.isAvailableToken('mon-token');
```

## Gestion des événements

Le VPI supporte un système d'événements pour réagir aux changements :

```typescript
// Écouter un événement
vpi.on('nodeAdded', (event) => {
  console.log('Nouveau nœud ajouté:', event.node);
});

// Émettre un événement
vpi.emit('customEvent', { data: 'example' });
```

## Gestion des nœuds (Nodes)

### Opérations CRUD sur les nœuds

```typescript
// Ajouter un nouveau nœud
const [operation, node] = vpi.addNode({
  type: 'file',
  name: 'Mon document'
});

// Mettre à jour un nœud existant
const [updateOp, updatedNode] = vpi.setNode(node.token, {
  name: 'Nom modifié'
});

// Vérifier l'existence d'un nœud
const exists = vpi.hasNode('node-token');

// Supprimer un nœud
const deleteOp = vpi.deleteNode('node-token');

// Récupérer un nœud par son token
const retrievedNode = vpi.getNodeByToken('node-token');

// Rechercher dans tous les nœuds
const searchResults = vpi.queryNodeAll({ type: 'file' });

// Récupérer les nœuds par type
const fileNodes = vpi.getNodesByType('file');
```

## Gestion des relations

### Opérations CRUD sur les relations

```typescript
// Ajouter une nouvelle relation
const [relationOp, relation] = vpi.addRelation({
  from: 'node1-token',
  to: 'node2-token',
  type: 'HAS_FILE'
});

// Mettre à jour une relation existante
const [updateRelOp, updatedRel] = vpi.setRelation(relation.token, {
  properties: { weight: 0.8 }
});

// Vérifier l'existence d'une relation
const relationExists = vpi.hasRelation('relation-token');

// Supprimer une relation
const deleteRelOp = vpi.deleteRelation('relation-token');

// Récupérer une relation par son token
const retrievedRelation = vpi.getRelationByToken('relation-token');

// Rechercher dans toutes les relations
const relationResults = vpi.queryRelationAll({ type: 'HAS_FILE' });

// Récupérer les relations depuis un nœud
const outgoingRels = vpi.getRelationFromNodeToken('node-token');

// Récupérer les relations vers un nœud
const incomingRels = vpi.getRelationToToken('node-token');
```

## Gestion des métadonnées

### Opérations CRUD sur les métadonnées

```typescript
// Ajouter des métadonnées
const [metaOp, metadata] = vpi.addMetadata({
  target: 'node-token',
  type: 'description',
  value: 'Description du nœud'
});

// Mettre à jour des métadonnées
const [updateMetaOp, updatedMeta] = vpi.setMetadata(metadata.token, {
  value: 'Nouvelle description'
});

// Vérifier l'existence de métadonnées
const metaExists = vpi.hasMetadata('metadata-token');

// Supprimer des métadonnées
const deleteMetaOp = vpi.deleteMetadata('metadata-token');

// Récupérer des métadonnées par token
const retrievedMeta = vpi.getMetadataByToken('metadata-token');

// Rechercher dans toutes les métadonnées
const metaResults = vpi.queryMetadataAll({ type: 'description' });
```

## Gestion des structures

### Opérations CRUD sur les structures

```typescript
// Ajouter une nouvelle structure
const [structOp, structure] = vpi.addStructure({
  type: 'structure',
  name: 'Mon dossier'
});

// Mettre à jour une structure existante
const [updateStructOp, updatedStruct] = vpi.setStructure(structure.token, {
  name: 'Dossier renommé'
});

// Vérifier l'existence d'une structure
const structExists = vpi.hasStructure('structure-token');

// Supprimer une structure
const deleteStructOp = vpi.deleteStructure('structure-token');

// Récupérer une structure par son token
const retrievedStruct = vpi.getStructureByToken('structure-token');

// Rechercher dans toutes les structures
const structResults = vpi.queryStructureAll({ type: 'structure' });
```

## Gestion des listes

### Opérations CRUD sur les listes

```typescript
// Ajouter une nouvelle liste
const [listOp, list] = vpi.addList({
  type: 'list',
  name: 'Ma liste de tâches'
});

// Mettre à jour une liste existante
const [updateListOp, updatedList] = vpi.setList(list.token, {
  name: 'Liste modifiée'
});

// Vérifier l'existence d'une liste
const listExists = vpi.hasList('list-token');

// Supprimer une liste
const deleteListOp = vpi.deleteList('list-token');

// Récupérer une liste par son token
const retrievedList = vpi.getListBytoken('list-token');

// Rechercher dans toutes les listes
const listResults = vpi.queryListAll({ type: 'list' });
```

## Propriétés utiles

Le VPI expose plusieurs propriétés pratiques :

```typescript
// Types de nœuds possibles dans le projet
const nodeTypes = vpi.nodeTypeList;

// Types de liens possibles dans le projet
const relationTypes = vpi.relationTypeList;

// Token du projet
const projectToken = vpi.projectToken;

// Expression JSON du VPI
const jsonRepresentation = vpi.json;

// Rechercher un nœud par token dans toutes les collections
const foundNode = vpi.findNodeByToken('any-token');
```

## Utilitaires

### Gestion des instances et tokens

```typescript
// Assurer qu'une instance est valide
vpi.ensureInstance(someObject);

// Créer un token disponible
const availableToken = vpi.createAvailableToken();

// Vérifier la disponibilité d'un token
const isTokenAvailable = vpi.isAvailableToken('proposed-token');
```

Ces fonctionnalités du VPI permettent une gestion complète et efficace des projets VNV, avec un système de traçabilité intégré et des performances optimisées.
