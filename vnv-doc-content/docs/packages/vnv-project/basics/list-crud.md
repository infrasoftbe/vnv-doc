---
sidebar_position: 5
---

# Listes CRUD

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les listes dans un projet VNV en utilisant le VPI.

## Qu'est-ce qu'une Liste ?

Une liste au sein d'un VPI est une instance de la classe `_list` qui hérite de la classe `_structure`. Cela signifie qu'elle possède les mêmes utilitaires que la structure, avec des optimisations spécifiques pour la gestion de collections ordonnées d'éléments.

### Héritage de Structure

Les listes héritent de toutes les fonctionnalités des structures :

**Méthodes héritées de Structure :**
- **Navigation** : `forNodes`, `fromNodes`, `inNodes`, `outNodes`
- **Relations** : `forRelationships`, `fromRelationships`, `inRelationships`, `outRelationships`
- **Méthodes de liaison** : `linkFor`, `linkFrom`, `linkTo`
- **Gestion des enfants** : `deleteNode`, `hasNode`, `getChildByToken`, `queryNodeAll`
- **Formats de sortie** : `flatv1`, `flatv2`, `nestedv1`, `nestedv2`
- **Métadonnées** : `getMetadata`, `setMetadata`, `setMetaDataKey`
- **Autres** : `delete`, `update`, `flat`, `json`, `shema`

**Méthodes spécialisées pour List :**
- `addNode` : Ajoute un élément de type `IListChild` (override de Structure)
- `setNode` : Modifie un élément `IListChild` (override de Structure)
- `constructor` : Utilise `IListInitOptions` au lieu de `IStructureInitOptions`

## Ajouter une Liste (Create)

Pour ajouter une liste à un projet, utilisez la méthode `addList` :

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let vpi = vnv.VPI.ProjectInstance.init({/* votre projet */});

// Ajout d'une nouvelle liste
let [operation, list] = vpi.addList({
  id: crypto.randomUUID(),
  token: crypto.randomUUID(),
  type: 'list',
  name: 'Ma liste de tâches',
  create_dt: Date.now(),
  update_dt: Date.now(),
  meta: {
    description: 'Liste des tâches à accomplir pour le projet',
    children: []
  }
});
```

### Explication du Code

- `vpi.addList(...)` : Ajoute une nouvelle liste au projet. Cette méthode retourne un tableau contenant :
  - `operation` : L'opération associée à l'ajout de la liste.
  - `list` : La liste qui a été ajoutée.

## Lire une Liste (Read)

Pour récupérer une liste existante, plusieurs méthodes sont disponibles :

```typescript
// Récupérer une liste par son token
const list = vpi.getListBytoken('list-token');

// Vérifier l'existence d'une liste
const exists = vpi.hasList('list-token');

// Rechercher dans toutes les listes avec des critères
const searchResults = vpi.queryListAll({ type: 'list' });

// Rechercher une liste dans toutes les collections
const foundList = vpi.findNodeByToken('list-token');
```

## Mettre à Jour une Liste (Update)

Pour mettre à jour une liste existante, utilisez la méthode `setList` :

```typescript
// Mise à jour d'une liste existante
let [operation, updatedList] = vpi.setList(list.token, {
  name: 'Liste modifiée',
  metadata: {
    description: 'Description mise à jour',
    path: [],
    ref_extern: '',
    external: null
  }
});

// Alternative : utiliser la méthode update de la liste
const updateOperation = list.update({
  name: 'Nouveau nom via la liste'
});
```

## Supprimer une Liste (Delete)

Pour supprimer une liste, utilisez la méthode `deleteList` :

```typescript
// Suppression d'une liste
let operation = vpi.deleteList('list-token');

// Alternative : suppression directe via la liste
const deleteOperation = list.delete();
```

## Gestion des Éléments de Liste

Les listes héritent de toutes les méthodes des structures pour gérer leurs éléments :

### Ajouter un élément à la liste

```typescript
// Ajouter un élément à la liste (IListChild)
const [itemOp, listItem] = list.addNode({
  type: 'list_child',
  name: 'Nouvelle tâche',
  child: 'work_node_token', // Token du nœud de type 'work' référencé
  meta: null
});
```

:::info Architecture des éléments de Liste
Les éléments d'une liste (`IListChild`) sont des **références virtuelles** qui pointent vers des nœuds réels du projet via la propriété `child`. Ils ne stockent pas directement les données métier, mais servent d'index ordonné vers les vrais nœuds.

- `type: 'list_child'` : Type spécifique aux éléments de liste
- `child: 'token'` : Référence vers le nœud réel (work, file, contact, etc.)
- `name` : Nom d'affichage dans la liste (peut différer du nœud référencé)
- `meta: null` : Les éléments de liste n'ont pas de métadonnées propres
:::

### Mettre à jour un élément de la liste

```typescript
// Mettre à jour un élément de la liste (IListChild)
const [updateItemOp, updatedItem] = list.setNode({
  ...listItem,
  name: 'Tâche modifiée',
  child: 'updated_work_node_token' // Nouveau token si on change la référence
});
```

### Vérifier l'existence d'un élément

```typescript
// Vérifier si un élément est dans la liste
const hasItem = list.hasNode(listItem.token);
```

### Supprimer un élément de la liste

```typescript
// Supprimer un élément de la liste
const deleteItemOp = list.deleteNode(listItem.token);
```

### Rechercher dans les éléments

```typescript
// Rechercher dans tous les éléments de la liste
const workResults = list.queryNodeAll({ type: 'work' });

// Récupérer un élément par son token
const item = list.getChildByToken('item-token');

// Rechercher par propriétés spécifiques
const specificWork = list.queryNodeAll({
  type: 'work',
  name: 'Tâche urgente'
});
```

## Types de Listes Courantes

### Liste de tâches

```typescript
const [workListOp, workList] = vpi.addList({
  id: crypto.randomUUID(),
  token: crypto.randomUUID(),
  type: 'list',
  name: 'Sprint Backlog',
  create_dt: Date.now(),
  update_dt: Date.now(),
  meta: {
    description: 'Liste des travaux à effectuer',
    children: []
  }
});

// Ajouter des références aux travaux (IListChild)
workList.addNode({
  type: 'list_child',
  name: 'Implémenter l\'authentification',
  child: 'work_node_token', // Token du nœud 'work' existant
  meta: null
});
```

### Liste de fichiers

```typescript
const [fileListOp, fileList] = vpi.addList({
  id: crypto.randomUUID(),
  token: crypto.randomUUID(),
  type: 'list',
  name: 'Documents du Projet',
  create_dt: Date.now(),
  update_dt: Date.now(),
  meta: {
    description: 'Liste des fichiers du projet',
    children: []
  }
});

// Ajouter des références aux fichiers (IListChild)
fileList.addNode({
  type: 'list_child',
  name: 'specification.pdf',
  child: 'file_node_token', // Token du nœud 'file' existant
  meta: null
});
```

### Liste de contacts

```typescript
const [contactListOp, contactList] = vpi.addList({
  id: crypto.randomUUID(),
  token: crypto.randomUUID(),
  type: 'contact-list',
  name: 'Équipe Projet',
  create_dt: Date.now(),
  update_dt: Date.now(),
  meta: {
    description: 'Liste des contacts de l\'équipe projet',
    children: []
  }
});

// Ajouter des références aux contacts (IListChild)
contactList.addNode({
  type: 'list_child',
  name: 'Jean Dupont',
  child: 'contact_node_token', // Token du nœud 'contact' existant
  meta: null
});
```

## Fonctionnalités Spécifiques aux Listes

### Gestion de l'ordre

```typescript
// Réorganiser les éléments de la liste
const reorderOperation = list.reorderItems([
  'item-1-token',
  'item-3-token',
  'item-2-token'
]);

// Déplacer un élément à une position spécifique
const moveOperation = list.moveItemToPosition('item-token', 2);
```

### Tri automatique

```typescript
// Configurer le tri automatique
list.update({
  properties: {
    ...list.properties,
    autoSort: true,
    sortBy: 'dueDate',
    sortOrder: 'ascending'
  }
});

// Appliquer le tri
const sortOperation = list.applySort();
```

### Filtrage

```typescript
// Configurer des filtres par défaut
list.update({
  properties: {
    ...list.properties,
    defaultFilters: {
      status: ['active', 'pending'],
      priority: ['high', 'medium']
    }
  }
});

// Appliquer des filtres
const filteredItems = list.queryNodeAll({
  status: 'active',
  assignee: 'user-123'
});
```

## Validation des Listes

Les listes héritent des méthodes de validation des structures :

```typescript
// Vérifier la cohérence de la liste
const isConsistent = list.isConsistant();

// Vérifier si la liste est complète
const isComplete = list.isComplete();

// Vérifier la validité de la liste
const isCorrect = list.isCorrect();
```

## Représentations des Listes

Les listes fournissent les mêmes représentations que les structures :

```typescript
// Représentations imbriquées
const nestedV1 = list.nestedv1(); // Liste - Éléments
const nestedV2 = list.nestedv2(); // Liste - Éléments - Détails

// Représentations aplaties
const flatV1 = list.flatv1(); // Liste aplatie avec éléments
const flatV2 = list.flatv2(); // Liste aplatie complète
```

## Métadonnées de Liste

```typescript
// Ajouter des métadonnées spécifiques à la liste
list.setMetadata({
  statistics: {
    totalItems: list.queryNodeAll().length,
    completedItems: list.queryNodeAll({ status: 'completed' }).length,
    averageProcessingTime: '2.5 days'
  },
  configuration: {
    autoArchive: true,
    archiveAfterDays: 30,
    notifications: ['item-added', 'item-completed']
  },
  lastUpdated: new Date().toISOString()
});
```

## Résumé des Opérations

- **Création (addList)** : Ajoute une nouvelle liste au projet
- **Lecture (getListBytoken, hasList, queryListAll)** : Différentes méthodes pour récupérer et rechercher des listes
- **Mise à jour (setList, list.update)** : Modifie les propriétés d'une liste existante
- **Suppression (deleteList, list.delete)** : Supprime une liste du projet
- **Gestion des éléments** : Toutes les méthodes héritées des structures pour gérer les éléments
- **Fonctionnalités spécifiques** : Tri, filtrage, réorganisation des éléments
- **Validation** : Méthodes héritées plus validations spécifiques aux listes
- **Représentations** : Vues ordonnées et représentations héritées des structures

Les listes offrent une gestion avancée des collections ordonnées d'éléments, avec des fonctionnalités spécifiques pour le tri, le filtrage et la validation de l'ordre, tout en héritant de la puissance des structures pour l'organisation hiérarchique.
