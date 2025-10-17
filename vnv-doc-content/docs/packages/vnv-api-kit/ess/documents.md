---
title: ESS Documents
weight: 10
---

```tsx
// Get all documents
SessionsAPI( 'sessionId' ).Documents().get<[]>();

// Get one document
SessionsAPI( 'sessionId' ).Documents( 'documentName.txt' ).get();

// Get one folder content
SessionsAPI( 'sessionId' ).Documents( 'folder' ).get();

// Download one folder and the content
SessionsAPI( 'sessionId' ).Documents( 'folder' ).download();

// Download one documents
SessionsAPI( 'sessionId' ).Documents( 'folder/documentName.txt' ).download();
```