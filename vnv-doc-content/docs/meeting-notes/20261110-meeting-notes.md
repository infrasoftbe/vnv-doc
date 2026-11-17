# Meeting notes 2026.11.10

- **Heatmap View:**
  - Consider adding a heatmap view on top of the matrix to make it easier to identify potential issues, as the matrix does not always provide a clear overview when dealing with a large number of requirements.
  - Essentially, this would involve removing the labels from the matrix.

- **Dossier Completeness:**
  - Work has been done on dossier completeness. Most of the domain operations have been implemented.
  - **Remark from Heleen:**
    - Documents must follow the ISO 9002 naming conventions. However, the client provides different names, which must be preserved as the actual filenames.
    - This can be handled during import by adding `structure_child` nodes with the correct ISO 9002 names, linked to the files already included in the ZIP archive.
  - Even without a dedicated UI for dossier completeness, we can configure completeness through Excel import and already generate the report.

- **Iterations:**
  - Investigate how to handle the SharePoint integration across iterations.

- **TODO:**
  - Report files are not being generated.
  - Application bootstrapping causes the application to become unresponsive, resulting in AWS marking it as unhealthy.