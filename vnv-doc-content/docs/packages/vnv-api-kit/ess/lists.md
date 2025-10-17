---
title: VPI Lists
weight: 8
---

```tsx
// Get all lists
SessionsAPI( 'sessionId' ).Project()
.Lists().get<[]>();

// Get one list
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).get();

// Create one list
SessionsAPI( 'sessionId' ).Project()
.Lists().create({ ... });

// Update one list
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).update({ ... });

// Delete one list
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).delete();

// ===== List childs =====

// Get all list childs
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).Childs().get<[]>();

// Get one list child
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).Childs( 'childId' ).get();

// Create one list child
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).Childs().create({ ... });

// Update one list child
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).Childs( 'childId' ).update({ ... });

// Delete one list child
SessionsAPI( 'sessionId' ).Project()
.Lists( 'listId' ).Childs( 'childId' ).delete();
```