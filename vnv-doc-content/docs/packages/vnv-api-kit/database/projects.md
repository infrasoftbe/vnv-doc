---
title: "Data Projects"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 2
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Projects

La section suivante présente les méthodes disponibles pour gérer les projets dans l’application. Ces méthodes permettent d’effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les projets.

```tsx
// Get all projects
Neo4jAPI().Projects().get<[]>();

// Get one project
Neo4jAPI().Projects("projectId").get();

// Get one project + children
Neo4jAPI().Projects("projectId").getAll();

// Create one project
Neo4jAPI().Projects().create({ ...project... });

// Update one project
Neo4jAPI().Projects("projectId").update({ ...project... });

// Delete one project
Neo4jAPI().Projects("projectId").delete();
```