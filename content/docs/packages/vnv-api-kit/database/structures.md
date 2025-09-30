---
title: "Data Structures"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 6
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Structures

Les structures permettent d’organiser les nodes d’une manière hiérarchique. Cette section explique comment gérer ces structures, y compris les enfants des structures.

```tsx
// Get all structures
Neo4jAPI().Structures().get<[]>();

// Get one structure
Neo4jAPI().Structures("structureId").get();

// Create one structure
Neo4jAPI().Structures().create({ ...structure... });

// Update one structure
Neo4jAPI().Structures("structureId").update({ ...structure... });

// Delete one structure
Neo4jAPI().Structures("structureId").delete();
```

### Childrens

```tsx
/** ===== STRUCTURE_CHILD ===== */

// Get all structure childs
Neo4jAPI().Structures("structureId").Child().get<[]>();

// Get one structure child
Neo4jAPI().Structures("structureId").Child("childId").get();

// Create one structure child
Neo4jAPI().Structures("structureId").Child().create({ ...structure_child... });

// Update one structure child
Neo4jAPI().Structures("structureId").Child("childId").update({ ...structure_child... });

// Delete one structure child
Neo4jAPI().Structures("structureId").Child("childId").delete();

/** ===== STRUCTURE_LINKS ===== */

Neo4jAPI().Structures("structureId").Links().get();
```
