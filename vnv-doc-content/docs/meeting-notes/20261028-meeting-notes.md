# Meeting notes 2026.10.28
- **Matrix:**
  - Possible configurations cannot be configured through the UI, only through a configuration file.
  - For each axis configuration, define a list of metrics that are valid for those axes.
  - Allow saving matrix filters.

- **Time Logging:**
  - Users should be able to log hours not only for themselves, but also on behalf of someone else.

- **Iterations:**
  - At the start of an iteration:
    - Select what should be included in the new iteration.
    - Select which elements should be carried over from the previous iteration: requirements, documents, items, etc.
      - This involves creating a copy (potentially a soft copy).
      - When modifying a requirement from a previous iteration, a copy should be created and the changes applied to that copy. Any subsequent changes should only affect the new copy.
      - When modifying a file, a new copy should be created and its status set to "In Review".
    - Optionally support bulk reviews of documents.

- **As-Built / V&V Report:**
  - Add the ability to generate an as-built report (potentially in Markdown) providing an overview of the Verification & Validation (V&V) process.
  - Based on this report, the responsible authority / client will make certain decisions, which will be recorded in registers of type "Decision".
  - Allow creating a register entry directly from a test case execution, document review, etc.
    - The client immediately has the necessary information to take action.
    - The register entry should provide traceability back to the original context or item.

- **Register Form:**
  - Improve the usability of the register form.