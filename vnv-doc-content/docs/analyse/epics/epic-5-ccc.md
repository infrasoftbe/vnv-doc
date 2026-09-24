---
title: "Epic 5 – CCC governance via verification items"
description: "Requirements for Completeness, Compliance, and Correctness at item and phase level"
toc: true
weight: 150
---

# Epic 5 – CCC governance via verification items

**Goal:** Evaluate Completeness, Compliance, and Correctness per verification item, with evidence and rationale, and consolidate per phase for go/no-go.

**Sources:** [Functional Analysis](../business-analyse-vnv.md) (CCC method, Epic 5).

## Scope

- CCC criteria on verification item executions
- Evidence and rationale per criterion
- Phase-level consolidation for readiness / go-no-go
- Distinction from dossier **presence** (Epic 2) and behavioural verification (Epic 1/4)

## Out of scope

- Replacing PhaseContext with CCC scores alone
- Running CCC exclusively in SharePoint (Epic 3)

## Requirements

| ID | Requirement |
|----|-------------|
| E5-R01 | Per verification item execution, the system shall record **Completeness**, **Compliance**, and **Correctness** with status and rationale. |
| E5-R02 | Each CCC result shall link to evidence and to the phase context of the item. |
| E5-R03 | Completeness (CCC) shall mean: required inputs, criteria, and evidence are present to execute the item — distinct from dossier profile presence (P5). |
| E5-R04 | Compliance shall mean: the assessment method aligns with requirements, standards, and contractual agreements. |
| E5-R05 | Correctness shall mean: the result is substantively correct, reproducible, and consistent with linked requirement(s). |
| E5-R06 | The system shall consolidate CCC per phase to support go/no-go decision-making. |
| E5-R07 | CCC assessment shall be executable only in the VNV platform (not SharePoint). |
| E5-R08 | UI shall show CCC status at item level and aggregated at phase/project cockpit level. |

## Acceptance criteria (epic level)

1. Executing a VI can record three CCC dimensions with rationale and evidence links.
2. Phase readiness/cockpit shows consolidated CCC without conflating it with profile presence alone.
3. CCC cannot be finalized as a formal decision outside VNV.
