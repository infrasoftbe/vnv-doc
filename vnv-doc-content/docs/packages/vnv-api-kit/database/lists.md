---
title: "Data Lists"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
weight: 7
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Les listes sont un moyen efficace de gérer des collections d’items. Cette section explique comment manipuler les listes et leurs enfants.

```tsx
// Get all lists
Neo4jAPI().Lists().get<[]>();

// Get one list
Neo4jAPI().Lists("listId").get();

// Create one list
Neo4jAPI().Lists().create({ ...list... });

// Update one list
Neo4jAPI().Lists("listId").update({ ...list... });

// Delete one list
Neo4jAPI().Lists("listId").delete();
```

### Childrens

```tsx
/** ===== LIST_CHILD ===== */

// Get all list childs
Neo4jAPI().Lists("listId").Child().get<[]>();

// Get one list child
Neo4jAPI().Lists("listId").Child("childId").get();

// Create one list child
Neo4jAPI().Lists("listId").Child().create({ ...list_child... });

// Update one list child
Neo4jAPI().Lists("listId").Child("childId").update({ ...list_child... });

// Delete one list child
Neo4jAPI().Lists("listId").Child("childId").delete();

/** ===== LIST_LINKS ===== */

Neo4jAPI().Lists("listId").Links().get();
```