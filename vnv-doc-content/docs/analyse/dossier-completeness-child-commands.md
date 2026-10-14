---
title: "Domain addendum – Structure child commands and the checklist"
description: "Rename, repath, and delete a structure child without leaving the checklist stale"
toc: true
weight: 2357
---

# Domain addendum – Structure child commands and the checklist

**Status:** Proposed  
**Principles:** [Domain layer – TO BE](adding-domain-layer.md)  
**Stories:** [US-C05](epics/epic-1-structure-metadata-user-stories.md#us-c05), [US-C06](epics/epic-1-structure-metadata-user-stories.md#us-c06)  
**Model:** [Checklist commands](dossier-completeness-checklist-commands.md)

Rename, repath, and delete already change a structure child. The checklist is denormalized `name` and `child` plus a token. Those fields must change in the **same transaction** as the child. A follow-up call that patches `requiredChildren` can be skipped, and then the report shows a stale label or an orphan token.

## Invariants

1. For every checklist entry, `token` equals a child that still exists on that structure.
2. `name` and `child` on the entry equal that child’s `name` and path.
3. The child token is not regenerated when the child is renamed or moved.

## Commands

### `updateStructureChild`

US-C05. This is the rename / repath command, not a second checklist command.

```typescript
project.commands.updateStructureChild({
  structureToken: string,
  childToken: string,
  name?: string,
  child?: string, // dotted path
})
```

Inside one transaction:

- Update the structure child.
- If `requiredChildren` has that token, set the entry’s `name` and `child` from the child after the update.
- Leave the token unchanged.
- No checklist entry → the child update still succeeds.

### `deleteStructureChild`

US-C06. Auto-remove, in the same transaction. A successful delete does not leave the choice “clean up later”.

```typescript
project.commands.deleteStructureChild({
  structureToken: string,
  childToken: string,
})
```

Inside one transaction:

- Delete that child and the descendants deleted with it.
- Drop every `requiredChildren` entry whose token is one of those deleted children.
- Children that remain keep their checklist entries.

The result can list the removed checklist tokens so the UI can offer undo as a new command that restores the child and the entry. Undo is not a second write inside this transaction.

## Client

The Structure tab calls `updateStructureChild` or `deleteStructureChild`. It does not read the checklist and issue `setMetadata` afterwards.
