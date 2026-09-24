---
title: "Epic 2 – Dossier management and document profiles"
description: "Requirements for dossier profile via file Structure, presence, onboarding, and P5 completeness"
toc: true
weight: 120
---

# Epic 2 – Dossier management and document profiles

**Goal:** Project-specific document profile by reusing Structure `meta.type: file`. Presence (P5) is separate from verification (`verified_in`).

**Sources:** [Domain Model – Epic 2](../domain-model.md#epic-2-dossier-profile), [Functional Analysis §5](../business-analyse-vnv.md).

## Scope

- File Structure as expected dossier tree
- Slot overlay: obligation, phase, documentType; profile version/validity
- Template baseline and project override
- Onboarding copy (protocol P3)
- Completeness evaluation (protocol P5)
- UI for missing / present / optional slots

## Out of scope

- Writing File `verified_in` from presence
- Creating a verification item from profile alone
- Document review CCC (Epic 4 / 5)
- File replace vs iteration (deferred)
- SharePoint sync details (Epic 3)

## Requirements

### Profile model

| ID | Requirement |
|----|-------------|
| E2-R01 | The dossier profile shall reuse an as-is **Structure** with `meta.type: file`; it shall not introduce InputFile/OutputFile or profile File subtypes. |
| E2-R02 | An empty `structure_child` (no `HAS_LINK`) shall mean **missing**. |
| E2-R03 | A `HAS_LINK` from a leaf child to a File shall mean **present**. |
| E2-R04 | `structure.isComplete()` shall be the starting point for dossier completeness evaluation. |
| E2-R05 | Each slot shall support an overlay: **obligation** (mandatory / optional / excluded), **phase**, **documentType**. |
| E2-R06 | The profile shall support **version** and **validity** so completeness uses the active profile for that project and phase. |
| E2-R07 | Completeness shall always be evaluated against the **active** profile, not “whatever files are in the tree”. |

### Baseline and override

| ID | Requirement |
|----|-------------|
| E2-R08 | A **standard** profile shall exist as a template file Structure per project type. |
| E2-R09 | **Onboarding / apply template** shall copy the baseline Structure into the project and seed related items with protocol **P3**. |
| E2-R10 | The project shall be able to **override**: add slots, make optional, or exclude. |
| E2-R11 | Profile configuration shall not itself create PhaseContext on the profile record. |

### Presence vs verification

| ID | Requirement |
|----|-------------|
| E2-R12 | Presence shall **not** create a verification item. |
| E2-R13 | Presence shall **never** write File `verified_in`. |
| E2-R14 | Linking a File into a profile slot shall mark the slot present without changing File verified_in. |
| E2-R15 | Evaluating completeness shall set ReadinessCheck.dossierComplete, may raise PhaseBlockers for missing mandatory slots, and use protocol **P5**. |

### UI and follow-up

| ID | Requirement |
|----|-------------|
| E2-R16 | The UI shall show which mandatory documents are missing, present, optional, or excluded for the active phase. |
| E2-R17 | The UI shall support follow-up of missing, outdated, and rejected documents (status visibility; formal approval remains via verification, Epic 4). |
| E2-R18 | Completeness check shall be an **action** (and result view), not a permanent project mode. |

## Domain operations to implement (this epic)

Backlog #4–7, #5 (onboarding), #6 (link into slot).

## Acceptance criteria (epic level)

1. Template apply creates a file Structure with empty slots (missing).
2. Linking a File into a slot flips presence without approving the File.
3. Completeness report lists missing mandatory slots and does not set verified_in.
4. Project can override a slot to optional or excluded; completeness respects the active profile version.
