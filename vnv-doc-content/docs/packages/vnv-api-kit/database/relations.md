---
title: "Data Relations"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 5
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Relations

Les relations entre les nodes sont essentielles pour modéliser les interactions dans votre base de données. Cette section décrit comment gérer ces relations.

```tsx
// Get all relations
Neo4jAPI().Projects("projectId")
.Relations().get<[]>();

// Get one relation
Neo4jAPI().Projects("projectId")
.Relations("relationId").get();

// Create one relation
Neo4jAPI().Projects("projectId")
.Relations().create({ ...relation... });

// Update one relation
Neo4jAPI().Projects("projectId")
.Relations("relationId").update({ ...relation... });

// Delete one relation
Neo4jAPI().Projects("projectId")
.Relations("relationId").delete();
```