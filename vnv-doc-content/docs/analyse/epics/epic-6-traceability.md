---
title: "Epic 6 – End-to-end traceability and coverage"
description: "Requirements for document → requirement → VI → execution → evidence chain and gap detection"
toc: true
weight: 160
---

# Epic 6 – End-to-end traceability and coverage

**Goal:** Full traceability chain and automatic detection of coverage, evidence, and re-verification gaps.

**Sources:** [Functional Analysis §14](../business-analyse-vnv.md), domain associations.

## Scope

- Chain: document → requirement → verification item → phase → test run → execution → evidence → finding → acceptance
- Coverage and gap detection
- Impact analysis on requirement/document version changes

## Out of scope

- Defining VI itself (Epic 4)
- Formal file-iteration model (deferred)

## Requirements

| ID | Requirement |
|----|-------------|
| E6-R01 | The system shall maintain and display the minimum chain: Document → Requirement → Verification item → Phase → Test run → Execution → Evidence → Finding → Acceptance. |
| E6-R02 | The system shall show which requirements are not yet covered by a VI/test in the active phase. |
| E6-R03 | The system shall show which documents are missing against the active profile (integrates Epic 2). |
| E6-R04 | The system shall show which requirements still lack evidence after planned checks. |
| E6-R05 | The system shall show which findings are still open. |
| E6-R06 | On change to a requirement or document version, the system shall support impact analysis: which VIs may need re-execution. |
| E6-R07 | Covered (linked assessment) shall remain distinct from verified (successful execution) in all coverage views. |
| E6-R08 | System/behavioural requirement coverage metrics shall be separable from process/deliverable requirements when requirement kind is available. |

## Acceptance criteria (epic level)

1. From a requirement the user can navigate to VIs, executions, and evidence.
2. Coverage view lists uncovered requirements for the active phase.
3. Changing a requirement version flags linked VIs for potential recheck.
