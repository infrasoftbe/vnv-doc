---
sidebar_position: 3
---

# MetaContainer CRUD avec Fragments

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les **MetaContainers** des nœuds dans un projet VNV en utilisant le VPI.

## Architecture MetaContainer vs Metadata

Le VPI encapsule les metadata d'un node dans un **MetaContainer** qui :
- Possède une **référence** au node propriétaire
- Permet une gestion séparée des propriétés du node
- Encapsule les metadata brutes dans un container structuré

## Ajouter un MetaContainer (Create)

Le processus `addMetadata()` crée un **MetaContainer** associé à un Fragment de Node existant :

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let vpi = vnv.VPI.ProjectInstance.init({/* votre projet */});

// Le node doit exister au préalable (voir node-crud.md)
const nodeToken = 'existing-node-token';

// Ajout du MetaContainer au nœud
let [operation, metadata] = vpi.addMetadata(nodeToken, {
  description: 'Description détaillée du nœud',
  category: 'Documentation',
  tags: ['important', 'document'],
  author: 'user-123',
  priority: 'high',
  language: 'fr',
  createdAt: new Date().toISOString()
});
```

### Ajout via l'instance du nœud

Vous pouvez également ajouter des métadonnées directement via l'instance du nœud :

```typescript
// Définir des métadonnées directement sur le nœud
node.setMetadata({
  description: 'Description du nœud',
  tags: ['important', 'document'],
  category: 'work',
  priority: 'high'
});
```

### Explication du Code

- `ProjectInstance.init(...)` : Initialise un projet en retournant un ProxyProjectInstance qui permet un accès simplifié à toutes les couches du projet.
- `vpi.addMetadata(...)` : Ajoute des métadonnées à un nœud identifié par son token. Cette méthode retourne un tableau contenant deux éléments :
  - `operation` : L'opération associée à l'ajout des métadonnées.
  - `metadata` : Les métadonnées qui ont été ajoutées.

## Lire des Métadonnées (Read)

Pour lire les métadonnées existantes, plusieurs méthodes sont disponibles :

```typescript
// Récupération de métadonnées par token
const metadata = vpi.getMetadataByToken('metadata-token');

// Vérification de l'existence de métadonnées
const exists = vpi.hasMetadata('metadata-token');

// Recherche dans toutes les métadonnées avec des critères
const searchResults = vpi.queryMetadataAll({
  type: 'description',
  target: 'node-token'
});

// Récupération des métadonnées via l'instance du nœud
const nodeMetadata = node.getMetadata();
```

### Types de métadonnées courantes

Dans le système VNV, plusieurs types de métadonnées sont utilisés :

```typescript
// Métadonnées de description
const descriptionMeta = {
  type: 'description',
  value: 'Description détaillée',
  properties: { language: 'fr' }
};

// Métadonnées de catégorisation
const categoryMeta = {
  type: 'category',
  value: 'work',
  properties: { subcategory: 'project-management' }
};

// Métadonnées de tags
const tagsMeta = {
  type: 'tags',
  value: ['urgent', 'review', 'client'],
  properties: { source: 'user-input' }
};

// Métadonnées techniques
const technicalMeta = {
  type: 'technical',
  value: {
    version: '1.2.3',
    format: 'markdown',
    encoding: 'utf-8'
  }
};
```

## Mettre à Jour des Métadonnées (Update)

Pour mettre à jour des métadonnées existantes d'un nœud, utilisez la méthode `setMetadata` en passant les nouvelles valeurs souhaitées.

```typescript
// Mise à jour des métadonnées par token
let [operation, updatedMetadata] = vpi.setMetadata(metadata.token, {
  value: 'Nouvelle description mise à jour',
  properties: {
    language: 'en',
    lastModified: new Date().toISOString(),
    modifiedBy: 'user-456'
  }
});

// Mise à jour via l'instance du nœud (écrase les métadonnées existantes)
node.setMetadata({
  description: 'Nouvelle description',
  tags: ['updated', 'current'],
  lastUpdate: new Date().toISOString()
});

// Mise à jour partielle via l'instance du nœud
const currentMeta = node.getMetadata();
node.setMetadata({
  ...currentMeta,
  description: 'Description mise à jour',
  tags: [...(currentMeta.tags || []), 'new-tag']
});
```

### Explication du Code

- `vpi.setMetadata(metadata.token, updatedValues)` : Met à jour les métadonnées identifiées par `metadata.token` avec les valeurs spécifiées dans `updatedValues`. Cette méthode retourne un tableau contenant l'opération effectuée et les métadonnées mises à jour.
- `node.setMetadata(...)` : Met à jour directement les métadonnées du nœud. Cette méthode remplace toutes les métadonnées existantes.

## Supprimer des Métadonnées (Delete)

Pour supprimer des métadonnées d'un nœud, utilisez la méthode `deleteMetadata` en spécifiant le token des métadonnées à supprimer.

```typescript
// Suppression de métadonnées par token
let operation = vpi.deleteMetadata('metadata-token');
```

### Explication du Code

- `vpi.deleteMetadata(metadata.token)` : Supprime les métadonnées identifiées par `metadata.token`. Cette méthode retourne l'opération associée à la suppression.

## Gestion avancée des métadonnées

### Métadonnées structurées

Les métadonnées peuvent contenir des structures complexes :

```typescript
const complexMetadata = {
  type: 'project-info',
  value: {
    status: 'in-progress',
    phases: [
      { name: 'analysis', completed: true, date: '2024-01-15' },
      { name: 'development', completed: false, date: null },
      { name: 'testing', completed: false, date: null }
    ],
    team: {
      lead: 'user-123',
      members: ['user-456', 'user-789'],
      external: []
    },
    budget: {
      allocated: 50000,
      spent: 12500,
      currency: 'EUR'
    }
  },
  properties: {
    version: '2.1',
    schema: 'project-metadata-v2',
    confidentiality: 'internal'
  }
};
```

### Recherche avancée dans les métadonnées

```typescript
// Rechercher par type de métadonnées
const descriptions = vpi.queryMetadataAll({ type: 'description' });

// Rechercher par propriétés spécifiques
const frenchDescriptions = vpi.queryMetadataAll({
  type: 'description',
  properties: { language: 'fr' }
});

// Rechercher par valeur
const urgentItems = vpi.queryMetadataAll({
  type: 'tags',
  value: { $contains: 'urgent' }
});
```

### Métadonnées avec validation

```typescript
// Ajouter des métadonnées avec validation personnalisée
const validatedMetadata = {
  type: 'status',
  value: 'approved',
  properties: {
    validatedBy: 'user-admin',
    validationDate: new Date().toISOString(),
    validationRules: ['required-approval', 'manager-review'],
    isValid: true
  }
};
```

## Bonnes pratiques

### Nommage des types de métadonnées

Utilisez des conventions de nommage cohérentes :

```typescript
// Types de base
'description'     // Description textuelle
'tags'           // Étiquettes/mots-clés
'category'       // Catégorisation
'status'         // Statut du nœud

// Types composés
'technical-info'  // Informations techniques
'user-settings'   // Paramètres utilisateur
'audit-trail'     // Piste d'audit
'workflow-state'  // État du workflow
```

### Gestion des versions

```typescript
const versionedMetadata = {
  type: 'content-version',
  value: '1.3.2',
  properties: {
    previousVersion: '1.3.1',
    changes: ['updated-section-2', 'fixed-typos'],
    changelog: 'Version 1.3.2: Updated section 2 and fixed typos',
    releaseDate: '2024-10-27'
  }
};
```

## Résumé des Opérations

- **Création (addMetadata, node.setMetadata)** : Ajoute des métadonnées à un nœud et retourne à la fois l'opération et les métadonnées ajoutées.
- **Lecture (getMetadataByToken, hasMetadata, queryMetadataAll, node.getMetadata)** : Différentes méthodes pour récupérer et rechercher des métadonnées.
- **Mise à jour (setMetadata, node.setMetadata)** : Modifie les valeurs de métadonnées existantes et retourne l'opération et les métadonnées mises à jour.
- **Suppression (deleteMetadata)** : Supprime des métadonnées d'un nœud et retourne l'opération associée.

Ces opérations vous permettent de manipuler efficacement les métadonnées des nœuds dans un projet VNV, en utilisant les fonctionnalités exposées par le ProxyProjectInstance pour accéder directement aux différentes couches du projet.
