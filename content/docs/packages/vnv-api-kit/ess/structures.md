---
title: VPI Structures
weight: 7
---

```tsx
// Get all structures
SessionsAPI( 'sessionId' ).Project()
.Structures().get<[]>();

// Get one structure
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).get();

// Create one structure
SessionsAPI( 'sessionId' ).Project()
.Structures().create({ ... });

// Update one structure
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).update({ ... });

// Delete one structure
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).delete();

// ===== List childs =====

// Get all structure childs
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).Childs().get<[]>();

// Get one structure child
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).Childs( 'childId' ).get();

// Create one structure child
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).Childs().create({ ... });

// Update one structure child
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).Childs( 'childId' ).update({ ... });

// Delete one structure child
SessionsAPI( 'sessionId' ).Project()
.Structures( 'structureId' ).Childs( 'childId' ).delete();
```