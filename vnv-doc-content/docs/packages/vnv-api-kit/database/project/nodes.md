---
title: "Nodes"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 1
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Générique

Cette section traite des opérations sur les nodes génériques, permettant de gérer tous les types de nodes associés à un projet. Comme pour les projets, ces méthodes facilitent les opérations CRUD.

```tsx
// Get all nodes
Neo4jAPI().Projects("projectId")
.Nodes().get<[]>();

// Query all nodes
Neo4jAPI().Projects("projectId")
.Nodes().get<[]>({ ...nodeQuery... });

// Get one node
Neo4jAPI().Projects("projectId")
.Nodes("nodeId").get();

// Create one node
Neo4jAPI().Projects("projectId")
.Nodes().create({ ...node... });

// Update one node
Neo4jAPI().Projects("projectId")
.Nodes("nodeId").update({ ...node... });

// Delete one node
Neo4jAPI().Projects("projectId")
.Nodes("nodeId").delete();
```

## Spécifique

Les layers de gestion des nodes sont générés dynamiquement à partir des [`NodeConstructor`](../../vnv-project/modules/#nodecontructor) fournis par le module [`@infrasoft/vnv-project`](../../vnv-project/). Cela signifie que chaque type de node défini dans ce module sera automatiquement intégré en tant que [layer](../guide/api-layer/api-layer.md) dans notre application, permettant ainsi une gestion flexible et évolutive des données.

### Fonctionnement

Lors de l’initialisation de notre système, chaque [`NodeConstructor`](../../vnv-project/modules/#nodecontructor) est analysé pour déterminer les types de nodes disponibles. Pour chaque type détecté, un [layer](../guide/api-layer/api-layer.md) correspondant est créé, facilitant ainsi les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur ces nodes.

Ce mécanisme garantit que les layers restent synchronisés avec les modèles de nodes fournis par le module [`@infrasoft/vnv-project`](../../vnv-project/). Ainsi, toute évolution ou ajout de nouveaux types de nodes dans le module sera immédiatement reflété dans notre application, sans nécessiter de modifications manuelles.

### Exemples de Layers

Voici quelques exemples de layers générés dynamiquement

### Orders

```tsx
// Get all orders
Neo4jAPI().Projects("projectId")
.Orders().get<[]>();

// Query all orders
Neo4jAPI().Projects("projectId")
.Orders().get<[]>({ ...query... });

// Get one order
Neo4jAPI().Projects("projectId")
.Orders("orderId").get();

// Create one order
Neo4jAPI().Projects("projectId")
.Orders().create({ ...order... });

// Update one order
Neo4jAPI().Projects("projectId")
.Orders("orderId").update({ ...order... });

// Delete one order
Neo4jAPI().Projects("projectId")
.Orders("orderId").delete();
```

### Deliverables

```tsx
// Get all deliverables
Neo4jAPI().Projects("projectId")
.Deliverables().get<[]>();

// Query all deliverables
Neo4jAPI().Projects("projectId")
.Deliverables().get<[]>({ ...query... });

// Get one deliverable
Neo4jAPI().Projects("projectId")
.Deliverables("deliverableId").get();

// Create one deliverable
Neo4jAPI().Projects("projectId")
.Deliverables().create({ ...deliverable... });

// Update one deliverable
Neo4jAPI().Projects("projectId")
.Deliverables("deliverableId").update({ ...deliverable... });

// Delete one deliverable
Neo4jAPI().Projects("projectId")
.Deliverables("deliverableId").delete();
```

### Works

```tsx
// Get all works
Neo4jAPI().Projects("projectId")
.Works().get<[]>();

// Query all works
Neo4jAPI().Projects("projectId")
.Works().get<[]>({ ...query... });

// Get one work
Neo4jAPI().Projects("projectId")
.Works("workId").get();

// Create one work
Neo4jAPI().Projects("projectId")
.Works().create({ ...work... });

// Update one work
Neo4jAPI().Projects("projectId")
.Works("workId").update({ ...work... });

// Delete one work
Neo4jAPI().Projects("projectId")
.Works("workId").delete();
```

### ETC…

La logique est toujours la même pour chaque couche de type de node.

---
