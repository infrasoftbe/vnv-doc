---
title: VPI Relations
weight: 6
---

```tsx
// Get all relations
SessionsAPI( 'sessionId' ).Project()
.Relations().get<[]>();

// Get one relation
SessionsAPI( 'sessionId' ).Project()
.Relations( 'relationId' ).get();

// Create one relation
SessionsAPI( 'sessionId' ).Project()
.Relations().create({ ... });

// Update one relation
SessionsAPI( 'sessionId' ).Project()
.Relations( 'relationId' ).update({ ... });

// Delete one relation
SessionsAPI( 'sessionId' ).Project()
.Relations( 'relationId' ).delete();
```