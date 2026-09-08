INFRASOFT STEPS

# Client Concepts and Proposed UI/UX

From conceptual Systems Engineering models to implementable Navigator,
Browser and Item Inspector interfaces

  -----------------------------------------------------------------------
  Working product model Role × Phase × System Level × Concern → Adaptive
  View → Roll-up / Drill-down → Evidence
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

# 1. Purpose of this Document

This document connects the client's conceptual material with the
proposed evolution of the STEPS user interface. The objective is not to
treat every diagram as a direct UI specification, but to identify the
recurring product concepts and translate them into a coherent,
implementable user experience.

The central interpretation is that STEPS should provide the right
engineering perspective according to who is using the system, the
lifecycle phase, the system abstraction level and the concern being
investigated. The proposed UI then supports continuous navigation from
aggregated management information to the engineering evidence that
explains it.

# 2. Target Interaction Model

  -------------------------------------------------------------------------
  Level             Workspace         Primary question  Product role
  ----------------- ----------------- ----------------- -------------------
                                                        

  N+1               Navigator         Where should I    SEE - attention,
                                      focus?            scorecards,
                                                        readiness,
                                                        portfolio/project
                                                        overview

  N                 Browser           What is happening UNDERSTAND -
                                      here?             structure,
                                                        relations,
                                                        coverage,
                                                        behaviour, impact

  N-1               Item Inspector    Why is this item  EXPLAIN -
                                      in this state?    executions, issues,
                                                        evidence, history
                                                        and impact
  -------------------------------------------------------------------------

SEE → UNDERSTAND → EXPLAIN → PROVE

# Proposed Navigator - N+1 Decision View

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image1.png)

Functional intent

Transforms the existing Navigator into an attention and decision layer.
It combines role/level selection, lifecycle phase, 5P perspectives,
scorecards, engineering lenses and direct access to detailed project
information.

# Proposed Browser - N Engineering Exploration View

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image2.png)

Functional intent

Extends the existing Browser from diagram-oriented navigation toward
engineering exploration. The user can investigate structure,
relationships, traceability, impact and related items while preserving
project context.

# Proposed Item Inspector - N-1 Explainability View

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image3.png)

Functional intent

Provides the detailed explanation of a single engineering item:
properties, relationships, linked items, test coverage, history,
evidence and impact. This is the final drill-down level before evidence
and reporting.

# 3. Client Conceptual Inputs

The following diagrams are source material provided by the client. They
are treated as product vision and taxonomy inputs, not as final
specifications. The interpretations below indicate how each concept can
influence the STEPS functional model.

# FAIR Drill-down Search Engine

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image4.png)

Interpretation for STEPS

Client concept showing Enterprise Navigator, Project Browser and
Engineering Item Inspector as three connected exploration levels. This
is the strongest source for the N+1 → N → N-1 interaction model.

# 5P - View of Views

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image5.png)

Interpretation for STEPS

Client concept organizing information through Products, Projects,
Processes, People and Procurement perspectives across DEV, OPS, QA, HR
and PROC concerns.

# SOS Level - Role × Phase × System Level

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image6.png)

Interpretation for STEPS

Client cube combining stakeholders, project phases and System-of-Systems
abstraction levels. This supports the adaptive context model used to
determine the most relevant view.

# DEV / OPS V&V Dashboards and Matrix

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image7.png)

Interpretation for STEPS

Client concept combining DEV and OPS phase dashboards, requirement/test
matrices, iteration status and scenario interactions. It supports
phase-aware dashboards, roll-up status and matrix drill-down.

# Drill-down / Iteration Legend

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image8.png)

Interpretation for STEPS

Client legend showing not-started, pending, pass/fail and iteration
information. It indicates that matrix cells should contain execution
meaning rather than only static relationships.

# Strategic / Tactical / Operational Information Levels

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image9.png)

Interpretation for STEPS

Client pyramid connecting executives, managers and workers to strategic,
tactical, managerial and operational information systems. It reinforces
the need for different levels of aggregation and decision support.

# Systems Engineering Process Taxonomy

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image10.png)

Interpretation for STEPS

Client process classification spanning strategic, tactical and
operational Systems Engineering processes. This can become a
context/filter dimension rather than a separate application module.

# Roles / Profiles and V&V Use Cases

![Embedded
figure](InfraSoft_STEPS_Client_Concepts_and_Proposed_UI_assets/image11.png)

Interpretation for STEPS

Client material connecting V&V roles and TestLink-style profiles to
concrete actions. It provides useful input for role-aware views and
permissions.

# 4. Mapping Client Concepts to Proposed Interfaces

  -----------------------------------------------------------------------
  Client concept    Proposed UI       Primary module    Confidence
                    response                            
  ----------------- ----------------- ----------------- -----------------
  Enterprise        Three-level       Navigator →       Confirmed /
  Navigator /       continuous        Browser →         strong
  Project Browser / drill-down        Inspector         
  Item Inspector                                        

  5P perspectives   Perspective       Navigator +       Strong
                    selector /        Browser           interpretation
                    contextual lens                     

  Stakeholder ×     Adaptive context  Navigator +       Strong
  Phase × SOS Level filters           Browser           interpretation

  DEV / OPS         Phase-aware       Navigator         Confirmed concept
  dashboards        scorecards and                      
                    matrices                            

  Matrix variants   Generic           Navigator +       Very strong
                    configurable      Browser           hypothesis
                    Matrix Engine                       

  Iteration legend  Status roll-up    Matrix +          Confirmed concept
                    and execution     Inspector         
                    drill-down                          

  Strategic /       Different         Navigator /       Strong
  Tactical /        aggregation and   Browser /         
  Operational       decision levels   Inspector         

  SE process        Process           Cross-module      Strong
  taxonomy          context/filter                      
                    metadata                            

  Role / profile    Role-aware views  Cross-module      Strong
  use cases         and actions                         
  -----------------------------------------------------------------------

# 5. Resulting Product Architecture

CONTEXT Role × Phase × System Level × Concern

↓

N+1 NAVIGATOR --- attention, scorecards, readiness ↓ drill-down N
BROWSER --- structure, relationships, traceability, impact ↓ drill-down
N-1 ITEM INSPECTOR --- explanation, executions, issues, evidence,
history ↓ EVIDENCE / REPORTING --- proof and audit output

# 6. Key Product Principle

  -----------------------------------------------------------------------
  STEPS should not differentiate itself by the number of diagrams it
  provides. The value is the orchestration of engineering data into
  context-aware decision views, with explainable drill-down from
  high-level indicators to the engineering evidence that causes them.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
