---
title: "Epic 7 – Roles and domain views (N+1 / N / N-1)"
description: "Requirements for Navigator, Browser, Inspector and portfolio / project / subsystem views"
toc: true
weight: 170
---

# Epic 7 – Roles and domain views (N+1 / N / N-1)

**Goal:** Role-appropriate views at portfolio (N+1), project (N), and subsystem/object (N-1) levels.

**Sources:** [Functional Analysis §6.1–6.2](../business-analyse-vnv.md), client UI concepts.

## Scope

- Navigator / Browser / Inspector responsibilities
- N+1 portfolio and governance views
- N project cockpit and operational views
- N-1 object/subsystem detail and execution views
- Phase + protocol context visible in views (no protocol mode switch)

## Out of scope

- Replacing domain operations (Epics 1–4)
- Full dashboard KPI catalog (Epic 8)

## Requirements

### Shell and roles

| ID | Requirement |
|----|-------------|
| E7-R01 | The UI shall provide Navigator, Browser, and Inspector (or equivalent) aligned to role responsibility. |
| E7-R02 | Views shall respect the dual context: **phase** (lifecycle) and **protocol** (path badge/filter). |

### N+1 (portfolio)

| ID | Requirement |
|----|-------------|
| E7-R03 | Portfolio overview: all projects with status per phase and global risk indicators (blockers, findings, overdue). |
| E7-R04 | Standards/norms library with assignment to project types and version/validity. |
| E7-R05 | Template and baseline management for document profiles and standard VI types (publishes into Epic 2/4). |
| E7-R06 | Cross-project traceability/maturity comparison and recurring shortage visibility. |
| E7-R07 | Governance/decision view for N+1 steering. |

### N (project)

| ID | Requirement |
|----|-------------|
| E7-R08 | Project cockpit: phase progress, readiness, open blockers, risks, go/no-go support. |
| E7-R09 | Dossier completeness view against project profile (Epic 2). |
| E7-R10 | Requirement and verification coverage view (Epic 4/6). |
| E7-R11 | CCC governance view (Epic 5). |
| E7-R12 | Action and findings management with escalation path (P4). |

### N-1 (object / subsystem)

| ID | Requirement |
|----|-------------|
| E7-R13 | Subsystem/object detail: status in active phase, linked requirements, documents, VIs, test results, local blockers. |
| E7-R14 | Work/execution view: plan and register verifications, results, evidence, deviations. |

## Acceptance criteria (epic level)

1. A portfolio user sees multi-project phase status without entering each project.
2. A project user sees cockpit readiness and blockers for the active phase.
3. An N-1 user can execute/register a check and see local impact on the project.
