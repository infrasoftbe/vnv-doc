---
title: "Domain addendum – Duplicate file structure"
description: "Duplicate structure copies the checklist onto new child tokens"
toc: true
weight: 2358
---

# Domain addendum – Duplicate file structure

**Status:** Proposed  
**Principles:** [Domain layer – TO BE](adding-domain-layer.md)  
**Story:** [US-C07](epics/epic-1-structure-metadata-user-stories.md#us-c07)  
**Model:** [Checklist commands](dossier-completeness-checklist-commands.md)

**Duplicate structure** already copies the open structure inside the same project. The copy gives each child a new token and copies metadata as a blob, so `requiredChildren` still points at the source tokens. US-C07 closes that gap inside the duplicate command. There is no separate template-apply command.

## Command

```typescript
project.commands.duplicateStructure({
  structureToken: string,
})
```

One transaction:

1. Create the new structure. `meta.default` is false. The source is unchanged.
2. Copy children. Build a map from each source child token to the new child token.
3. Copy `meta.completeness`. Rewrite every `requiredChildren[].token` through that map. Copy `name`, `child`, and `obligation` onto the new entry.
4. An empty or missing checklist on the source stays empty on the copy. The command does not invent entries from the tree.
5. The two checklists are separate values. A later `setChecklistObligation` on one structure does not write the other.

`HAS_LINK` targets are not copied. The copy’s slots start without files, so presence is missing or optional empty until a file is linked.

Non-file structures can still be duplicated. They have no checklist to rewrite.

## Result

```typescript
{ ok: true, data: { structureToken: string } }
```

Unknown source → `STRUCTURE_NOT_FOUND`.
