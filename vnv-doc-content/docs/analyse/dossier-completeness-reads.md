---
title: "Domain addendum – Completeness reads"
description: "Read the checklist and dossier completeness without a transaction"
toc: true
weight: 2360
---

# Domain addendum – Completeness reads

**Status:** Proposed  
**Principles:** [Domain layer – TO BE](adding-domain-layer.md)  
**Stories:** [US-C01](epics/epic-1-structure-metadata-user-stories.md#us-c01), [US-R01](epics/epic-1-structure-metadata-user-stories.md#us-r01), [US-R02](epics/epic-1-structure-metadata-user-stories.md#us-r02), [US-R04](epics/epic-1-structure-metadata-user-stories.md#us-r04)  
**Evaluation rules:** [Dossier completeness query](dossier-completeness-query.md)

Reads do not start a transaction and do not emit operations. The editor calls them on the open session. The report worker calls the same functions on the graph it loaded from Neo4j. Row rules live in `evaluateDossierCompleteness`, described in the query addendum.

## Model on the read side

`project.domain.fileStructure(structureToken)` returns the file-structure aggregate, or `null` when the token is missing or the structure is not `meta.type === "file"`.

A checklist node is a structure child whose token is in `requiredChildren`. The badge is that entry’s `obligation`. A child that only contains checklist nodes has no badge.

## Reads

### `checklist()`

US-C01, the badges.

```typescript
fileStructure(structureToken).checklist(): RequiredDocument[]
```

Returns `requiredChildren` as stored. An empty array means the checklist is not configured. The tree uses this list to decide which nodes get a badge. Orphan tokens (no matching child) stay in the list so the UI can flag them.

### `completeness()`

US-R01 and US-R04.

```typescript
fileStructure(structureToken).completeness(): {
  configured: boolean,
  rows: CompletenessRow[],
}
```

Delegates to `evaluateDossierCompleteness` for that structure. `configured` is false when `requiredChildren` is empty; `rows` is then empty. That is not “all mandatory present”.

Each row is one non-excluded entry: slot name, path, token, obligation, presence (`present`, `missing`, `optional-empty`, `invalid`), file name, file token. Excluded entries are omitted. The walk does not list every structure child.

### `branchStatus(path)`

US-C01, the dot. Derived from `completeness().rows`, not stored.

- No row whose path is `path` or a deeper path → no dot.
- Any row under that path is `missing` or `invalid` → red. A missing mandatory slot several layers down makes every ancestor red, including the structure root.
- Otherwise, when at least one row sits in the branch → green. Optional empty does not turn the branch red.

### `verplichteDocumenten()`

US-R02.

```typescript
project.domain.verplichteDocumenten(): {
  configured: boolean,
  rows: CompletenessRow[],
}
```

Concatenates `completeness()` for every file structure on the project. The report template `REP-VERPLICHTE-DOCS` calls this read. It does not run a List Report match over the tree. Wiring of that template is in the [query addendum](dossier-completeness-query.md).

`configured` is true when at least one file structure has a non-empty checklist. When it is false, the export is the “checklist not configured” message.
