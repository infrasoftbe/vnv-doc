---
title: "Domain addendum – Link a file into a dossier slot"
description: "Linking a file changes presence only; the checklist is not rewritten"
toc: true
weight: 2359
---

# Domain addendum – Link a file into a dossier slot

**Status:** Proposed  
**Principles:** [Domain layer – TO BE](adding-domain-layer.md)  
**Story:** [US-R03](epics/epic-1-structure-metadata-user-stories.md#us-r03)  
**Read:** [Completeness reads](dossier-completeness-reads.md)

Presence is not a field on the checklist. After a file is linked or unlinked, [completeness](dossier-completeness-reads.md) is read again. That read sees `HAS_LINK` and returns Present, Missing, or Optional empty. The link command does not update `requiredChildren` and does not set File `verified_in`.

## Commands

```typescript
project.commands.linkFileToStructureChild({
  childToken: string,
  fileToken: string,
})

project.commands.unlinkFileFromStructureChild({
  childToken: string,
  fileToken: string,
})
```

Each is one transaction that writes or removes `HAS_LINK` from the structure child to the file.

- Unknown child or file → not found.
- `HAS_LINK` is only allowed from a leaf child (domain-model invariant 4). A child that still has children rejects the link.
- Linking a file that is already linked to that child → success, no second relation.
- Unlink when no such relation exists → success, no write.

The checklist entry is untouched. A slot that is not on the checklist can still hold a file; completeness continues to ignore it.

## Why the screen updates

US-R03 is the next `fileStructure(token).completeness()` call:

- `HAS_LINK` → `FILE` on the checklist child, or on a direct placeholder child → **Present**.
- Link removed, obligation `mandatory` → **Missing**.
- Link removed, obligation `optional` → **Optional empty**.
