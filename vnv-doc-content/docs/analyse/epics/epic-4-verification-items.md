---
title: "Epic 4 – Verification items as core process"
description: "Requirements for VerificationItem, SHIPOC, subjects, file roles, and executions"
toc: true
weight: 140
---

# Epic 4 – Verification items as core process

**Goal:** VerificationItem as the formal planned check (execution and decision unit), with SHIPOC, assessment subjects, and explicit file roles.

**Sources:** [Domain Model – Epic 4](../domain-model.md#epic-4-verification-items), [Functional Analysis §11](../business-analyse-vnv.md).

## Scope

- First-class VerificationItem node type
- Kinds: document review, inspection, analysis, test, witness, validation scenario, defect re-verification
- Mandatory SHIPOC (supplier/customer attributes; hierarchy = PhaseContext; input/output = link roles)
- Assessment subjects (≥1 Requirement and/or File)
- Executions, evidence, decisions
- TestCase/TestCaseExecution as migration path / stand-in for test kind until cutover

## Out of scope

- Full CCC assessment type (Epic 5)
- End-to-end coverage analytics (Epic 6)
- File iteration epic (deferred)

## Requirements

### Model

| ID | Requirement |
|----|-------------|
| E4-R01 | The system shall support **VerificationItem** (`VI` / `verification_item`) owned by the project via `HAS_VERIFICATION_ITEM`. |
| E4-R02 | A verification item shall have kind, expected outcome, instructions, acceptance criteria, status, responsible party, supplier, and customer. |
| E4-R03 | Supported kinds shall include at least: document review, inspection, analysis, test, witness test, validation scenario, defect re-verification. |
| E4-R04 | SHIPOC shall be mandatory: Supplier and Customer as attributes; Hierarchy via PhaseContext; Input/Output via File (and Requirement) **link roles**; Process = instructions. |
| E4-R05 | A verification item shall have at least one **assessment subject**: one or more Requirements and/or one or more Files. |
| E4-R06 | File roles on a VI/execution shall be: assessment subject input, supporting input, or output/evidence — not File subclasses. |
| E4-R07 | The same File may take different roles on different VIs. |
| E4-R08 | Not every File shall require a VI; evidence and supporting inputs do not. |
| E4-R09 | Profile presence shall not create a VI. |

### Operations and PhaseContext

| ID | Requirement |
|----|-------------|
| E4-R10 | Creating a VI shall set current=P, verified_in=∅, next required=P; protocol=default, or P4 if deviation, or P5 if dossier document-review lane. |
| E4-R11 | Creating a VI shall mark assessment subjects as **covered** in P without writing their verified_in. |
| E4-R12 | Linking supporting input or evidence shall not change File PhaseContext or coverage/verified. |
| E4-R13 | Pass / pass with remarks / fail / blocked / re-execute shall follow Epic 1 PhaseContext rules for VI and assessment subjects. |
| E4-R14 | Executions shall stamp requirement and file versions assessed. |
| E4-R15 | Unlinking the last passing VI for phase P shall remove P from subject verified_in when applicable. |
| E4-R16 | Until VI is implemented, TestCase + TestCaseExecution shall act as stand-in for test-kind checks with the same subject and file-role rules. |

### Traceability on the item

| ID | Requirement |
|----|-------------|
| E4-R17 | For every VI it shall be traceable which requirement version is covered, which File roles were used, which executions ran, and the result plus rationale. |
| E4-R18 | A TestRun shall be able to group executions of one or more verification items (or test stand-ins) in a phase. |

## Domain operations to implement (this epic)

Backlog #10–11, #14–18, #21 (VI path); cutover from test stand-in.

## Acceptance criteria (epic level)

1. User cannot create a VI without an assessment subject.
2. Document-review pass updates File verified_in only when File is assessment subject.
3. Evidence file attached on pass does not get verified_in.
4. SHIPOC supplier/customer are required on create/update.
5. Deviation VI is stamped protocol P4; dossier-review lane can stamp P5.
