---
title: "Epic 8 – Dashboards and steering reporting"
description: "Requirements for readiness, coverage, CCC, and phase progression dashboards and reports"
toc: true
weight: 180
---

# Epic 8 – Dashboards and steering reporting

**Goal:** Steering dashboards and reports for readiness, blockers, completeness, findings, coverage, CCC, and phase progression.

**Sources:** [Functional Analysis §15](../business-analyse-vnv.md).

## Scope

- Role-aware dashboards
- KPIs and examples from the analysis
- Tenant-aware external communication where required

## Out of scope

- Defining underlying PhaseContext/VI rules (Epics 1–5)
- Replacing operational work UIs (Epic 7)

## Requirements

| ID | Requirement |
|----|-------------|
| E8-R01 | Dashboards shall include at least: dossier completeness, status per phase, missing documents, CCC score, open findings count, requirements coverage, readiness for next phase. |
| E8-R02 | Dashboards shall be filterable by project, phase, and protocol lane (happy path / escalation / dossier) where relevant. |
| E8-R03 | KPIs shall distinguish **present**, **covered**, and **verified**. |
| E8-R04 | Example steering statements shall be supportable, e.g. “DO is 80% complete, 3 documents missing” and “SAT cannot start: 2 critical requirements not verified”. |
| E8-R05 | Reporting shall support internal steering and tenant-aware external communication. |
| E8-R06 | Dashboard data shall come from VNV domain state, not from SharePoint as source of truth. |

## Acceptance criteria (epic level)

1. Cockpit shows readiness and blockers for the active phase.
2. Completeness % and missing document count match Epic 2 evaluation.
3. Unverified critical requirements are visible as a gate risk for the next phase.
