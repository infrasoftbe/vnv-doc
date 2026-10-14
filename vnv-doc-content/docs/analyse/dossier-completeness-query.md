---
title: "Technical addendum – Dossier completeness query"
description: "How US-R04 evaluates requiredChildren into rows for the completeness screen and REP-VERPLICHTE-DOCS"
toc: true
weight: 2355
---

# Technical addendum – Dossier completeness query

**Status:** Proposed  
**Story:** [US-R04](epics/epic-1-structure-metadata-user-stories.md#us-r04)  
**Architecture:** [Structure-level metadata §5–§6](architecture-structure-level-metadata.md)

## 1. Decision

Do not extend the List Report DSL. Implement one pure function, `evaluateDossierCompleteness`, and call it from the editor and from the report worker.

The function contains the presence rules. Callers only supply the graph and render the rows. A later `structure.isComplete()` / ReadinessCheck calls the same function.

## 2. Why the DSL cannot do this

`reportEngineController.executeReport` and the `report-generation` worker always:

1. Build Cypher from `query.match` / `query.nodes` (`modules/report-dsl/queryBuilder.js`).
2. Run that Cypher.
3. Copy `query.return` onto the resulting rows (`mapReturnFields`).

That pipeline returns one row per matched node. A filter field may only be `alias.property` or `alias.meta.property` (`sanitizeField`). `meta.completeness.requiredChildren` is an array inside a nested object, so the query cannot unwind it. Report execution does not run the DuckDB post-process that metrics use. Post-processing could not resolve the file anyway: presence is a graph walk from the checklist token to `HAS_LINK`, and that walk has to happen while the entry is known.

## 3. Function

`evaluateDossierCompleteness` takes plain data: the project, its structures, their children, and `HAS_LINK` targets. It does not open Neo4j, does not write, and does not start a transaction.

For each structure with `meta.type === "file"`:

| Input | Result |
|-------|--------|
| `requiredChildren` missing or `[]` | `{ configured: false, rows: [] }` for that structure. The tree is not walked. |
| `obligation === "excluded"` | Entry omitted. |
| Token matches no child | One row, presence **Invalid**, file columns empty. |
| `HAS_LINK` → `FILE` on the slot | **Present**. File name and token filled. |
| No file on the slot, and a **direct** child has `HAS_LINK` → `FILE` | **Present**. A direct child is the slot path plus one segment (`1.2` → `1.2.1`). A deeper file does not count. |
| No file, obligation `mandatory` | **Missing**. File columns empty. |
| No file, obligation `optional` | **Optional empty**. File columns empty. |

Each row carries: project, structure name, slot name, path, token, obligation, presence, file name, file token.

Structures that are not `meta.type === "file"` are ignored. Several file structures are evaluated independently. An unconfigured structure adds no slot rows.

## 4. Editor

The completeness screen calls the function on the open project instance (`fileStructure(token).completeness()`). The input is the session graph, so a link that is not committed yet still counts. The call does not set File `verified_in`.

## 5. Report

`REP-VERPLICHTE-DOCS` is a List Report template whose `query` is a source marker, not a `match` block. `query.return` stays the column labels the Excel export already reads.

```json
{
  "token": "REP-VERPLICHTE-DOCS",
  "name": "Verplichte documenten",
  "type": "REPORT",
  "query": {
    "source": "dossierCompleteness",
    "return": []
  }
}
```

`executeReport` and the `report-generation` worker branch on `query.source === "dossierCompleteness"` **before** `buildCypher`. They load the project’s file structures, children, and file links from Neo4j, call `evaluateDossierCompleteness`, and pass the rows to the existing export. The preview cap is a slice of those rows, not `LIMIT` appended to Cypher.

When every file structure is unconfigured, the export is the “checklist not configured” message. It is not a dump of the structure tree.

The editor and the report can see different data: the screen reads the session, the report reads the last commit. The rules are the same function.
