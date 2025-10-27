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

Pour ajouter une liste à un projet, suivez ce processus en 2 étapes :

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let vpi = vnv.VPI.ProjectInstance.init({/* votre projet */});

// ÉTAPE 1 : Ajout du fragment de liste
let [operation, list] = vpi.addList({
  type: 'list', // <-- !REQUIRED!
  name: 'Ma liste de tâches' // <-- !REQUIRED!
});

// ÉTAPE 2 : Ajout des métadonnées avec children organisationnels
let listMetaContainer = {
  id: crypto.randomUUID(),
  token: list.token,
  meta: {
    description: 'Liste des tâches à accomplir pour le projet',
    path: [],
    ref_extern: '',
    external: null,
    type: 'work', // <-- !REQUIRED!
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [metaOperation, metadata] = vpi.addMetadata(listMetaContainer);
```

### Explication du Code

- `vpi.addList(...)` : Ajoute une nouvelle liste au projet (Étape 1). Cette méthode retourne un tableau contenant :
  - `operation` : L'opération associée à l'ajout de la liste.
  - `list` : La liste qui a été ajoutée.
- `vpi.addMetadata(...)` : Ajoute les métadonnées à la liste (Étape 2).

:::warning Relations HAS_LINK et Children
**Important :** Le champ `child` dans les `list_child` indique la **position** dans la liste (ex: "1", "2", "3"), **PAS** le token du nœud cible.

La connexion vers les vrais nœuds se fait via des **relations HAS_LINK** stockées dans `vpi.data.relations` :
- **Source** : le `list_child` (structure_child pour les structures)
- **Target** : un nœud dont le `type` correspond à `list.meta.type`
- **Type de relation** : `"HAS_LINK"`

Exemple :
```typescript
// list.meta.type = 'task'
// Relation créée automatiquement :
// FROM: list_child.token -> TO: nœud_task.token (type: "HAS_LINK")
```
:::

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
  child: '1', // Position dans la liste (1, 2, 3...)
  meta: null
});
```

:::info Architecture des éléments de Liste
Les éléments d'une liste (`IListChild`) sont des **références virtuelles** ordonnées qui sont **liées** aux vrais nœuds via des relations `HAS_LINK` dans `vpi.data.relations`.

- `type: 'list_child'` : Type spécifique aux éléments de liste
- `child: '1'` : **Position** dans la liste ordonnée (1, 2, 3...)
- `name` : Nom d'affichage dans la liste
- `meta: null` : Les éléments de liste n'ont pas de métadonnées propres
- **Relation HAS_LINK** : Créée automatiquement vers un nœud dont le type = `list.meta.type`
:::

### Mettre à jour un élément de la liste

```typescript
// Mettre à jour un élément de la liste (IListChild)
const [updateItemOp, updatedItem] = list.setNode({
  ...listItem,
  name: 'Tâche modifiée',
  child: '2' // Nouvelle position dans la liste
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
// ÉTAPE 1 : Créer le fragment de liste
const [workListOp, workList] = vpi.addList({
  type: 'list',
  name: 'Sprint Backlog'
});

// ÉTAPE 2 : Ajouter les métadonnées
let workListMetaContainer = {
  id: crypto.randomUUID(),
  token: workList.token,
  meta: {
    description: 'Liste des travaux à effectuer',
    path: [],
    ref_extern: '',
    external: null,
    type: 'task',
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [workMetaOp, workMetadata] = vpi.addMetadata(workListMetaContainer);

// Ajouter des références aux travaux (IListChild)
workList.addNode({
  type: 'list_child',
  name: 'Implémenter l\'authentification',
  child: '1', // Position 1 dans la liste
  meta: null
  // Relation HAS_LINK créée vers un nœud de type 'task'
});
```

### Liste de fichiers

```typescript
// ÉTAPE 1 : Créer le fragment de liste
const [fileListOp, fileList] = vpi.addList({
  type: 'list',
  name: 'Documents du Projet'
});

// ÉTAPE 2 : Ajouter les métadonnées
let fileListMetaContainer = {
  id: crypto.randomUUID(),
  token: fileList.token,
  meta: {
    description: 'Liste des fichiers du projet',
    path: [],
    ref_extern: '',
    external: null,
    type: 'file',
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [fileMetaOp, fileMetadata] = vpi.addMetadata(fileListMetaContainer);

// Ajouter des références aux fichiers (IListChild)
fileList.addNode({
  type: 'list_child',
  name: 'specification.pdf',
  child: '1', // Position 1 dans la liste
  meta: null
  // Relation HAS_LINK créée vers un nœud de type 'file'
});
```

### Liste de contacts

```typescript
// ÉTAPE 1 : Créer le fragment de liste
const [contactListOp, contactList] = vpi.addList({
  type: 'list',
  name: 'Équipe Projet'
});

// ÉTAPE 2 : Ajouter les métadonnées
let contactListMetaContainer = {
  id: crypto.randomUUID(),
  token: contactList.token,
  meta: {
    description: 'Liste des contacts de l\'équipe projet',
    path: [],
    ref_extern: '',
    external: null,
    type: 'contact',
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [contactMetaOp, contactMetadata] = vpi.addMetadata(contactListMetaContainer);

// Ajouter des références aux contacts (IListChild)
contactList.addNode({
  type: 'list_child',
  name: 'Jean Dupont',
  child: '1', // Position 1 dans la liste
  meta: null
  // Relation HAS_LINK créée vers un nœud de type 'contact'
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
