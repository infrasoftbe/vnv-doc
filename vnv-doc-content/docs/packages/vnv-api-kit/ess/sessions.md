---
title : ESS
---

# SessionAPI

### Session

```tsx
// Get one session
SessionsAPI( 'sessionId' ).get()

// Import project excel in the session
SessionsAPI( 'sessionId' ).importExcelProject()

// Import project zip in the session
SessionsAPI( 'sessionId' ).importZipProject()
```