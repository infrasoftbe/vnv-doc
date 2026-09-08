# Functional Analysis – Platform for Verification and Validation of Infrastructure Projects

# 1. Purpose

The platform supports the verification and validation of infrastructure projects based on documents, requirements, tests, and evidence.

The application is intended for projects in which a client or independent party checks whether a contractor has correctly specified, designed, delivered, and tested a project.

In this context, **verification** means demonstrating that intermediate results and deliverables comply with specifications, standards, and contractual requirements ("are we building the system right?"). **Validation** means demonstrating that the delivered system is fit for the intended use and operational need ("are we building the right system?").

Assessment in each phase follows the **CCC method**:
- **Completeness**: is all required information and documentation present?
- **Compliance**: does the content meet requirements, standards, and agreements?
- **Correctness**: is the content substantively correct, consistent, and demonstrable?

The platform must allow users to:
- track dossiers and documents
- check whether a dossier is complete
- manage requirements and their evolution
- perform verifications and validations across different phases
- link documents, requirements, tests, and findings
- build full traceability toward acceptance

The platform is document-driven: documents are the input; verifications and acceptance decisions are the output.

---

# 2. Lifecycle model of the System of Interest (SOI)

This model describes the lifecycle of the **System of Interest (SOI)**, i.e. the asset being verified and validated.

The platform supports at least the following SOI phases:

- VO – Preliminary Design
- DO – Detailed Design
- UO – Execution Design
- FAT – Factory Acceptance Test
- SAT – Site Acceptance Test
- SIT – System Integration Test
- UAT / OAT

The platform's first priority is to implement this lifecycle model and make it clearly visible in the user interface.

The SOI phase is **cardinal and unique**: at any moment the SOI is in exactly **one** active phase/status.

The lifecycle model distinguishes:

- **Design stage**: VO, DO, UO
- **Integration stage**: FAT, SAT, SIT

Within FAT, the following sub-phases are distinguished:

- FAT Software
- FAT Hardware

Phases are formal **decision points** (phase gates) with:

- an explicit go/no-go decision
- a phase-bound dossier and requirements check
- an escalation procedure for blockers or deviations

For every item, document, requirement, test, or finding it must be visible:
- what the current SOI lifecycle phase is in which it is being assessed
- in which previous phase it was already verified
- which next phase is still required

Operational coupling to phases happens via **verification items**. A verification item is the concrete control unit in a specific phase (for example document review in DO, test case execution in FAT, witness test in SAT). The execution and evidence of these verification items determine whether an item can be considered verified in the current phase, and which next phase can responsibly be started.

Besides the SOI, several other systems exist (for example enabling systems/tooling) with their own lifecycle. This chapter specifies only the SOI lifecycle.

Phase-specific focus on requirements and dossier:

- **VO**: focus on `CRS` (Customer Requirements Specification), covering both generic and project-specific customer requirements.
  - Example 1: "The asset must have availability of at least 99.5% on an annual basis."
  - Example 2: "Bridge opening must be possible safely, with priority for emergency and rescue services."
- **DO**: focus on `SRS` (System Requirements Specification), including system architecture, software/hardware setup, and BOM.
  - Example 1: "The control architecture consists of redundant PLCs with failover < 2 seconds."
  - Example 2: "The system must meet SIL2 safety architecture in hardware, with separated I/O chains."
- **UO**: focus on `TRS` and `FRS` (Test Requirements and Functional Requirements) as the basis for execution-oriented verification and validation.
  - Example TRS: "FAT test TC-FAT-023 must demonstrate that opening time remains <= 90 seconds under nominal load."
  - Example FRS: "On the 'Open bridge' command, the system must sequentially close barriers, set traffic lights to red, and then start the opening process."

Modeling principle in the system:

- There is one primary context: `phase_context` (the unique lifecycle phase of the SOI).
- There is one secondary, orthogonal context: `protocol_context` (P1..P5 process/governance path).

This means: no extra phase lifecycle, but an overlay on the same phase.

Examples:
- DO + P1: design verification in the happy path.
- DO + P4: escalation and deviation handling in the non-happy path.
- DO + P5: dossier completeness and document traceability.

---

# 3. VO / DO / UO

Positioning according to the operational protocol (cf. diagram):

- **P1 Design protocol (happy path)**: design stage with verification on VO, DO, and UO.
- **P2 Integration protocol (happy path)**: realization validation and acceptance in FAT, SAT, and SIT.
- **P3 Onboarding / knowledge protocol**: use of standardized specification templates.
- **P4 Support & escalation (non-happy path)**: incident, escalation, and change management.
- **P5 Dossier management protocol**: end-to-end document traceability across tender, study, prebuilt, building, and as-built dossiers.

## 3.1 VO – Preliminary Design

Purpose:
> Is the tender / assignment complete and correct?

In this phase the following is checked:
- Is the list of required documents complete?
- Are all documents present?
- Are the high-level requirements present?

Example requirements:
- “The bridge must open.”
- “The system must be able to stop traffic.”

Specification focus (per diagram):
- `CSR` / `CRS` (Customer Requirements Specifications): generic and project-specific customer requirements.

Typical documents:
- Tender specification
- Statement of requirements
- Concept note
- Functional description

Outputs of the VO phase:
- completeness verifications
- remarks or missing documents
- confirmation that high-level requirements are sufficiently described

CCC application in VO:
- **Completeness**: are all required source documents present and are high-level requirements fully listed?
- **Compliance**: do scope and documents align with contractual agreements, standards, and formal project frameworks?
- **Correctness**: are the high-level requirements substantively correct, unambiguous, and mutually consistent?

Documentation in the system:
- Per verification item in VO, CCC is recorded with status, rationale, linked requirement version, documents used, and evidence (review report/remarks).
- The system explicitly records that these verifications are part of the design protocol (P1) and links them to the CSR/CRS sources used.

---

## 3.2 DO – Detailed Design

Purpose:
> Is the system design complete?

In this phase requirements are refined and linked to design documents.

Examples:
- “The bridge must open within 90 seconds.”
- “The bridge may only open between certain hours.”

Specification focus (per diagram):
- `SRS` (System Requirements Specifications): system requirements, architecture choices, and software/hardware structure.

Typical documents:
- System architecture
- Interface descriptions
- Detailed design
- Timing diagrams
- Safety analyses

Outputs of this phase:
- verification that the design covers all requirements
- verification of consistency between documents
- list of missing or conflicting requirements

CCC application in DO:
- **Completeness**: does the design cover all requirements and are all necessary design documents present?
- **Compliance**: does the design demonstrably meet requirements, standards, and contractual conditions?
- **Correctness**: are design choices technically correct and are documents mutually consistent (no conflicting definitions)?

Documentation in the system:
- Per verification item in DO, CCC results are recorded with traceability to requirement versions, design documents, findings, and any rework actions.
- On deviations, the system activates the non-happy path (P4): issue registration, escalation procedure, and change follow-up.

---

## 3.3 UO – Execution Design

Purpose:
> How will the system be realized concretely?

In this phase the following is checked:
- Which components and subsystems ensure that the requirement is realized?
- Are all technical documents present?
- Is the relationship between components, systems, and requirements complete?

Examples:
- Which motor, PLC, sensors, and software ensure that the bridge opens?
- What communication between subsystems is required?

Specification focus (per diagram):
- `TRS` (Test Requirements Specifications) and `FRS` (Functional Requirements) as the basis for execution-oriented verification.

Typical documents:
- Schematics
- PLC programs
- Cabling plans
- Component lists
- Configurations

CCC application in UO:
- **Completeness**: are all technical elaboration documents present and fully linked to requirements and subsystems?
- **Compliance**: does the concrete technical elaboration meet design agreements, standards, and execution conditions?
- **Correctness**: is the technical translation substantively correct and realizable (component choice, logic, configuration, interfaces)?

Documentation in the system:
- Per verification item in UO, CCC is recorded with technical evidence (schematics, configurations, test results), including decision (go/rework) and impact on the next phase.
- The system links UO verifications to the preparation set for integration (FAT/SAT/SIT) and monitors the handover to P2 (integration protocol).

---

# 4. CCC method

For every document and every requirement the CCC method is applied:

- Completeness
  - Is everything present?
  - Are all required documents or parts available?

- Compliance
  - Does the document or design meet requirements, standards, and contractual agreements?

- Correctness
  - Is the content substantively correct and consistent?

This CCC check happens in every phase.
The CCC assessment is executed operationally via verification items: per item it is recorded which CCC criteria were checked, which evidence was used, and what the result is.

---

# 5. Dossier management

A dossier manager must be able to check whether a dossier is complete.

Examples:
- Are all required documents for the VO phase present?
- Have all mandatory DO documents been uploaded?
- Are the latest versions available?

The system must:
- support a list of mandatory documents per phase
- show which documents are missing
- indicate which documents are still in review
- indicate which documents are rejected or outdated

Because mandatory documents can differ per project, the system uses a **project-specific document profile**:
- a standard document template as baseline (per project type/phase)
- project override to add document types, make them optional, or exclude them
- version control of the document profile (changes in obligations remain historically traceable)
- validity period per profile change, so it remains clear which set applied at a given moment

When tracking completeness, the check is always against the **active document profile for that project and that phase**.

In addition, a substantive assessment must be possible for every document.

A document contains:
- document type
- version
- status
- phase
- linked requirements
- remarks
- approval

Document statuses:
- Missing
- Submitted
- In Review
- Approved
- Rejected
- Replaced

---

# 6. SharePoint integration

Documents are managed via SharePoint.
The integration is **bidirectional** between SharePoint and the VNV platform, with a clear separation of responsibilities.

### 6.0 Integration principles and boundaries

To keep the integration robust, not all actions are allowed in SharePoint.
A clear link to the VNV tool is required: users click an item in the list and go to the correct place in the cockpit.

**Allowed in SharePoint (limited scope):**
- visualization and consultation of documents
- portal function for uploading documents
- registering actions/follow-up points (for example request for supplementation or correction)

**Not allowed in SharePoint (done in the VNV platform):**
- substantive verification and validation (including CCC assessment)
- management of requirements, verification items, and test executions
- management of lists, structures, and traceability relationships
- formal decisions on phase transitions, acceptance, and governance

The VNV platform remains the **single source of truth** for validation status, traceability, and decision-making. SharePoint acts as a document portal and collaboration interface.

The system must support at least the following SharePoint structure:

## 6.1 Project 0 – Overarching level

This is the N+1 level.

Contains:
- general project information
- overarching documents
- standards
- templates
- reporting across multiple projects

Required domain views at N+1:

- **Portfolio overview**
  - overview of all projects with status per phase
  - global risk indicators (open blockers, open findings, overdue actions)
  - quick identification of projects with elevated flow-through risk

- **Standards and norms framework**
  - central library of standards, contract frameworks, and assessment rules
  - assignment of relevant standards to project types or projects
  - version and validity management of normative references

- **Template and baseline management**
  - management of standard document profiles per phase
  - management of standard verification item types and CCC checklists
  - publication of approved templates to underlying projects

- **Cross-project traceability view**
  - aggregation of coverage and gaps across multiple projects
  - comparison of maturity/readiness per phase between projects
  - visibility of recurring shortages (for example structurally missing documents or test coverage)

- **Governance and decision view**
  - portfolio-wide overview of phase go/no-go decisions
  - audit trail of decisions, exceptions, and rationale
  - escalation overview for blockages requiring management intervention

- **Reporting view**
  - standardized management reports (periodic and ad hoc)
  - exportable KPIs around CCC, traceability, and progress
  - tenant-aware reporting (what is visible to the client vs internally)

---

## 6.2 Underlying projects

These are the N and N-1 levels.

A project may contain subsites for:
- VO
- DO
- UO
- SIT
- FAT
- SAT

Required domain views at N (project level):

- **Project cockpit**
  - integral overview of phase progress, readiness, and open blockers within the project
  - visibility of critical risks, overdue actions, and impact on planning
  - decision support for phase transitions (go/no-go)

- **Dossier and document completeness**
  - tracking of mandatory documents per phase based on the project profile
  - status of document review, approval, and replacement
  - visibility of missing, outdated, or rejected documents

- **Requirement and verification coverage**
  - overview of requirement versions and linked verification items
  - coverage of requirements by verifications, tests, and evidence
  - visibility of gaps that block phase progression

- **CCC governance view**
  - consolidation of Completeness, Compliance, and Correctness per phase
  - explicit substantiation of CCC decisions with evidence and rationale
  - tracking of rechecks and corrective actions

- **Action and findings management**
  - central tracking of open findings, remarks, and action items
  - prioritization based on impact, deadline, and phase criticality
  - assignment of ownership and escalation path

Required domain views at N-1 (object/subsystem level):

- **Subsystem/object detail view**
  - detailed status per object or subsystem in the active phase
  - linked requirements, documents, verification items, and test results
  - local blockers with impact on the overlying project level

- **Work and execution view**
  - operational planning of verifications, inspections, and test executions
  - registration of results, evidence, and deviations
  - direct feedback to requirements and document versions

- **Technical consistency view**
  - check of coherence between design, configuration, and execution
  - visibility of interface conflicts or missing technical links
  - support for re-verification after changes

The precise information architecture of these views will be elaborated further, but the domain responsibilities above are guiding for the design.

---

## 6.3 Tenants

The system must support multiple tenants.

### Client tenant
- client can upload documents
- client can receive documents
- client receives the outputs
- traceability of interactions with the client must be maintained
- structure does not need to be as strict
- client does not make formal validation decisions in SharePoint

### Infrasoft tenant
- internal documents
- verifications
- review comments
- findings
- formal validation, phase gates, and governance happen in the VNV platform

### Future
- tenants for contractors

---

# 7. Roles and Views

The system supports different profiles, each with its own view.

## 7.1 Navigator – N+1

Target audience:
- program manager

Function:
- overarching view across all projects
- focuses on status, progress, completeness, and risks

Shows:
- project status
- phase per project
- outstanding dossiers
- missing documents
- open findings

---

## 7.2 Browser – N

Target audience:
- project manager

Function:
- planning and follow-up within one project

Shows:
- requirements
- verifications
- test planning
- document status
- open actions

---

## 7.3 Inspector – N-1

Target audience:
- specialist or tester

Function:
- performing verifications and tests

Shows:
- assigned documents
- verifications to be executed
- test cases
- test results
- ability to upload evidence

---

## 7.4 Matrix View (taxonomy-driven) – N

Target audience:
- project manager
- V&V engineer
- portfolio manager (variants across projects)

Function:
- management instrument to quickly assess where risks, gaps, and blocking actions sit
- selection of predefined traceability matrices via the official taxonomy (data type, traceability direction, allocation, registers, portfolio, SE) — no free-form X/Y assembly
- substantiated decision-making for phase progression, priorities, and steering of corrective actions

Shows:
- overview of the main cross-sections in the project:
  - coverage of requirements per object or subsystem
  - link between requirements, verification items, and test results
  - document coverage and open findings
  - status per phase context (VO, DO, UO, SIT, FAT, SAT, UAT/OAT)

Business principles:
- The matrix must lead to concrete management actions, not only reporting.
- Only combinations with clear business meaning and decision value are used.
- Every matrix cell must unambiguously answer questions such as:
  - "Where are the largest project risks?"
  - "What is blocking the next phase?"
  - "Which actions have the highest priority?"

Use in decision-making:
- **Phase go/no-go**: demonstrate whether the necessary coverage and evidence are present.
- **Prioritization**: focus on the largest gaps (missing coverage, open blockers, failing verifications).
- **Stakeholder steering**: targeted follow-up per project manager, V&V engineer, and involved teams.

Required drill-down:
- From every matrix result the user must be able to click through to:
  - underlying requirements, verification items, and test executions
  - relevant documents and evidence
  - open actions/findings with owner and status

Result:
- The Matrix View is the central steering instrument for traceability, risk control, and phase progression within the project.

Technical elaboration: [matrix catalog – cell content per variant](./traceability-matrix-catalog.md), [user stories & metrics](./configurable-matrix.md), [SALT mockups](./mockups/matrix-catalog.salt.md).

---

## 7.5 V&V assistant as orchestration layer

The V&V assistant supports orchestration of the V&V process across three dimensions:

- **Stakeholders**: client, contractor, V&V engineer, dossier manager, experts, and operations.
- **Phases**: VO, DO, UO, FAT, SAT, SIT, UAT/OAT.
- **SOS levels**: N+1 (strategic), N (tactical/project), N-1 (operational/subsystem).

The assistant ensures that the right actor, at the right level and in the right phase, performs the right actions.

Core responsibilities:

- assign verification items, reviews, and actions to the right responsible party
- monitor phase-bound input conditions (documents, requirements, evidence)
- signal blockers, missing coverage, and escalation needs
- support phase-gate decision-making (go/no-go) with traceable substantiation
- monitor end-to-end traceability across document -> requirement -> verification item -> execution -> evidence

Expected output in the system:

- context-driven worklists per actor (stakeholder x phase x SOS level)
- warnings and escalations on deviations or non-happy path
- summarizing readiness status per phase and per SOS level
- auditable decision proposals with underlying rationale and evidence

---

# 8. Cube / Navigator model

The system includes a cube view that allows users to navigate across three axes.

## Axis 1 – Phases
- VO
- DO
- UO
- SIT
- FAT
- SAT

## Axis 2 – Stakeholders
- client
- Infrasoft
- contractor
- expert
- dossier manager

## Axis 3 – SOS levels
- Project 0
- Underlying projects
- Underlying objects or subsystems

For every intersection in the cube a value must be shown.

Example values:
- number of missing documents
- % requirements covered
- number of open findings
- readiness score
- CCC score

---

# 9. SHIPOC model

Per phase and per verification item the system must support the SHIPOC structure:

- Supplier
- Hierarchy
- Input
- Process activities
- Output
- Customer

Every verification item instance must have an explicit SHIPOC profile so that responsibilities, inputs, execution, and expected outputs are unambiguously traceable.

Example for a document review:
- Supplier: contractor
- Hierarchy: DO phase
- Input: interface description
- Process: review and CCC analysis
- Output: verification report
- Customer: project manager

---

# 10. Requirements

Requirements form the central backbone of the system.

A requirement contains:
- unique identifier
- description
- source document
- version
- phase
- type
- acceptance criteria
- linked verifications

Requirements can evolve between phases.

Example:
- VO: “The bridge must open.”
- DO: “The bridge must open within 90 seconds.”
- UO: “The PLC must control the motor so that the bridge opens within 90 seconds.”

The system must retain the history of requirements.

On a change it must be visible:
- which documents are affected
- which verifications must be redone
- which test cases must be adjusted

---

# 11. Verification items

Not every requirement is necessarily verified via a test.

The system supports different kinds of verification items:
- document review
- inspection
- analysis
- test case
- witness test
- validation scenario

A verification item is the smallest manageable verification unit that creates an explicit link between requirement, method, execution, and evidence.

Every verification item contains at least:
- unique identifier
- description
- type (review, inspection, analysis, test case, witness test, validation scenario)
- linked requirements (preferably requirement versions)
- phase context
- expected outcome
- execution instructions
- acceptance criteria
- status
- responsible party

For every verification item the following must be traceable:
- which requirement (and which requirement version) is covered
- on the basis of which document or evidence the assessment is made
- which execution(s) have already taken place
- what the result and rationale of the decision were

### Examples of verification items

| Type | Input | Execution | Evidence | Decision |
|------|-------|-----------|----------|----------|
| Document review | Tender, design note, requirement version | Reviewer checks coverage and consistency | Review report with remarks | Approved / Adjust / Re-review |
| Interface inspection | Interface description, schematics | Check of signals, boundaries, data mapping | Inspection report, checklist | Conform / Non-conform |
| Compliance check | Standards, contract clauses, requirement version | Assessment against explicit standard points | Compliance matrix, references | Conform / Deviation with action |
| Analysis check | Calculations, simulation output | Substantive check of assumptions and results | Analysis report, calculation sheet | Accepted / Re-analysis needed |
| Test case execution | Test case version, test plan, build/document version | Step-by-step execution in a run | Test report, logs, measurement data | Passed / Failed / Blocked |
| Witness test | Test procedure, setup, stakeholder presence | Execution under observation by client/independent party | Signed witness report | Accepted / Not accepted |
| Validation scenario | Operational use case, user need | E2E validation in a representative context | Scenario result, feedback | Fit for use / Adjustments needed |
| Defect re-verification | Defect, fix, original verification item | Targeted recheck after correction | Retest result, defect status | Closed / Reopen |

### Link to CCC method

Per verification item CCC is applied explicitly:

- **Completeness**: are all required input documents, criteria, and evidence present to execute the item?
- **Compliance**: is the assessment method aligned with requirements, standards, and contractual agreements?
- **Correctness**: is the result substantively correct, reproducible, and consistent with the linked requirement(s)?

### Iterations and version impact

Verification items support iterative work across phases.

On changes to requirements or documents, it must be determined per verification item:
- whether the previous verification remains valid or not
- whether re-execution is required
- which execution belongs to which version of requirement/document

---

# 12. Feedback loop and Iterations

Verification and validation proceed iteratively.

The system must support multiple iterations.

Example:
1. Document review DO raises a remark.
2. Contractor adjusts the document.
3. New version is uploaded.
4. Verification is executed again.
5. Requirement is re-evaluated.

Per iteration the following must be tracked:
- which version was assessed
- what the finding was
- which correction was made
- whether a recheck is needed

### Formal status of an iteration

In this system an iteration is **not a loose note**, but a formal, traceable assessment cycle.

Every iteration must therefore at least:
- be explicitly linked to the assessed version(s) of document, requirement, and/or test case
- contain a phase context, result, and decision
- be linked to evidence and any follow-up actions
- be auditable in terms of who, what, and when

---

# 13. Test Runs and Executions

A test run is the execution of one or more verification items in a given phase.

Examples:
- FAT run on a test setup
- SAT run on site
- Document review session in DO

A test run contains:
- phase
- build or document version
- participating persons
- planning
- status

An execution contains:
- result
- remarks
- evidence
- link to requirement version

Results:
- Passed
- Failed
- Passed with remarks
- Blocked

---

# 14. Traceability

Full traceability is essential.

The minimum chain is:

Document
→ Requirement
→ Verification item
→ Phase
→ Test Run
→ Execution
→ Evidence
→ Finding
→ Acceptance

The system must be able to show automatically:
- which requirements are not yet covered
- which documents are missing
- which requirements still have no evidence
- which findings are still open

---

# 15. Dashboards

The system provides dashboards per role.

Minimum required:
- dossier completeness
- status per phase
- missing documents
- CCC score
- number of open findings
- requirements coverage
- readiness for the next phase

Examples:
- “DO is 80% complete, 3 documents are missing.”
- “SAT cannot start: 2 critical requirements have not yet been verified.”

---

# 16. First MVP / Priorities

The first version of the system focuses on:

1. Implement phasing and phase context per item and make them visible in the UI
2. Introduce verification items as the formal execution and decision unit
3. Dossier management with project-specific document profile (baseline + override)
4. Bidirectional SharePoint integration with clear separation of responsibilities
5. Execute CCC assessment via verification items, including evidence and rationale
6. Realize end-to-end traceability (document -> requirement -> verification item -> execution -> evidence)
7. Iteration and version management as a formal, auditable cycle (no loose notes)
8. Elaborate roles and domain views (Navigator / Browser / Inspector + N+1/N/N-1 steering views)
9. Dashboards for readiness, blockers, gaps, document completeness, and phase status

---

# 17. Proposed Epics

## Epic 1 – Phases, Phase Context and Transitions
- Configure phases and project-specific active phases
- Make phase context visible at dossier, document, requirement, and verification item level
- Manage phase transitions with readiness and blocker checks

## Epic 2 – Dossier Management and Document Profiles
- Manage standard document profiles per phase/project type
- Support project overrides (add, make optional, exclude)
- Detect and follow up missing, outdated, and rejected documents

## Epic 3 – Bidirectional SharePoint Integration with Boundaries
- Bidirectional synchronization for document exchange and metadata updates
- Limit SharePoint to visualization, document intake, and action registration
- Enforce formal validation/governance exclusively in the VNV platform

## Epic 4 – Verification Items as Core Process
- Model verification items as the formal execution and decision unit
- Make SHIPOC profile mandatory per verification item
- Register verification executions, results, evidence, and decisions

## Epic 5 – CCC Governance via Verification Items
- Evaluate Completeness, Compliance, and Correctness at item level
- Link CCC results to evidence, rationale, and phase context
- Consolidate CCC per phase for go/no-go decision-making

## Epic 6 – End-to-End Traceability and Coverage
- Realize the traceability chain: document -> requirement -> verification item -> execution -> evidence
- Detect gaps in coverage, evidence, and re-verification
- Support impact analysis on changes to document or requirement versions

## Epic 7 – Iteration and Version Management
- Model iterations as a formal, auditable cycle (no loose notes)
- Support version management for requirements, documents, and test definitions
- Enforce recheck and re-verification flow on changes

## Epic 8 – Roles and Domain Views (N+1 / N / N-1)
- Further elaborate Navigator, Browser, and Inspector per role responsibility
- Provide N+1 portfolio and governance views
- Provide N and N-1 project/subsystem views for operational steering

## Epic 9 – Dashboards and Steering Reporting
- Dashboards for readiness, blockers, document completeness, and open findings
- KPIs for requirement coverage, CCC status, and phase progression
- Reporting for internal steering and tenant-aware external communication
