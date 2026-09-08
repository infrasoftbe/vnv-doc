INFRASOFT STEPS

# Current Application vs. Client Vision

Functional Inventory, Mapping and Gap Analysis

  -----------------------------------------------------------------------
  Purpose: Translate the client's high-level Systems Engineering and V&V
  concepts into concrete application capabilities, identify what already
  exists in InfraSoft STEPS, and highlight the most relevant functional
  gaps and priorities.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  Document status                     Working Analysis v0.1
  ----------------------------------- -----------------------------------
  Scope                               Current application screens and
                                      client concepts shared to date

  Audience                            Product owner, functional analysts,
                                      V&V / Systems Engineering
                                      stakeholders, development team

  Main principle                      Role × Phase × Level × Concern →
                                      Appropriate View → Drill-down →
                                      Evidence
  -----------------------------------------------------------------------

# 1. Executive Summary

The current InfraSoft STEPS application already contains a substantial
part of the technical and functional foundation described by the client.
The main gap is not the absence of modules, data or visualisations, but
the absence of a consistent functional layer that adapts the same
Systems Engineering information to the user's role, lifecycle phase,
system level and business concern.

  -----------------------------------------------------------------------
  Key conclusion: The target should not be a collection of independent
  diagrams. The target should be a coherent navigation and analysis model
  in which the user can move from an aggregated overview to a
  project/system view and finally to the engineering item, test execution
  and evidence that explain a result.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

-   Navigator is already the strongest basis for N+1 portfolio,
    management and decision-support views.

-   Browser already implements several of the client's "lenses" such as
    Structure, Network and Bubble/Grouping views and is the natural
    N-level exploration workspace.

-   Editor already maps closely to the client's Configure capabilities:
    structuring, item editing, relational linking, registers and V&V
    execution preparation.

-   Report Manager already provides the foundation for V&V evidence
    reporting and can evolve toward evidence packages, traceability
    reports and audit outputs.

-   Admin covers a large part of platform administration, provisioning,
    backup, users/groups and operational support.

-   The most important missing capabilities are adaptive views,
    phase-aware dashboards, roll-up status, generic traceability
    matrices, consistent drill-down, deep item inspection,
    snapshots/baselines, historical comparison and V&V guidance.

# 2. Current Application Inventory

  ------------------------------------------------------------------------------------------------
  Module / Screen   Current capabilities                     Primary purpose     Best-fit
                                                                                 conceptual level
  ----------------- ---------------------------------------- ------------------- -----------------
  Workspace         Project cards/list, active session,      Access projects and Platform /
                    sync, new project, Excel/ZIP/JSON        manage              Project access
                    imports, settings,                       project/session     
                    commit/download/edit/delete              lifecycle           

  Navigator         Metrics cards, project details,          Aggregated overview N+1 / Management
  Advanced ---      requirements coverage, test outcomes,    and KPI dashboard   
  Dashboard         project/works/tests/requirements/risks                       
                    counters                                                     

  Navigator         Hierarchical breakdown structure,        Global structural   N+1 → N /
  Advanced --- BDS  projects/works grouped in a tree         navigation and      Structure lens
                                                             breakdown           

  Editor            Structure, List, Items, Linker,          Create, configure   Configuration /
                    Register, Test Run                       and maintain        Operational work
                                                             engineering data    
                                                             and V&V content     

  Browser           Structure, Network, Bubble Chart, Item   Explore a project,  N /
                                                             its structures,     Project/System
                                                             relations and item  exploration
                                                             context             

  Report Manager    List report, generated report, structure Generate and manage Reporting /
                    report, report templates                 reports and         Evidence
                                                             evidence-oriented   
                                                             outputs             

  Logger            Activity/event information (module       Logging and trace   Audit support
                    present in navigation)                   support             

  Admin             Users, Groups, Projects, Backup,         Platform and        Administration /
                    Provisioning, Commit, Workspace, Report, operational         Provisioning
                    Configuration, Operations                administration      
  ------------------------------------------------------------------------------------------------

# 3. Client Vision --- Working Functional Interpretation

Based on the client inputs shared so far, the recurring concepts can be
organised into the following functional dimensions. This structure
separates business context from UI implementation.

  -----------------------------------------------------------------------------------------------------
  Dimension         Meaning           Examples                         Examples
  ----------------- ----------------- -------------------------------- --------------------------------
  Who               Role /            Executive, Project Manager, V&V  Executive, Project Manager, V&V
                    stakeholder       Coordinator, Test Engineer, Test Coordinator, Test Engineer, Test
                                      Analyst, Test Leader,            Analyst, Test Leader,
                                      Administrator                    Administrator

  What              Engineering       Project, system, requirement,    Project, system, requirement,
                    object            test case, test execution,       test case, test execution,
                                      evidence, issue, action,         evidence, issue, action,
                                      decision, document, risk         decision, document, risk

  Where             System /          Enterprise, family of systems,   Enterprise, family of systems,
                    abstraction level system, subsystem, component,    system, subsystem, component,
                                      part; also expressed as N+1 / N  part; also expressed as N+1 / N
                                      / N-1                            / N-1

  When              Lifecycle phase   VO, DO, UO, FAT, SAT, SIT        VO, DO, UO, FAT, SAT, SIT

  How               V&V method /      Analysis, test, demonstration,   Analysis, test, demonstration,
                    process           simulation;                      simulation;
                                      strategic/tactical/operational   strategic/tactical/operational
                                      process families                 process families

  Why / Concern     Question to       Progress, coverage, readiness,   Progress, coverage, readiness,
                    answer            risk, quality, traceability,     risk, quality, traceability,
                                      impact, compliance, evidence     impact, compliance, evidence

  Lens /            How the same data Structure, grouping, relations,  Structure, grouping, relations,
  Perspective       is viewed         behaviour, big picture,          behaviour, big picture,
                                      traceability, flow, history,     traceability, flow, history,
                                      quality                          quality

  Visualisation     Presentation      Tree, network, circle packing,   Tree, network, circle packing,
                    instrument        treemap, traceability matrix,    treemap, traceability matrix,
                                      Sankey, FSM, timeline, heatmap,  Sankey, FSM, timeline, heatmap,
                                      scorecard                        scorecard

  Core              Core              Core interpretation: The client  Core interpretation: The client
  interpretation:   interpretation:   appears to want the same Systems appears to want the same Systems
  The client        The client        Engineering data to be presented Engineering data to be presented
  appears to want   appears to want   differently depending on who is  differently depending on who is
  the same Systems  the same Systems  looking, at which level, during  looking, at which level, during
  Engineering data  Engineering data  which lifecycle phase, and for   which lifecycle phase, and for
  to be presented   to be presented   which decision or concern.       which decision or concern.
  differently       differently                                        
  depending on who  depending on who                                   
  is looking, at    is looking, at                                     
  which level,      which level,                                       
  during which      during which                                       
  lifecycle phase,  lifecycle phase,                                   
  and for which     and for which                                      
  decision or       decision or                                        
  concern.          concern.                                           
  -----------------------------------------------------------------------------------------------------

# 4. N+1 / N / N-1 Mapping to the Existing Application

  --------------------------------------------------------------------------------------
  Level       Scope           Primary     Current     Target          Assessment
                              user        module      capabilities    
                              question                                
  ----------- --------------- ----------- ----------- --------------- ------------------
  N+1         Enterprise /    Where       Navigator   Portfolio       Strong alignment;
              portfolio /     should I                overview,       decision-support
              multi-project   focus?                  scorecards,     logic should be
                                                      project         strengthened
                                                      quality, risks, 
                                                      readiness,      
                                                      cross-project   
                                                      structure,      
                                                      management      
                                                      reporting       

  N           Project /       What is     Browser     Structure,      Good foundation;
              system          happening               relations,      lenses should
                              in this                 grouping,       become
                              project or              coverage,       concern-oriented
                              system?                 behaviour,      rather than
                                                      flow,           diagram-oriented
                                                      project-level   
                                                      traceability    

  N-1         Engineering     Why is this Browser     Properties,     Partially present;
              item / detailed item in     Item /      traceability    dedicated deep
              V&V context     this state? future      chain, test     inspection
                                          Inspector   executions,     capability should
                                                      evidence,       be strengthened
                                                      issues,         
                                                      actions,        
                                                      decisions,      
                                                      history, impact 
  --------------------------------------------------------------------------------------

# 5. Current Application ↔ Client Vision Mapping

  -------------------------------------------------------------------------------------
  Current area   What exists      Client concept      Recommended        Priority
                                                      functional         
                                                      interpretation     
  -------------- ---------------- ------------------- ------------------ --------------
  Workspace      Project access,  Operational         Keep as platform   Low
                 sessions,        support; project    entry point. Do    
                 import, sync     access              not overload it    
                                                      with N+1 analysis. 

  Navigator      KPI cards,       Executive           Evolve from        High
  Dashboard      coverage and     Information System; "showing counts"   
                 test outcome     Decision Support;   to highlighting    
                 summaries        Management          status, trend,     
                                  Reporting;          exceptions,        
                                  Scorecards          readiness and      
                                                      decision points.   

  Navigator BDS  Hierarchical     Architecture /      Use as a           High
                 project/work     Structure lens;     structural lens    
                 breakdown        System-of-Systems   and entry point    
                                  navigation          for drill-down     
                                                      from enterprise to 
                                                      project/system.    

  Editor ---     Create and       C2 Structuring /    Already strongly   Medium
  Structure      manage           Architecture        aligned. Add       
                 hierarchical     modelling           context rules only 
                 structures                           where useful.      

  Editor ---     Create/edit      C1 Workspace Editor Already aligned.   Medium
  Items / Lists  engineering                          Continue improving 
                 information                          high-volume        
                                                      editing and        
                                                      consistency        
                                                      checks.            

  Editor ---     Create           C3 Relational       Critical           High
  Linker         relationships    Linking /           foundation for all 
                                  end-to-end          traceability views 
                                  traceability        and matrices.      

  Editor ---     Maintain         Issues / actions /  Connect registers  Medium
  Register       registers        decisions / risks / more explicitly to 
                                  audit-related       engineering items  
                                  concerns            and traceability   
                                                      analysis.          

  Editor ---     Prepare and      Operational support Use execution data High
  Test Run       execute V&V work / V&V Assistant /   as the detailed    
                                  test execution      source for roll-up 
                                                      status, dashboard  
                                                      and matrix cells.  

  Browser ---    Project          Architecture lens   Already aligned.   High
  Structure      structure view                       Connect to the     
                                                      same               
                                                      context/filter     
                                                      model as other     
                                                      lenses.            

  Browser ---    Relationship     Relations /         Already aligned.   High
  Network        graph            interaction /       Add                
                                  traceability lens   concern-oriented   
                                                      presets and        
                                                      drill-down.        

  Browser ---    Grouping /       Circle packing /    Useful where       Medium
  Bubble Chart   concentration    grouping /          grouping answers a 
                                  big-picture lens    real concern;      
                                                      avoid presenting   
                                                      it as a            
                                                      visualisation for  
                                                      its own sake.      

  Browser ---    Item information N-1 Engineering     Expand into deep   Very High
  Item                            Item Inspector      inspection:        
                                                      evidence,          
                                                      executions,        
                                                      issues, actions,   
                                                      decisions, history 
                                                      and impact.        

  Report Manager Report templates Evidence Reporting  Evolve toward      High
                 and generated    / RVTM / audit      evidence packages, 
                 reports          evidence            traceability       
                                                      reports, snapshots 
                                                      and audit outputs. 

  Logger         Logging          AT1 Event Logging   Use as foundation  Medium
                                                      for event chains   
                                                      and audit          
                                                      timeline.          

  Admin          Users, groups,   Operational Support Already aligned as Low
                 backup,          / Provisioning /    platform           
                 provisioning,    ETL admin           administration.    
                 configuration,                                          
                 operations                                              
  -------------------------------------------------------------------------------------

# 6. Functional Gap Analysis

  ------------------------------------------------------------------------------------------------------------
  Capability gap     Current state   Client expectation              Recommended action         Priority
  ------------------ --------------- ------------------------------- -------------------------- --------------
  Adaptive context   Limited / not   Views driven by Role × Phase ×  Define one common context  P1
  model              explicit        Level × Concern                 model used by Navigator,   
                                                                     Browser, Matrix and        
                                                                     Inspector.                 

  Phase-aware        Partially       DEV vs OPS and                  Make lifecycle phase a     P1
  dashboards         present through VO/DO/UO/FAT/SAT/SIT-specific   first-class filter and     
                     metrics         views                           dashboard context.         

  Roll-up status     Not clearly     Aggregate execution/item status Define status aggregation  P1
                     visible         upward to test, requirement,    rules and expose           
                                     system and project              calculation/explanation.   

  Generic            Matrix tab      Many configurable matrix        Create a generic matrix    P1
  traceability       exists, scope   variants across requirements,   view driven by row type,   
  matrix             unclear         tests, issues, decisions,       column type, relationship  
                                     owners, phases, projects        and measure/status.        

  Drill-down chain   Present through Scorecard → Project → Item →    Define a consistent        P1
                     separate        Execution → Evidence            cross-module drill-down    
                     modules but not                                 pattern and context        
                     coherent                                        preservation.              

  Deep item          Partial through Complete item context,          Create/strengthen          P1
  inspector          Browser Item    traceability, evidence,         Inspector as N-1           
                                     history, root cause, impact     capability.                

  Concern-based      Current tabs    Structure, grouping, relations, Rename/organise views      P2
  lenses             are mainly      behaviour, big picture,         around user questions and  
                     visualisation   traceability, flow, history     use the diagram as the     
                     types                                           implementation instrument. 

  Snapshots /        Not visible as  "V&V photo/video", AT2 Snapshot Create phase/milestone     P2
  baselines          end-user        Control, snapshot & diff        snapshots and comparison   
                     capability                                      between snapshots.         

  Historical         Logger exists   Event chains, audit trail,      Use events and snapshots   P2
  timeline           but not         project evolution               to provide                 
                     integrated                                      history/timeline at        
                                                                     project and item level.    

  Decision-support   Basic KPI       N+1 executive/management        Add threshold, trend,      P2
  scorecards         dashboard       support                         exception, readiness and   
                     exists                                          action/decision            
                                                                     indicators.                

  V&V Assistant /    Not visible     Guidance rules and adaptive     Provide contextual         P3
  guidance                           routing                         next-step guidance after   
                                                                     the core                   
                                                                     navigation/traceability    
                                                                     model is stable.           

  Sankey / flow view Not present     Input/output relations and flow Add only for concerns      P3
                                                                     where flow                 
                                                                     direction/volume is        
                                                                     meaningful.                

  FSM / behaviour    Not present     Behaviour / state-machine lens  Add for objects/processes  P3
  view                                                               that have a defined state  
                                                                     model.                     

  Treemap / big      Not present     Distribution / big picture      Add where                  P3
  picture                                                            size/distribution is a     
                                                                     useful management or       
                                                                     system concern.            

  CCC quality label  Undefined       Project quality label / score   Do not implement until     OPEN
                                                                     definition, inputs, values 
                                                                     and calculation rules are  
                                                                     confirmed.                 
  ------------------------------------------------------------------------------------------------------------

# 7. Proposed Target Functional Model

The existing application can be organised around five user-facing
functional workspaces, with Workspace and Admin remaining platform
functions.

  ---------------------------------------------------------------------------------------------------------------------------------
  Workspace         Level             Core user         Target scope                          Target scope
                                      question                                                
  ----------------- ----------------- ----------------- ------------------------------------- -------------------------------------
  Navigator         N+1               Where should I    Portfolio, scorecards, quality,       Portfolio, scorecards, quality,
                                      focus?            progress, risks, readiness,           progress, risks, readiness,
                                                        cross-project structure,              cross-project structure,
                                                        management-level traceability         management-level traceability

  Browser           N                 What is happening Structure, relationships, grouping,   Structure, relationships, grouping,
                                      here?             coverage, traceability, flow,         coverage, traceability, flow,
                                                        behaviour, project/system exploration behaviour, project/system exploration

  Inspector         N-1               Why is this item  Properties, inbound/outbound links,   Properties, inbound/outbound links,
                                      in this state?    requirement→test→execution→evidence   requirement→test→execution→evidence
                                                        chain, issues, actions, decisions,    chain, issues, actions, decisions,
                                                        history, impact                       history, impact

  Editor            Create / Maintain What must I       Structures, items, lists, links,      Structures, items, lists, links,
                                      create or change? registers, tests, test executions and registers, tests, test executions and
                                                        configuration                         configuration

  Report Manager    Evidence /        How can I         V&V reports, evidence packages,       V&V reports, evidence packages,
                    Communication     demonstrate or    traceability reports, audit reports,  traceability reports, audit reports,
                                      report the        snapshot reports                      snapshot reports
                                      result?                                                 

  Cross-cutting     Cross-cutting     Cross-cutting     Cross-cutting rule: The user should   Cross-cutting rule: The user should
  rule: The user    rule: The user    rule: The user    be able to move from an aggregated    be able to move from an aggregated
  should be able to should be able to should be able to indicator to the underlying           indicator to the underlying
  move from an      move from an      move from an      project/system, then to the           project/system, then to the
  aggregated        aggregated        aggregated        engineering item, execution and       engineering item, execution and
  indicator to the  indicator to the  indicator to the  evidence without losing the selected  evidence without losing the selected
  underlying        underlying        underlying        context (role, phase, level, concern  context (role, phase, level, concern
  project/system,   project/system,   project/system,   and filters).                         and filters).
  then to the       then to the       then to the                                             
  engineering item, engineering item, engineering item,                                       
  execution and     execution and     execution and                                           
  evidence without  evidence without  evidence without                                        
  losing the        losing the        losing the                                              
  selected context  selected context  selected context                                        
  (role, phase,     (role, phase,     (role, phase,                                           
  level, concern    level, concern    level, concern                                          
  and filters).     and filters).     and filters).                                           
  ---------------------------------------------------------------------------------------------------------------------------------

# 8. Generic Traceability Matrix --- Recommended Capability

The client's matrix concepts suggest that "Traceability Matrix" should
be treated as a generic analysis engine rather than a single Requirement
× Test Case screen.

  ---------------------------------------------------------------------------
  Matrix configuration    User concern            Possible cell information
  ----------------------- ----------------------- ---------------------------
  Requirements × Test     Verification coverage   Link status, execution
  Cases                                           roll-up, coverage

  Requirements × Test     Actual verification     Passed/failed/pending/not
  Executions              status                  started, iteration count

  Requirements × Issues   Problem exposure        Issue count / severity /
                                                  open status

  Requirements ×          Decision traceability   Linked decisions / decision
  Decisions                                       status

  Requirements × Owners   Responsibility          Ownership / missing owner

  Requirements ×          Lifecycle readiness     Status or maturity per
  Lifecycle Phases                                phase

  Projects × Phases       Portfolio readiness     Completion/readiness
                                                  percentage

  Projects × Risks        Management risk view    Risk
                                                  count/severity/mitigation
                                                  status

  System Design × Test    Design verification     Coverage / linked tests
  Cases                   coverage                
  ---------------------------------------------------------------------------

Recommended configuration model:

-   Rows: selected object type or grouping.

-   Columns: second object type, project phase, owner or grouping.

-   Relationship: relation type used to determine the intersection.

-   Measure: link existence, count, coverage, execution roll-up, status,
    risk or quality.

-   Interaction: filter, sort, highlight exceptions, click a cell to
    drill down to the contributing items/executions/evidence.

# 9. Roll-up and Drill-down Model

The dashboard and recursion/iteration concepts strongly suggest a
hierarchical status model. The exact rules still need validation, but
the application architecture should support the following principle:

  --------------------------------------------------------------------------
  Test Execution Test Case      Requirement    System / Work  Project /
                                                              Portfolio
  -------------- -------------- -------------- -------------- --------------

  --------------------------------------------------------------------------

Detailed results and iterations are aggregated upward; every aggregated
value must remain explainable by drilling down to its contributing data.

# 10. Recommended Functional Priorities

  --------------------------------------------------------------------------
  Priority          Capability        Recommended outcome Reason
  ----------------- ----------------- ------------------- ------------------
  P1 --- Foundation Context model     Define Role, Phase, Without this, the
                                      Level, Concern and  views remain
                                      filters as shared   disconnected.
                                      navigation context. 

  P1 --- Foundation Traceability &    Formalise object    Required by
                    status model      relationships,      dashboard,
                                      execution status,   matrices and
                                      roll-up rules and   Inspector.
                                      traceability chain. 

  P1 --- User flow  Navigator →       Create one coherent Directly reflects
                    Browser →         exploration flow    the client's FAIR
                    Inspector         with preserved      "find without
                    drill-down        context.            searching"
                                                          concept.

  P1 --- Analysis   Generic matrix    Turn matrix into    Repeatedly present
                    capability        reusable            in client inputs
                                      relation/coverage   and highly
                                      analysis view.      reusable.

  P1 --- Analysis   Inspector         Complete N-1 item   Makes aggregated
                                      context and         indicators
                                      evidence chain.     explainable.

  P2 --- Management Phase-aware       Adapt dashboard to  Makes Navigator a
                    scorecards        lifecycle phase,    real
                                      trend, readiness    decision-support
                                      and exceptions.     tool.

  P2 --- Audit      Snapshots &       Store               Supports
                    timeline          milestone/phase     auditability and
                                      snapshots and       "V&V photo/video".
                                      compare changes.    

  P2 --- UX         Concern-based     Organise            Makes client
                    lenses            Browser/Navigator   concepts usable
                                      around questions    and
                                      rather than chart   understandable.
                                      names.              

  P3 ---            Sankey / FSM /    Add only when a     Avoids building
  Specialised views Treemap /         validated user      visualisations
                    additional        concern requires    without a
                    diagrams          them.               decision/use case.

  OPEN              CCC quality label Clarify definition, Insufficient
                                      scale, calculation, information for
                                      ownership and data  implementation.
                                      sources.            
  --------------------------------------------------------------------------

# 11. Key Questions to Validate with the Client

1.  For each role, what is the primary question or decision the user
    must make at N+1, N and N-1?

2.  Are N+1 / N / N-1 navigation scopes, organisational levels, system
    abstraction levels, or a combination of these concepts?

3.  Which lifecycle phase should change the dashboard content, and which
    indicators are expected in VO, DO, UO, FAT, SAT and SIT?

4.  What are the exact roll-up rules for test execution → test case →
    requirement → system/project?

5.  Which matrix configurations are mandatory for the first usable
    release?

6.  What information must be visible when a user drills down from a red
    or pending dashboard/matrix status?

7.  What constitutes a V&V snapshot or baseline, when is it created, and
    what should be compared between snapshots?

8.  What does the CCC quality label mean, which values can it take, and
    how is it calculated?

9.  Which visualisations are required because they answer a validated
    user concern, and which are only conceptual examples?

10. Should role determine only the default view and filters, or also
    access rights and allowed actions?

# 12. Conclusion

InfraSoft STEPS already contains the principal building blocks needed to
realise the client's vision: project management, structuring, item
editing, relationships, V&V execution, dashboards, graph exploration,
reporting, logging and administration. The recommended next step is
therefore not a redesign of the whole application, but the definition of
a shared functional model that connects these blocks.

  -----------------------------------------------------------------------
  Target product direction: Transform the current set of modules into an
  adaptive Systems Engineering / V&V workspace where the same data is
  filtered, aggregated and visualised according to Role × Phase × Level ×
  Concern, with traceable drill-down from management indicators to the
  underlying engineering item, execution and evidence.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

This document should be treated as a working functional analysis.
Confirmed client inputs, interpreted concepts and open topics should
continue to be tracked separately as additional source material is
reviewed.
