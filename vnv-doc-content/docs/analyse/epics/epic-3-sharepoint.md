---
title: "Epic 3 – Bidirectional SharePoint integration with boundaries"
description: "Requirements for SharePoint as document portal; VNV remains source of truth for governance"
toc: true
weight: 130
---

# Epic 3 – Bidirectional SharePoint integration with boundaries

**Goal:** Bidirectional document exchange with SharePoint while formal V&V and phase decisions stay in the VNV platform.

**Sources:** [Functional Analysis §6](../business-analyse-vnv.md).

## Scope

- Sync of documents and selected metadata
- SharePoint as visualization, intake, and light action registration
- Deep links from SharePoint into the VNV cockpit
- Clear allow / deny boundary

## Out of scope

- CCC assessment in SharePoint
- Managing requirements, verification items, tests, structures, or traceability in SharePoint
- Go/no-go and acceptance decisions in SharePoint
- Replacing dossier profile (Epic 2) with SharePoint folders alone

## Requirements

### Boundaries

| ID | Requirement |
|----|-------------|
| E3-R01 | The VNV platform shall remain the **single source of truth** for validation status, traceability, and decision-making. |
| E3-R02 | SharePoint shall be allowed for: document visualization/consultation, upload portal, and registering follow-up actions (e.g. request supplementation). |
| E3-R03 | SharePoint shall **not** perform: substantive V&V/CCC, management of requirements/VIs/tests/lists/structures/traceability, or formal phase/acceptance decisions. |
| E3-R04 | Users shall be able to open a SharePoint list item and navigate to the corresponding place in the VNV cockpit. |

### Synchronization

| ID | Requirement |
|----|-------------|
| E3-R05 | The system shall support **bidirectional** synchronization for document exchange and agreed metadata updates. |
| E3-R06 | Uploading a document via SharePoint shall result in (or update) a File in the VNV graph without implying verified_in. |
| E3-R07 | Sync failures shall be visible and recoverable without losing VNV governance state. |

### Structure and levels

| ID | Requirement |
|----|-------------|
| E3-R08 | SharePoint structure shall support at least an overarching (N+1) site and project (N) sites aligned with the portfolio model. |
| E3-R09 | Standards, templates, and cross-project reporting materials may live at N+1; project dossiers at N. |

## Acceptance criteria (epic level)

1. A document uploaded in SharePoint appears as a File in VNV and is not auto-approved.
2. Attempting formal go/no-go or CCC only in SharePoint is not supported; cockpit deep link works.
3. Metadata agreed for sync updates in both directions without overwriting PhaseContext verified_in from SP alone.
