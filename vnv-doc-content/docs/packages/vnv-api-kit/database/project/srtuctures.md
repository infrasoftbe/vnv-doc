---
title: "Structures"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 4
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Structure

```tsx
// Get all structures
Neo4jAPI().Projects("projectId")
.Structures().get<[]>();

// Get one structure
Neo4jAPI().Projects("projectId")
.Structures("structureId").get();

// Create one structure
Neo4jAPI().Projects("projectId")
.Structures().create({ ...structure... });

// Update one structure
Neo4jAPI().Projects("projectId")
.Structures("structureId").update({ ...structure... });

// Delete one structure
Neo4jAPI().Projects("projectId")
.Structures("structureId").delete();
```

### Childrens
```tsx
/** ===== STRUCTURE_CHILD ===== */

// Get all structure childs
Neo4jAPI().Projects("projectId")
.Structures("structureId").Child().get<[]>();

// Get one structure child
Neo4jAPI().Projects("projectId")
.Structures("structureId").Child("childId").get();

// Create one structure child
Neo4jAPI().Projects("projectId")
.Structures("structureId").Child().create({ ...structure_child... });

// Update one structure child
Neo4jAPI().Projects("projectId")
.Structures("structureId").Child("childId").update({ ...structure_child... });

// Delete one structure child
Neo4jAPI().Projects("projectId")
.Structures("structureId").Child("childId").delete();

/** ===== STRUCTURE_LINKS ===== */

Neo4jAPI().Projects("projectId")
.Structures("structureId").Links().get();
```