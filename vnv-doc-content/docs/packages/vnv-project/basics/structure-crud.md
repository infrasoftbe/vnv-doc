---
sidebar_position: 4
---

# Structures CRUD avec Fragments

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les **Fragments de Structures** dans un projet VNV en utilisant le VPI.

## Qu'est-ce qu'une Structure avec Fragments ?

Une structure au sein d'un VPI est un **Fragment de Node** étendu par la classe `Structure`. Elle possède les mêmes utilitaires que le nœud, plus des fonctionnalités spécifiques pour gérer des collections organisées.

### Children - Nodes organisationnels

Les structures utilisent des **Children** (structure_child) qui sont des **références virtuelles** stockées dans `structure.metadata.children`. Ces children :
- **N'ont pas** de metadata propres
- Sont des **pointeurs organisationnels** vers de vrais nœuds
- Possèdent un champ `child` qui indique la **position hiérarchique** :
  - **Structures** : `child: "1.2.1"` (position dans la hiérarchie - enfant de "1.2")
  - **Listes** : `child: "3"` (position dans la liste ordonnée)
- Sont **liés aux vrais nœuds** via des relations `HAS_LINK` dans `vpi.data.relations`
- Le vrai nœud lié doit avoir le type correspondant à `structure.meta.type`

## Ajouter une Structure (Create) - Processus en 2 étapes

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet
let project = vnv.VPI.ProjectInstance.init({/* votre projet */});

// ÉTAPE 1 : Ajout du fragment de structure
let [operation, structure] = vpi.addStructure({
  type: 'structure', // <-- !REQUIRED!
  name: 'Mon dossier de documents' // <-- !REQUIRED!
});

// ÉTAPE 2 : Ajout des métadonnées avec children organisationnels
let structureMetaContainer = {
  id: crypto.randomUUID(),
  token: structure.token,
  meta: {
    description: 'Dossier contenant tous les documents du projet',
    path: [],
    ref_extern: '',
    external: null,
    type: 'file', // <-- !REQUIRED!
    children: [
      // Children nodes avec positionnement hiérarchique
      {
        child: '1', // Position hiérarchique
        id: 'structure-child-1',
        meta: null,
        name: 'Document 1',
        token: 'child1-token',
        type: 'structure_child'
        // Relation HAS_LINK vers un nœud de type 'file' créée automatiquement
      },
      {
        child: '1.1', // Enfant de '1'
        id: 'structure-child-2',
        meta: null,
        name: 'Sous-document 1.1',
        token: 'child2-token',
        type: 'structure_child'
        // Relation HAS_LINK vers un nœud de type 'file' créée automatiquement
      }
  ]
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [metaOperation, metadata] = vpi.addMetadata(structureMetaContainer);
```

### Explication du Code

- `vpi.addStructure(...)` : Ajoute une nouvelle structure au projet. Cette méthode retourne un tableau contenant :
  - `operation` : L'opération associée à l'ajout de la structure.
  - `structure` : La structure qui a été ajoutée.

## Lire une Structure (Read)

Pour récupérer une structure existante, plusieurs méthodes sont disponibles :

```typescript
// Récupérer une structure par son token
const structure = vpi.getStructureByToken('structure-token');

// Vérifier l'existence d'une structure
const exists = vpi.hasStructure('structure-token');

// Rechercher dans toutes les structures avec des critères
const searchResults = vpi.queryStructureAll({ type: 'structure' });

// Rechercher une structure dans toutes les collections
const foundStructure = vpi.findNodeByToken('structure-token');
```

## Mettre à Jour une Structure (Update)

Pour mettre à jour une structure existante, utilisez la méthode `setStructure` :

```typescript
// Mise à jour d'une structure existante
let [operation, updatedStructure] = vpi.setStructure(structure.token, {
  name: 'Dossier renommé',
  metadata: {
    description: 'Description mise à jour',
    path: [],
    ref_extern: '',
    external: null,
  }
});

// Alternative : utiliser la méthode update de la structure
const updateOperation = structure.update({
  name: 'Nouveau nom via la structure'
});
```

## Supprimer une Structure (Delete)

Pour supprimer une structure, utilisez la méthode `deleteStructure` :

```typescript
// Suppression d'une structure
let operation = vpi.deleteStructure('structure-token');

// Alternative : suppression directe via la structure
const deleteOperation = structure.delete();
```

## Gestion des Nœuds Enfants

Les structures offrent des méthodes spécifiques pour gérer leurs nœuds enfants :

### Ajouter un nœud enfant

```typescript
// Ajouter un nœud enfant à la structure
const [childOp, childNode] = structure.addNode({
  type: 'file',
  name: 'Document enfant',
  metadata: {
    description: 'Contenu du document',
    path: [],
    ref_extern: '',
    external: null
  }
});
```

### Mettre à jour un nœud enfant

```typescript
// Mettre à jour un nœud enfant (IStructureChild)
const [updateChildOp, updatedChild] = structure.setNode({
  ...childNode,
  name: 'Titre modifié'
});
```

### Vérifier l'existence d'un nœud enfant

```typescript
// Vérifier si un nœud est enfant de la structure
const hasChild = structure.hasNode(childNode.token);
```

### Supprimer un nœud enfant

```typescript
// Supprimer un nœud enfant de la structure
const deleteChildOp = structure.deleteNode(childNode.token);
```

### Rechercher dans les nœuds enfants

```typescript
// Rechercher dans tous les nœuds enfants
const childResults = structure.queryNodeAll({ type: 'file' });

// Récupérer un enfant par son token
const child = structure.getChildByToken('child-token');
```

## Validation de la Structure

Les structures offrent des méthodes de validation pour vérifier leur intégrité :

```typescript
// Vérifier la cohérence de la structure
const isConsistent = structure.isConsistant();

// Vérifier si la structure est complète
const isComplete = structure.isComplete();

// Vérifier la validité de la structure
const isCorrect = structure.isCorrect();

// Exemple d'utilisation
if (!structure.isCorrect()) {
  console.warn('La structure présente des problèmes de validité');

  if (!structure.isConsistant()) {
    console.error('Problème de cohérence détecté');
  }

  if (!structure.isComplete()) {
    console.warn('La structure est incomplète');
  }
}
```

## Représentations de Données

Les structures fournissent différentes représentations pour l'affichage et l'export :

### Représentations imbriquées

```typescript
// Représentation imbriquée (Structure - Childs)
const nestedV1 = structure.nestedv1();

// Représentation imbriquée (Structure - Childs - Nodes)
const nestedV2 = structure.nestedv2();

console.log('Structure avec enfants directs:', nestedV1);
console.log('Structure avec enfants et leurs nœuds:', nestedV2);
```

### Représentations aplaties

```typescript
// Représentation aplatie (Structure - Childs)
const flatV1 = structure.flatv1();

// Représentation aplatie (Structure - Childs - Nodes)
const flatV2 = structure.flatv2();

console.log('Structure aplatie avec enfants:', flatV1);
console.log('Structure aplatie complète:', flatV2);
```

## Exemples d'Utilisation Avancée

### Structure de dossiers hiérarchique

```typescript
// Créer une structure de dossiers
const [folderOp, rootFolder] = vpi.addStructure({
  type: 'structure',
  name: 'Projet Documents',
  metadata: {
    description: 'Structure racine du projet',
    path: [],
    ref_extern: '',
    external: null
  }
});

// Ajouter des sous-structures
const [subStructureOp, subStructure] = rootFolder.addNode({
  type: 'structure',
  name: 'Documentation Technique'
});

// Ajouter des documents dans la sous-structure
const [docOp, document] = subStructure.addNode({
  type: 'file',
  name: 'Guide d\'installation'
});
```

### Structure de workflow

```typescript
// Créer une structure de workflow
const [workflowOp, workflow] = vpi.addStructure({
  type: 'structure',
  name: 'Processus de Validation',
  metadata: {
    description: 'Structure du processus de validation',
    path: [],
    ref_extern: '',
    external: null
  }
});

// Ajouter les étapes du workflow
workflow.addNode({
  type: 'work',
  name: 'Brouillon'
});

workflow.addNode({
  type: 'work',
  name: 'Révision'
});
```

## Propriétés Héritées des Nœuds

Les structures héritent de toutes les fonctionnalités des nœuds :

```typescript
// Gestion des métadonnées
const metadata = structure.getMetadata();
structure.setMetadata({
  ...metadata,
  structureType: 'hierarchical',
  lastOrganized: new Date().toISOString()
});

// Gestion des relations
const incomingRelations = structure.inRelationships;
const outgoingRelations = structure.outRelationships;

// Création de liens
structure.linkTo(otherStructure.token);
structure.linkFor(parentProject.token);

// Propriétés
const flatRepresentation = structure.flat;
const structureSchema = structure.schema;
```

## Résumé des Opérations

- **Création (addStructure)** : Ajoute une nouvelle structure au projet
- **Lecture (getStructureByToken, hasStructure, queryStructureAll)** : Différentes méthodes pour récupérer et rechercher des structures
- **Mise à jour (setStructure, structure.update)** : Modifie les propriétés d'une structure existante
- **Suppression (deleteStructure, structure.delete)** : Supprime une structure du projet
- **Gestion des enfants (addNode, setNode, hasNode, deleteNode, queryNodeAll, getChildByToken)** : Méthodes pour gérer les nœuds enfants
- **Validation (isConsistant, isComplete, isCorrect)** : Méthodes pour valider l'intégrité de la structure
- **Représentations (nestedv1, nestedv2, flatv1, flatv2)** : Différentes façons d'obtenir une représentation de la structure

Ces opérations vous permettent de créer et gérer des structures complexes dans un projet VNV, offrant une organisation hiérarchique des données avec validation et représentations multiples.
