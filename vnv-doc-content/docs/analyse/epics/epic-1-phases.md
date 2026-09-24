---
title: "Epic 1 – Phases, phase context and transitions"
description: "Requirements for SOI phases, PhaseContext, protocol overlay, readiness, blockers, and go/no-go"
toc: true
weight: 110
---

# Epic 1 – Phases, phase context and transitions

**Goal:** Configurable lifecycle phases as a **project-level finite state machine (FSM)**, PhaseContext on phase-scoped items, readiness and blockers, gated go/no-go. Protocol (P1..P5) is an overlay written by operations, not a second FSM.

**Sources:** [Domain Model](../domain-model.md), [Practical guide](../domain-model-practical.md), [Implementation backlog](../domain-model.md#implementation-backlog--actions-operations-side-effects).

## Scope

- Phase catalog and project-enabled phases (FSM states)
- Unique active `ProjectPhase.isActive` on the **Project** (FSM authority)
- PhaseContext: `current`, `verified_in`, `next required`, `protocol` on phase-scoped items
- Findings (escalation P4), readiness, PhaseBlocker, PhaseTransition
- UI visibility of phase context on dossier, document, requirement, verification item (or test stand-in)

## Out of scope

- Free-form user edit of PhaseContext fields
- App mode switch for protocol lanes
- Dossier profile overlay details (Epic 2)
- First-class VerificationItem type (Epic 4; use TestCase stand-in where needed)
- SharePoint formal decisions (Epic 3)

## Requirements

### Phase catalog and project phase FSM

| ID | Requirement |
|----|-------------|
| E1-R01 | The system shall maintain a **PhaseDefinition** catalog (at least VO, DO, UO, FAT, SAT, SIT, UAT/OAT) with stage, sequence, gate flag, and optional parent for sub-phases. |
| E1-R02 | A project shall enable a subset of PhaseDefinitions as **ProjectPhase** rows. |
| E1-R03 | The **project** shall have **exactly one** active ProjectPhase at any time after start (current FSM state). |
| E1-R04 | The active phase shall be one of the project's enabled ProjectPhases. |
| E1-R05 | The Project node itself shall not carry PhaseContext; FSM authority is **ProjectPhase.isActive** on the project. |
| E1-R06 | Users shall be able to **start the project phase FSM** in the first enabled phase. |

### PhaseContext

| ID | Requirement |
|----|-------------|
| E1-R07 | Phase-scoped types (Object, Requirement, File, VerificationItem/TestCase, TestCaseExecution, TestRun, test artefacts, Register findings) shall each have one **PhaseContext**. |
| E1-R08 | PhaseContext shall expose **current**, **verified_in**, **next required**, and **protocol**. |
| E1-R09 | Users shall **not** set current / verified_in / next required / protocol by hand; only domain operations (and authorised correction) shall write them. |
| E1-R10 | Phase context shall be **visible** in the UI on dossier, document, requirement, and verification item (or test stand-in) level. |
| E1-R11 | **verified_in** shall contain only phases for which a successful execution exists against that node as an **assessment subject**. |
| E1-R12 | Create, link, upload, profile presence, and evidence attachment shall **never** write verified_in. |
| E1-R13 | verified_in shall follow the **latest valid** execution for that phase (later fail invalidates). |

### Protocol overlay

| ID | Requirement |
|----|-------------|
| E1-R14 | **Protocol** (P1 Design, P2 Integration, P3 Onboarding, P4 Escalation, P5 Dossier) shall overlay the same phase; it shall not change the active ProjectPhase. |
| E1-R15 | Default protocol on create shall be the happy path for the stage (P1 design, P2 integration). |
| E1-R16 | Escalation / finding actions shall set protocol **P4**. |
| E1-R17 | Dossier-completeness actions shall set protocol **P5** (presence only; no verified_in). |
| E1-R18 | Template / onboarding publish shall set protocol **P3**. |
| E1-R19 | Protocol shall appear in the UI as **context on items** and as **filters**, not as a global app mode. |

### Create and escalate (PhaseContext side effects)

| ID | Requirement |
|----|-------------|
| E1-R20 | Creating a Requirement shall set current=P, verified_in=∅, next required=P, protocol=default. |
| E1-R21 | Creating a File shall set current=P, verified_in=∅, next required=P if deliverable assessment subject, protocol=default (P5 if under dossier work). |
| E1-R22 | Raising a finding (Register) shall set current=P, verified_in=∅, next required=P, protocol=P4 when escalation. |
| E1-R23 | Creating test project/build/plan/suite/case/run shall initialise PhaseContext with current=P, verified_in=∅, next required=P, protocol=default. |

### Execute (stand-in until Epic 4)

| ID | Requirement |
|----|-------------|
| E1-R24 | Pass of a test case (or VI) shall add P to verified_in on the item and on each **assessment subject** Requirement/File; next required cleared on item / advanced on subjects. |
| E1-R25 | Fail shall not add P (and remove P if prior pass invalidated); next required=P on item and assessment subjects. |
| E1-R26 | Blocked shall keep verified_in on the item, set next required=P, and raise a PhaseBlocker. |
| E1-R27 | Re-execute shall apply the latest valid result for P. |
| E1-R28 | Executions shall stamp requirement and file **versions**; PhaseContext does not store versions. |
| E1-R29 | Supporting input and evidence Files shall not receive verified_in from the execution. |

### Readiness, blockers, transitions

| ID | Requirement |
|----|-------------|
| E1-R30 | The system shall evaluate **readiness** (dossier presence, system-requirement verification, deliverable approvals, open critical P4/blockers) without writing subject verified_in. |
| E1-R31 | Users shall raise and resolve **PhaseBlockers**. |
| E1-R32 | Users shall **request** a phase transition from P toward the next enabled phase P′. |
| E1-R33 | **No-go** shall change neither active ProjectPhase nor PhaseContext. |
| E1-R34 | **Go** shall require readiness with no unresolved critical PhaseBlockers. |
| E1-R35 | On go: project FSM moves to P′ (`isActive`); Object follower (if any) and verified subjects follow; non-critical leftovers may lag; open P4 registers may stay P4; VI/test home phase stays P. |
| E1-R36 | Formal verification, CCC, and phase-gate decisions shall happen in the VNV platform, not in SharePoint. |

## User stories

Stories are split into **backend** (graph, domain operations, invariants) and **frontend** (Studio UI, read models, actions). Each story references requirement IDs.

### 1. Phase catalog and project phase FSM

#### E1-US01 – Maintain the phase catalog

| Layer | Story |
|-------|--------|
| **Backend** | **As a** platform engineer **I want** PhaseDefinition nodes in the graph with stage, sequence, gate flag, and optional parent **so that** all projects share one ordered lifecycle vocabulary. **Covers:** E1-R01. **AC:** SDK/node defs for `phase_definition`; CRUD via domain operation; catalog changes never alter any project's `isActive`; sub-phases link parent PhaseDefinition. |
| **Frontend** | **As a** standards administrator **I want** a catalog management screen **so that** I can create and edit phase definitions without touching project data. **Covers:** E1-R01. **AC:** List catalog with sequence; create/edit with parent picker; validation on code/sequence; no project FSM side effects. |

#### E1-US02 – Enable phases on a project

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** an operation to create ProjectPhase rows for a project from selected PhaseDefinitions **so that** the project has an explicit set of allowed FSM states. **Covers:** E1-R02, E1-R04. **AC:** `HAS_PROJECT_PHASE` from Project; each row references one PhaseDefinition; `isEnabled=true`, `isActive=false` until start; reject duplicate enablement of same definition. |
| **Frontend** | **As a** project manager **I want** to pick which catalog phases apply to my project **so that** we only track relevant lifecycle steps. **Covers:** E1-R02, E1-R04. **AC:** Multi-select from catalog ordered by sequence; show enabled list on project settings; cannot mark a phase active here (start is separate). |

#### E1-US03 – Start the project phase FSM

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** a `StartProjectPhaseFsm` domain operation **so that** exactly one ProjectPhase becomes active and optional Object PhaseContext followers are initialised. **Covers:** E1-R03–R06. **AC:** First enabled phase gets `isActive=true`; all others `false`; reject second start or double active; reject if no phases enabled; optionally init Object `current`/protocol; Project has no PhaseContext node. |
| **Frontend** | **As a** project manager **I want** to start the phase lifecycle from the project cockpit **so that** V&V work runs against one clear active phase. **Covers:** E1-R03–R06. **AC:** "Start lifecycle" action when none active; show active phase badge after start; disabled when no phases enabled; error if already started. |

#### E1-US04 – Show active project phase everywhere

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** a read API for the project's active ProjectPhase **so that** clients never infer FSM state from Object or items. **Covers:** E1-R03, E1-R05. **AC:** Returns single active phase or null; includes definition code/name; used as **P** in verify operations. |
| **Frontend** | **As a** V&V engineer **I want** the active project phase visible in the project header/cockpit **so that** I always know which FSM state we are in. **Covers:** E1-R03, E1-R05. **AC:** Prominent phase badge; updates after start/go; not editable inline. |

---

### 2. PhaseContext on items

#### E1-US05 – Create PhaseContext with phase-scoped items

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** create operations to attach a PhaseContext node to each phase-scoped type **so that** items track position relative to the project FSM. **Covers:** E1-R07, E1-R08, E1-R20–R23. **AC:** One PhaseContext per Object, Requirement, File, TestCase, TestCaseExecution, TestRun, test artefacts, Register finding; links to ProjectPhase for `current`/`verified_in`/`next required`; Protocol overlay. |
| **Frontend** | **As a** V&V engineer **I want** new requirements and files to show phase context immediately after create **so that** I see where they sit in the lifecycle. **Covers:** E1-R07, E1-R10, E1-R20–R21. **AC:** After create, inspector shows `current`, `verified_in`, `next required`, protocol read-only. |

#### E1-US06 – PhaseContext is read-only in UI

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** APIs to reject direct writes to PhaseContext fields **so that** only domain operations maintain invariants. **Covers:** E1-R09. **AC:** No public PATCH on `current`/`verified_in`/`next required`/`protocol`; authorised correction path documented separately. |
| **Frontend** | **As a** product owner **I want** phase context displayed but not editable **so that** users cannot bypass verification rules. **Covers:** E1-R09, E1-R10. **AC:** No form fields for PhaseContext; display-only badges on dossier, document, requirement, test stand-in. |

#### E1-US07 – verified_in rules on execute

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** pass/fail/re-execute operations to update `verified_in` only for assessment subjects **so that** presence and evidence never imply approval. **Covers:** E1-R11–R13, E1-R24–R27, E1-R29. **AC:** Pass adds P (project active phase); fail removes P if last valid pass; re-execute latest wins; evidence/supporting Files unchanged; upload/link never writes `verified_in`. |
| **Frontend** | **As a** V&V engineer **I want** test pass/fail to update requirement phase badges automatically **so that** I see verification progress without manual updates. **Covers:** E1-R10–R13, E1-R24–R27. **AC:** After execute, inspector refreshes `verified_in`; evidence file badges unchanged. |

---

### 3. Protocol overlay

#### E1-US08 – Protocol assigned by operations

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** domain operations to set protocol (P1–P5) on PhaseContext **so that** process path is recorded without changing the active phase. **Covers:** E1-R14–R18. **AC:** Default P1/P2 on create; P4 on escalation/finding; P5 on completeness evaluation; P3 on onboarding; protocol change never toggles `isActive`. |
| **Frontend** | **As a** user **I want** to see phase and protocol together (e.g. FAT · P2) **so that** I understand lifecycle state and process path at a glance. **Covers:** E1-R19. **AC:** Combined badge on items; filter by protocol; **no** global app mode switch. |

---

### 4. Findings and escalation

#### E1-US09 – Raise finding with P4 protocol

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** raising a Register finding to initialise PhaseContext with protocol P4 when escalated **so that** open issues are visible in the escalation lane. **Covers:** E1-R22, E1-R16. **AC:** `current`=P, `verified_in`=∅, `next required`=P; P4 when escalation flag set. |
| **Frontend** | **As a** V&V engineer **I want** to raise a finding from the project view **so that** blockers and escalations appear in readiness and filters. **Covers:** E1-R22, E1-R16. **AC:** Raise-finding action; P4 badge on finding; visible in open-findings list. |

---

### 5. Test execution (stand-in until Epic 4)

#### E1-US10 – Execute test case with phase side effects

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** execute-test operations using TestCase/TestCaseExecution **so that** Epic 1 phase rules apply before VerificationItem exists. **Covers:** E1-R24–R28. **AC:** Pass/fail/blocked/re-execute as per domain model; stamp REQ/FIL versions on execution; P from project active phase or check home phase. |
| **Frontend** | **As a** V&V engineer **I want** to record pass/fail/blocked on a test case **so that** requirement verification status updates in the UI. **Covers:** E1-R24–R27, E1-R10. **AC:** Execute dialog with result + optional evidence link; refresh phase context on subjects; blocked shows link to blocker if raised. |

#### E1-US11 – Close test run

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** close-test-run to update TestRun PhaseContext **so that** campaign completion is reflected in the FSM view. **Covers:** E1-R23 (partial), backlog #19–20. **AC:** All passed → `verified_in`+=P; incomplete/failed → `next required`=P. |
| **Frontend** | **As a** test lead **I want** to close a test run with a summary result **so that** the run's phase status is visible in the cockpit. **Covers:** backlog #19–20. **AC:** Close action; run badge updates; cannot close as "all passed" when cases still open. |

---

### 6. Readiness, blockers, and go/no-go

#### E1-US12 – Evaluate readiness

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** a ReadinessCheck operation **so that** gate criteria are evaluated without writing subject `verified_in`. **Covers:** E1-R30, E1-R17. **AC:** Reads dossier presence, system-REQ verification, deliverable approvals, open P4/blockers; writes score flags; may set dossier protocol P5; never approves Files. |
| **Frontend** | **As a** project manager **I want** a readiness report before a phase gate **so that** I see what still blocks a transition. **Covers:** E1-R30, E1-R34. **AC:** "Evaluate readiness" action; result view with dossier/REQ/deliverable/blocker breakdown; not a permanent project mode. |

#### E1-US13 – Manage phase blockers

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** raise/resolve PhaseBlocker operations **so that** critical conditions gate the FSM transition. **Covers:** E1-R31, E1-R26. **AC:** Blocker links optional causing node; severity; resolved flag; unresolved critical blockers prevent go. |
| **Frontend** | **As a** project manager **I want** to see and resolve blockers **so that** I can clear the path to go. **Covers:** E1-R31. **AC:** Blocker list on cockpit; resolve action; critical blockers highlighted on readiness view. |

#### E1-US14 – Request phase transition

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** to record PhaseTransition P→P′ without changing active phase yet **so that** go/no-go is an explicit decision. **Covers:** E1-R32. **AC:** Transition node from active to next enabled; PhaseContext unchanged until go/no-go decided. |
| **Frontend** | **As a** project manager **I want** to request moving to the next phase **so that** stakeholders can review readiness before deciding. **Covers:** E1-R32. **AC:** "Request transition" from P to P′; shows pending transition; readiness linked. |

#### E1-US15 – Decide no-go

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** no-go to leave FSM state unchanged **so that** a rejected gate does not advance the project. **Covers:** E1-R33. **AC:** Record decision on PhaseTransition; `isActive` stays P; all PhaseContexts unchanged. |
| **Frontend** | **As a** project manager **I want** to record no-go with rationale **so that** the project stays in the current phase. **Covers:** E1-R33. **AC:** No-go button on pending transition; requires comment; active phase badge unchanged. |

#### E1-US16 – Decide go

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** go to transition the project FSM to P′ and rewrite follower PhaseContexts **so that** verified items advance and leftovers can lag. **Covers:** E1-R34, E1-R35. **AC:** Requires readiness + no critical blockers; flip `isActive`; apply go rules for Object, REQ, File, VI/test, Register; VI home phase stays P. |
| **Frontend** | **As a** project manager **I want** to confirm go when readiness is green **so that** the project moves to the next phase. **Covers:** E1-R34, E1-R35. **AC:** Go enabled only when guards pass; confirm dialog; cockpit shows new active phase; lagging items still show old `current`. |

---

### 7. Graph model and platform integration

#### E1-US17 – Phase nodes in Neo4j

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** PhaseDefinition, ProjectPhase, PhaseContext, PhaseTransition, ReadinessCheck, PhaseBlocker, and Protocol as first-class graph nodes **so that** phases follow the existing Node/Relation metamodel. **Covers:** E1-R01–R08, domain model Epic 1. **AC:** SDK definitions; `HAS_{TYPE}` from Project; relations for current/verified_in/next/protocol; migrations/seed for catalog. |
| **Frontend** | — *(no direct story; consumes read APIs)* |

#### E1-US18 – Domain operations instead of raw graph writes

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** all Epic 1 UI actions to map to domain operations (not orphan nodes/relations from the client) **so that** invariants hold in one transaction. **Covers:** E1-R09, E1-R36, [adding-domain-layer](../adding-domain-layer.md). **AC:** No FE-created orphan TestCase pattern for phase flows; operations batch or command handlers; PhaseContext always a side effect. |
| **Frontend** | **As a** frontend developer **I want** to call application commands/APIs for phase actions **so that** I do not encode relation types or PhaseContext rules in Studio. **Covers:** E1-R09. **AC:** Replace direct `addNode`/`addRelation` for phase flows with typed API calls; handle operation errors with domain messages. |

#### E1-US19 – Decisions stay in VNV platform

| Layer | Story |
|-------|--------|
| **Backend** | **As a** backend developer **I want** go/no-go and verification outcomes persisted in the VNV graph **so that** SharePoint is not the system of record for gates. **Covers:** E1-R36. **AC:** PhaseTransition and execution results authoritative in platform; export/report hooks only. |
| **Frontend** | **As a** project manager **I want** to perform go/no-go in the project cockpit **so that** I do not need SharePoint for formal gate decisions. **Covers:** E1-R36. **AC:** Go/no-go UI in VNV; no "decide in SharePoint" workflow for Epic 1 scope. |

---

### Story map (backend vs frontend)

| ID | Theme | Backend | Frontend |
|----|-------|---------|----------|
| E1-US01 | Catalog | Graph + CRUD operation | Admin catalog UI |
| E1-US02 | Enable phases | ProjectPhase create | Project settings picker |
| E1-US03 | Start FSM | Start operation + invariants | Start lifecycle action |
| E1-US04 | Active phase | Read API | Cockpit badge |
| E1-US05 | PhaseContext create | Side effects on create | Inspector display |
| E1-US06 | Read-only context | Reject direct writes | No edit fields |
| E1-US07 | verified_in on execute | Pass/fail/re-execute ops | Badge refresh |
| E1-US08 | Protocol | Operation assignments | Badge + filter |
| E1-US09 | Findings / P4 | Register + PhaseContext | Raise finding UI |
| E1-US10 | Test execute | TestCase stand-in ops | Execute dialog |
| E1-US11 | Test run close | TestRun PhaseContext | Close run action |
| E1-US12 | Readiness | ReadinessCheck op | Readiness report |
| E1-US13 | Blockers | PhaseBlocker CRUD | Blocker list/resolve |
| E1-US14 | Request transition | PhaseTransition create | Request transition UI |
| E1-US15 | No-go | No state change | No-go + comment |
| E1-US16 | Go | FSM transition + rewrite | Go confirm (guarded) |
| E1-US17 | Graph model | SDK + Neo4j | — |
| E1-US18 | Domain layer | Command handlers | Typed API client |
| E1-US19 | Platform authority | Persist in graph | Cockpit go/no-go |

## Domain operations to implement (this epic)

From the [implementation backlog](../domain-model.md#implementation-backlog--actions-operations-side-effects): #1–3, #7 (readiness part), #8–9, #13–26 (with test stand-in for VI), A–D as needed.

## Acceptance criteria (epic level)

1. A project can enable phases and start the phase FSM with exactly one active `ProjectPhase`.
2. Creating a requirement shows phase context; user cannot edit `verified_in` directly.
3. Pass/fail of a test updates `verified_in` on assessment subjects only (P = project active phase).
4. Completeness evaluation does not approve files.
5. Go is blocked when critical blockers remain; no-go leaves the active phase unchanged.
6. UI shows phase + protocol together (e.g. DO · P1 / DO · P4) without a protocol mode switch.
7. Backend exposes domain operations; frontend does not orchestrate raw graph writes for phase flows.
