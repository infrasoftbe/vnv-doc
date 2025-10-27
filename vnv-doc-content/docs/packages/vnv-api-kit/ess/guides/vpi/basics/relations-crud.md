---
title: Relations
weight: 3
---

Ce guide explique comment effectuer des opérations CRUD (Create, Read, Update, Delete) sur les relations entre nœuds dans un projet Infrasoft en utilisant le package @infrasoftbe/infrasoft-project.

{{< callout context="caution" title="Caution" icon="outline/alert-triangle" >}}
  **🚧 work in progress 🚧**
{{< /callout >}}


## Ajouter une Relation (Create)
Pour ajouter une relation entre deux nœuds dans un projet, utilisez la méthode addRelation après avoir initialisé le projet avec ProjectInstance.init.

```typescript
import { ProjectInstance } from '@infrasoftbe/infrasoft-project';

// Initialisation d'un projet
let project = ProjectInstance.init({...<project>...});

// Ajout d'une nouvelle relation entre deux nœuds
let [ operation , relation ] = project.addRelation({
  f_id: node1.id,
  f_token: node1.token,
  t_id: node2.id,
  t_token: node2.token,
  r_type: 'relationType', // Type de relation (RelationKind)
  create_dt: Date.now(),
  update_dt: Date.now()
});
```

## Explication du Code
- ProjectInstance.init(...) : Initialise un projet en retournant un ProxyProjectInstance qui permet un accès simplifié à toutes les couches du projet.
- project.addRelation() : Ajoute une relation en passant un objet IRelation complet avec les propriétés f_id, f_token (nœud source), t_id, t_token (nœud cible), r_type (type de relation), et les timestamps. Cette méthode retourne un tableau contenant deux éléments :
  - operation : L'opération associée à l'ajout de la relation.
  - relation : La relation qui a été ajoutée, comprenant toutes les propriétés IRelation.

## Lire une Relation (Read)
Pour lire les détails d'une relation existante, utilisez la méthode getRelation en spécifiant les tokens des nœuds concernés et le type de relation.

```typescript
// Lecture des détails d'une relation
let relation = project.getRelation({
  f_id: node1.id,
  f_token: node1.token,
  t_id: node2.id,
  t_token: node2.token,
  r_type: 'relationType'
});
```

## Explication du Code
- project.getRelation(...) : Récupère les détails d'une relation en utilisant la structure IRelation avec f_id, f_token, t_id, t_token et r_type. Cette méthode retourne la relation correspondante.

## Mettre à Jour une Relation (Update)

Pour mettre à jour une relation existante, utilisez la méthode updateRelation en spécifiant les nouvelles propriétés.

```typescript
Copier le code
// Mise à jour d'une relation existante
let [ operation , updatedRelation ] = project.setRelation({
  f_id: node1.id,
  f_token: node1.token,
  t_id: node2.id,
  t_token: node2.token,
  r_type: 'relationType',
  create_dt: existingRelation.create_dt, // Conserver la date de création
  update_dt: Date.now() // Mettre à jour la date de modification
});
```

## Explication du Code

- project.setRelation(...) : Met à jour une relation existante en passant un objet IRelation complet avec toutes les propriétés requises. Cette méthode retourne un tableau contenant l'opération effectuée et la relation mise à jour.

## Supprimer une Relation (Delete)

Pour supprimer une relation entre deux nœuds, utilisez la méthode deleteRelation en spécifiant les tokens des nœuds et le type de relation.

```typescript
// Suppression d'une relation
let operation = project.deleteRelation({
  f_id: node1.id,
  f_token: node1.token,
  t_id: node2.id,
  t_token: node2.token,
  r_type: 'relationType'
});
```

## Explication du Code

- project.deleteRelation(...) : Supprime la relation en utilisant la structure IRelation avec f_id, f_token, t_id, t_token et r_type. Cette méthode retourne l'opération associée à la suppression de la relation.

## Résumé des Opérations

- Création (addRelation) : Ajoute une nouvelle relation en passant un objet IRelation complet et retourne à la fois l'opération et la relation ajoutée.
- Lecture (getRelation) : Récupère les détails d'une relation existante en utilisant la structure IRelation.
- Mise à jour (setRelation) : Modifie une relation existante en passant un objet IRelation complet et retourne l'opération et la relation mise à jour.
- Suppression (deleteRelation) : Supprime une relation en utilisant la structure IRelation et retourne l'opération associée.

Ces opérations vous permettent de manipuler efficacement les relations entre les nœuds dans un projet Infrasoft, en utilisant les fonctionnalités exposées par le ProxyProjectInstance pour accéder directement aux différentes couches du projet.
