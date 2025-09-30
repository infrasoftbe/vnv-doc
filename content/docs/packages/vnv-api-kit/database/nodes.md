---
title: "Data Nodes"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 3
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Nodes

Cette section traite des opérations sur les nodes dans la base de donnée. Ces méthodes facilitent les opérations CRUD.

```tsx
// Get all nodes
Neo4jAPI().Nodes().get<[]>();

// Query all nodes
Neo4jAPI().Nodes().get<[]>({ ...nodeQuery... });

// Get one node
Neo4jAPI().Nodes("nodeId").get();

// Create one node
Neo4jAPI().Nodes().create({ ...node... });

// Update one node
Neo4jAPI().Nodes("nodeId").update({ ...node... });

// Delete one node
Neo4jAPI().Nodes("nodeId").delete();
```