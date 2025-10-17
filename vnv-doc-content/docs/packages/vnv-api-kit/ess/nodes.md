---
title: VPI Nodes
weight: 4
---

### Nodes

```tsx
// Get all nodes
SessionsAPI( 'sessionId' ).Project()
.Nodes().get<[]>();

// Get one node
SessionsAPI( 'sessionId' ).Project()
.Nodes( 'nodeId' ).get();

// Create one node
SessionsAPI( 'sessionId' ).Project()
.Nodes().create({ ... });

// Update one node
SessionsAPI( 'sessionId' ).Project()
.Nodes( 'nodeId' ).update({ ... });

// Delete one node
SessionsAPI( 'sessionId' ).Project()
.Nodes( 'nodeId' ).delete();
```