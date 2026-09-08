INFRASOFT STEPS

# Product Value Proposition

and Differentiation Concept

From engineering data management to context-aware decision support

  -----------------------------------------------------------------------
  Core hypothesis STEPS should not differentiate itself by adding more
  diagrams. Its value lies in orchestrating engineering information
  according to the user's role, lifecycle phase, system level and
  concern, then enabling continuous drill-down from management indicators
  to engineering evidence.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

# 1. Executive Summary

Most individual capabilities discussed for STEPS already exist in mature
ALM, requirements management and test management products: requirements,
tests, traceability matrices, dashboards, relationship graphs,
baselines, audit trails, impact analysis, reporting and configurable
workflows. Therefore, these capabilities alone should not be presented
as the product innovation.

The stronger opportunity is to combine them into a coherent,
context-aware engineering experience. The application can use the same
underlying Systems Engineering and V&V data while adapting the
information, perspective and level of detail to the user's situation.

# 2. What Is Commodity vs. Where STEPS Can Add Value

  -----------------------------------------------------------------------
  Capability              Market maturity         Potential STEPS value
  ----------------------- ----------------------- -----------------------
  Requirements / test     Common                  Foundation, not a
  management                                      differentiator

  Requirement-to-test     Common                  Foundation, not a
  traceability                                    differentiator

  Traceability matrix     Common                  Differentiate through a
                                                  generic configurable
                                                  matrix engine

  Dashboards / KPIs       Common                  Differentiate through
                                                  role-, phase- and
                                                  concern-aware
                                                  scorecards

  Relationship graphs     Common                  Differentiate through
                                                  concern-driven lenses
                                                  and drill-down

  Baselines / audit       Common                  Use as V&V snapshots
  history                                         and evidence over
                                                  lifecycle phases

  Impact analysis         Common                  Integrate directly into
                                                  the N+1 → N → N-1
                                                  investigation flow

  Reports / evidence      Common                  Connect proof directly
                                                  to the indicators and
                                                  items that require it
  -----------------------------------------------------------------------

# 3. Core Product Concept

The emerging model can be summarized as a context engine that determines
what information matters and how it should be presented.

Role × Phase × System Level × Concern → Adaptive View → Drill-down →
Evidence

# 4. The N+1 → N → N-1 Navigation Model

  -----------------------------------------------------------------------
  Level             Workspace         User question     Typical content
  ----------------- ----------------- ----------------- -----------------
  N+1               Navigator         Where should I    Portfolio,
                                      focus?            scorecards,
                                                        readiness,
                                                        coverage, risk,
                                                        quality

  N                 Browser           What is happening Structure,
                                      here?             relationships,
                                                        grouping, flow,
                                                        traceability,
                                                        behaviour

  N-1               Item Inspector    Why is this item  Executions,
                                      in this state?    evidence, issues,
                                                        actions,
                                                        decisions,
                                                        history, impact
  -----------------------------------------------------------------------

The differentiation is not the existence of these three levels by
itself. The value is the continuity between them: a high-level indicator
should be explainable by progressively drilling down until the user
reaches the engineering item, execution, issue or evidence responsible
for the result.

# 5. 'Find Without Searching'

Traditional engineering tools often require users to find information
through queries, filters, folders and artifact navigation. STEPS can
shift the interaction toward guided investigation:

Context → Concern → Visual Signal → Drill-down → Explanation → Evidence

Example:

-   A V&V Coordinator opens the FAT phase at System level.

-   The Navigator highlights verification readiness at 82% and 12
    missing evidence items.

-   The user drills into the Browser to identify the affected subsystem
    and requirements.

-   The Item Inspector explains that a test failed repeatedly, another
    test was not executed, and evidence is missing.

-   The user reaches the related issue, execution history and supporting
    documents without manually searching across modules.

# 6. Engineering Lenses Instead of Diagram Types

The Browser should ideally be organized around engineering questions or
concerns rather than around visualization technologies. A diagram is an
implementation of a perspective, not the perspective itself.

  Engineering perspective   Possible visualization
  ------------------------- ------------------------
  Structure                 Hierarchy / tree
  Relationships             Network graph
  Grouping / composition    Circle packing
  Verification / coverage   Traceability matrix
  Flow / input-output       Sankey
  Behaviour                 Finite State Machine
  History                   Timeline
  Quality / hotspots        Heatmap
  Big picture               Treemap

# 7. Generic Matrix Engine

The client's matrix taxonomy suggests a reusable matrix capability
rather than many bespoke matrix screens. The user could configure rows,
columns, relationship type, lifecycle context and cell metric/status.

Rows: Requirements \| Columns: Test Cases \| Relation: verifiedBy \|
Measure: Roll-up Status \| Phase: FAT

-   Requirements × Tests

-   Requirements × Risks / Decisions / Actions / Owners

-   Requirements × Architecture

-   Test Cases × Defects

-   Engineering Items × Processes

-   Projects × Phases / Owners / Status

# 8. Roll-up and Explainable Drill-down

A key opportunity is to make aggregated status explainable. Management
sees the result; engineering users can trace the result down to its
cause.

Project 78% → System 72% → Subsystem 61% → Requirement REQ-002 50% →
Test Case TC-157 Failed → Execution Attempt #3 → Issue #184 → Missing
Evidence

# 9. Role of the Item Inspector

The Item Inspector should not be limited to displaying artifact
properties. Its purpose can be framed as 'Explain this engineering
item.' It should answer the following questions at a glance:

-   What is it? --- type, identity, description and attributes.

-   Where is it? --- system / abstraction level and project context.

-   When is it relevant? --- lifecycle phase and history.

-   Who owns it? --- role, owner and stakeholders.

-   What is its state? --- status, progress, coverage and quality.

-   Why is it in this state? --- tests, executions, issues and missing
    evidence.

-   What is connected? --- requirements, design items, files, risks and
    other relationships.

-   What changed? --- activity stream, versions and baselines.

-   What is the impact? --- dependency and change impact analysis.

-   What proves it? --- evidence, documents and reportable audit
    information.

# 10. Product Narrative

A concise product story can be expressed as four successive user
outcomes:

  -----------------------------------------------------------------------
  SEE Navigator     UNDERSTAND        EXPLAIN Inspector PROVE Evidence /
                    Browser                             Reporting
  ----------------- ----------------- ----------------- -----------------

  -----------------------------------------------------------------------

# 11. Proposed Value Proposition

  -----------------------------------------------------------------------
  STEPS transforms Systems Engineering data into context-aware decision
  views. Instead of requiring users to search through engineering
  artefacts, the platform adapts the information to the user's role,
  lifecycle phase, system level and concern, and provides continuous
  drill-down from management indicators to engineering evidence.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

# 12. What Should Not Be Claimed as Innovation

The following elements are useful capabilities, but they are not
differentiators on their own:

-   N+1 / N / N-1 abstraction levels.

-   Sankey, treemap, network, circle packing, heatmap or FSM
    visualizations.

-   Requirements and test management.

-   Traceability matrices.

-   Dashboards and KPIs.

-   Baselines, audit trails and reports.

The defensible value lies in how these capabilities are orchestrated
into a role-aware, phase-aware, level-aware and concern-aware decision
workflow.

# 13. Recommended Product Direction

-   Keep the existing Editor as the primary create/configure workspace.

-   Evolve Navigator into the N+1 decision and attention layer.

-   Evolve Browser into the N engineering exploration and lens layer.

-   Establish Item Inspector as the N-1 explanation and evidence layer.

-   Implement consistent drill-down and roll-up rules across all three
    levels.

-   Treat lifecycle phase, system level, role and concern as first-class
    context dimensions.

-   Prioritize reusable engines (matrix, lens, roll-up, snapshot) over
    one-off visualizations.

-   Use Evidence / Reporting as the final 'prove' step of the
    investigation chain.

SEE → UNDERSTAND → EXPLAIN → PROVE
