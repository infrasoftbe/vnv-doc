---
title: "Domain addendum – Checklist commands"
description: "Commands that mark, change, or remove a required-document entry on a file structure"
toc: true
weight: 2356
---

# Domain addendum – Checklist commands

**Status:** Proposed  
**Principles:** [Domain layer – TO BE](adding-domain-layer.md)  
**Stories:** [US-C02](epics/epic-1-structure-metadata-user-stories.md#us-c02), [US-C03](epics/epic-1-structure-metadata-user-stories.md#us-c03), [US-C04](epics/epic-1-structure-metadata-user-stories.md#us-c04)  
**Architecture:** [Structure-level metadata](architecture-structure-level-metadata.md)

The node drawer does not append to `meta.completeness` itself. It calls one command. The command owns the checklist invariant and emits the VPI operations in one transaction.

## Aggregate

`FileStructure` is the aggregate root: a `STRUCTURE` whose `meta.type` is `file`. The checklist is a value on that aggregate, not a second node and not a LIST.

| Concept | Kind | Identity |
|---------|------|----------|
| `FileStructure` | Aggregate root | Structure token |
| `StructureChild` | Entity inside the structure | Child token. Stable for the life of that child. `name` and `child` (dotted path) are display fields. |
| `RequiredDocument` | Value in `meta.completeness.requiredChildren` | Child token. Fields: `token`, `child`, `name`, `obligation`. |

`obligation` is `mandatory`, `optional`, or `excluded`.

A structure that is not `meta.type === "file"` has no checklist. WBS and other types reject these commands.

## Invariants

1. `requiredChildren` tokens are unique.
2. After `setChecklistObligation`, the entry’s token is a child of this structure, and `name` / `child` are copied from that child.
3. After `removeChecklistEntry`, that token is absent. The structure child is still in the tree.
4. The command does not write File `verified_in` and does not create a `HAS_LINK`.

## Commands

Both run as `project.commands.*`. Each starts one transaction, mutates the aggregate, and ends it. The client does not call `setMetadata`.

### `setChecklistObligation`

US-C02 and US-C03.

```typescript
project.commands.setChecklistObligation({
  structureToken: string,
  childToken: string,
  obligation: "mandatory" | "optional" | "excluded",
})
```

- Unknown structure → `STRUCTURE_NOT_FOUND`.
- Structure is not a file structure → `NOT_A_FILE_STRUCTURE`.
- Child token is not a child of that structure → `CHILD_NOT_FOUND`.
- No entry for the token → append `{ token, child, name, obligation }` from the child.
- Entry already present → replace `obligation` only. Token stays. `name` and `child` are refreshed from the child.
- Entry already has that obligation → success, no write.

The tree badge is the entry’s `obligation` after the command. The completeness dot is not stored; the [completeness read](dossier-completeness-reads.md) derives it.

### `removeChecklistEntry`

US-C04.

```typescript
project.commands.removeChecklistEntry({
  structureToken: string,
  childToken: string,
})
```

- Deletes the `requiredChildren` entry with that token.
- The structure child remains.
- Token already absent → success, no write.
- Same not-found rules as `setChecklistObligation` for structure and file type.

## Client

```typescript
const result = await project.commands.setChecklistObligation({
  structureToken: selectedStructureToken,
  childToken: selectedChildToken,
  obligation: "mandatory",
});

if (!result.ok) {
  showError(result.error.message);
  return;
}
```

Relation names, JSON shape, and the metadata write stay inside the command.
