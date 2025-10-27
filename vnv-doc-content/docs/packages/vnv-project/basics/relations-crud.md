---
sidebar_position: 2
---

# Relations CRUD

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les relations entre nœuds dans un projet VNV en utilisant le VPI.

## Ajouter une Relation (Create)

Pour ajouter une relation entre deux nœuds dans un projet, utilisez la méthode `addRelation` après avoir initialisé le projet.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let project = vnv.VPI.ProjectInstance.init({/* votre projet */});

// Ajout d'une nouvelle relation entre deux nœuds
let [operation, relation] = vpi.addRelation({
  from: node1.token,
  to: node2.token,
  type: 'HAS_FILE',
  properties: {
    weight: 0.8,
    description: 'Relation de référence'
  }
});
```

### Explication du Code

- `ProjectInstance.init(...)` : Initialise un projet en retournant un ProxyProjectInstance qui permet un accès simplifié à toutes les couches du projet.
- `vpi.addRelation()` : Ajoute une relation entre deux nœuds identifiés par leurs tokens. Cette méthode retourne un tableau contenant deux éléments :
  - `operation` : L'opération associée à l'ajout de la relation.
  - `relation` : La relation qui a été ajoutée, comprenant le type de relation et les propriétés associées.

### Création de relations via les nœuds

Les nœuds offrent également des méthodes directes pour créer des relations :

```typescript
// Créer un lien de type HAS_... vers un autre nœud
const linkOperation = node1.linkTo(node2.token);

// Créer un lien de type IS_..._FOR_... vers un autre nœud
const forLinkOperation = node1.linkFor(node2.token);
```

## Lire une Relation (Read)

Pour lire les détails d'une relation existante, plusieurs méthodes sont disponibles :

```typescript
// Récupération d'une relation par son token
const relation = vpi.getRelationByToken('relation-token');

// Vérification de l'existence d'une relation
const exists = vpi.hasRelation('relation-token');

// Récupération des relations depuis un nœud spécifique
const outgoingRelations = vpi.getRelationFromNodeToken('node-token');

// Récupération des relations vers un nœud spécifique
const incomingRelations = vpi.getRelationToToken('node-token');

// Recherche dans toutes les relations avec des critères
const searchResults = vpi.queryRelationAll({ type: 'HAS_FILE' });
```

### Accès aux relations via les nœuds

Les nœuds fournissent un accès direct à leurs relations :

```typescript
// Relations entrantes vers ce nœud
const incomingRels = node.inRelationships;

// Relations sortantes depuis ce nœud
const outgoingRels = node.outRelationships;

// Relations provenant de ce nœud
const fromRels = node.fromRelationships;

// Relations destinées à ce nœud
const forRels = node.forRelationships;

// Nœuds connectés en entrée
const incomingNodes = node.inNodes;

// Nœuds connectés en sortie
const outgoingNodes = node.outNodes;

// Nœuds source
const sourceNodes = node.fromNodes;

// Nœuds destination
const destinationNodes = node.forNodes;
```

## Mettre à Jour une Relation (Update)

Pour mettre à jour une relation existante, utilisez la méthode `setRelation` en spécifiant les nouvelles propriétés.

```typescript
// Mise à jour d'une relation existante
let [operation, updatedRelation] = vpi.setRelation(relation.token, {
  properties: {
    weight: 0.9,
    description: 'Description mise à jour',
    lastModified: new Date().toISOString()
  }
});
```

### Explication du Code

- `vpi.setRelation(...)` : Met à jour une relation existante identifiée par son token. Les nouvelles propriétés sont spécifiées dans le second paramètre. Cette méthode retourne un tableau contenant l'opération effectuée et la relation mise à jour.

## Supprimer une Relation (Delete)

Pour supprimer une relation entre deux nœuds, utilisez la méthode `deleteRelation` en spécifiant le token de la relation.

```typescript
// Suppression d'une relation
let operation = vpi.deleteRelation('relation-token');
```

### Explication du Code

- `vpi.deleteRelation(...)` : Supprime la relation identifiée par son token. Cette méthode retourne l'opération associée à la suppression de la relation.

## Types de relations courantes

Dans le système VNV, plusieurs types de relations sont utilisés :

### Relations HAS_...

Ces relations indiquent qu'un nœud "possède" ou "contient" un autre élément :

```typescript
// Un dossier qui a un fichier
node.linkTo(referenceNode.token);

// Un dossier qui a un fichier
folderNode.linkTo(fileNode.token);

// Un projet qui a une structure
projectNode.linkTo(structureNode.token);
```

### Relations IS_..._FOR_...

Ces relations indiquent qu'un nœud "est quelque chose pour" un autre nœud :

```typescript
// Un fichier qui est un enfant pour un dossier
fileNode.linkFor(folderNode.token);

// Une exigence qui est liée à un objet
requirementNode.linkFor(objectNode.token);

// Un test qui est lié à une exigence
testNode.linkFor(requirementNode.token);
```

## Gestion avancée des relations

### Propriétés des relations

Les relations peuvent porter des propriétés supplémentaires :

```typescript
const [op, relation] = vpi.addRelation({
  from: sourceNode.token,
  to: targetNode.token,
  type: 'HAS_LINK',
  properties: {
    weight: 0.85,
    confidence: 0.92,
    createdAt: new Date().toISOString(),
    metadata: {
      algorithm: 'similarity',
      version: '1.2.3'
    }
  }
});
```

### Recherche de relations complexes

```typescript
// Rechercher toutes les relations d'un type spécifique
const references = vpi.queryRelationAll({ type: 'HAS_FILE' });

// Rechercher les relations avec des propriétés spécifiques
const strongLinks = vpi.queryRelationAll({
  type: 'HAS_LINK',
  properties: { weight: 0.8 }
});
```

## Résumé des Opérations

- **Création (addRelation, node.linkTo, node.linkFor)** : Ajoute une nouvelle relation entre deux nœuds et retourne à la fois l'opération et la relation ajoutée.
- **Lecture (getRelationByToken, hasRelation, getRelationFromNodeToken, getRelationToToken, queryRelationAll)** : Différentes méthodes pour récupérer et rechercher des relations.
- **Mise à jour (setRelation)** : Modifie les propriétés d'une relation existante et retourne l'opération et la relation mise à jour.
- **Suppression (deleteRelation)** : Supprime une relation entre deux nœuds et retourne l'opération associée.

Ces opérations vous permettent de manipuler efficacement les relations entre les nœuds dans un projet VNV, en utilisant les fonctionnalités exposées par le ProxyProjectInstance et les instances de nœuds pour accéder directement aux différentes couches du projet.
