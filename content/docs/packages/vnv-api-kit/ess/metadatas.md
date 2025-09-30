---
title: VPI Metadatas
weight: 5
---

```tsx
// Get all nodes
SessionsAPI( 'sessionId' ).Project()
.Metadatas().get<[]>();

// Get one node
SessionsAPI( 'sessionId' ).Project()
.Metadatas( 'metadataId' ).get();

// Create one node
SessionsAPI( 'sessionId' ).Project()
.Metadatas().create({ ... });

// Update one node
SessionsAPI( 'sessionId' ).Project()
.Metadatas( 'metadataId' ).update({ ... });

// Delete one node
SessionsAPI( 'sessionId' ).Project()
.Metadatas( 'metadataId' ).delete();
```