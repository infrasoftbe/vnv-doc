---
title: "Metadatas"
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
## Metadatas

Les métadonnées ajoutent un niveau d’information supplémentaire aux nodes et aux projets. Voici comment gérer les métadonnées dans l’application.

```tsx
// Get all metadatas
Neo4jAPI().Projects("projectId")
.Metadatas().get<[]>();

// Get one metadata
Neo4jAPI().Projects("projectId")
.Metadatas("metadataId").get();

// Create one metadata
Neo4jAPI().Projects("projectId")
.Metadatas().create({ ...metadata... });

// Update one metadata
Neo4jAPI().Projects("projectId")
.Metadatas("metadataId").update({ ...metadata... });

// Delete one metadata
Neo4jAPI().Projects("projectId")
.Metadatas("metadataId").delete();
```
