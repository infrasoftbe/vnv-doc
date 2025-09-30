---
title: Reporting Engine API Documentation
description: "Génération d’excel avec BER.ExcelDocument"
summary: "Voyons comment générer son propre fichier excel à l'aide de typescript et de vnv-sdk."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: false
weight: 50
categories: ["Tutorial", "API"]
tags: ["Tutorial", "Guide", "Doc"]
contributors: ["Christophe Luyckx"]
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Overview

The Reporting Engine provides a flexible system for generating reports from Neo4j graph data. It uses a Domain Specific Language (DSL) to define report queries and supports asynchronous report generation with multiple export formats.

## API Flow

The reporting engine follows a 3-step process:

1. **List Templates** → 2. **Execute Report** → 3. **Check Status & Download**

---

## 1. List Report Templates

### Endpoint
```
GET /report/template
```

### Description
Retrieves all available report templates. Each template defines the structure, filters, and fields available for a specific report type.

### Response Structure

```typescript
interface ReportTemplate {
  id: string;                    // Unique template identifier
  token: string;                 // Template token/identifier
  type: string;                  // Report type
  name: string;                  // Human-readable template name
  defaultExportConfig?: ExportConfig;  // Optional default export settings
  meta: ReportMeta;              // Template metadata and configuration
}

interface ExportConfig {
  fileName: string;              // Default filename (without extension)
  fileTypes: Array<"csv"|"xlsx"|"pdf"|"json">;  // Supported export formats
}

interface ReportMeta {
  items: ReportItem[];           // Graph nodes included in the report
  filterParams: FilterParam[];   // Available filter parameters
  fieldParams: FieldItem[];      // Available fields
}

interface ReportItem {
  alias: string;                 // Node alias in the query
  label: string;                 // Neo4j node label
}

interface FilterParam {
  field: FieldItem;              // Field definition for filtering
  defaultValue?: string;          // Optional default filter value, if not given it is given when generating the report
}

interface FieldItem {
  fieldName: string;             // Field path (e.g., "order.meta.name")
  label?: string;                // Human-readable field label
  description?: string;          // Field description
}
```

### Example Response
```json
[
  {
    "id": "47332eb4-43c5-401e-817a-a3e7fd787a6a",
    "token": "order_deliverable",
    "type": "order_deliverable",
    "name": "Order Deliverable",
    "defaultExportConfig": {
      "fileName": "Order_deliverables",
      "fileTypes": ["xlsx"]
    },
    "meta": {
      "items": [
        {
          "alias": "order",
          "label": "ORDER"
        },
        {
          "alias": "deliverable",
          "label": "DELIVERABLE"
        }
      ],
      "filterParams": [
        {
          "field": {
            "fieldName": "order.meta.ref_extern",
            "label": "External reference"
          }
        }
      ],
      "fieldParams": [
        {
          "fieldName": "order.name",
          "description": "order.name"
        },
        {
          "fieldName": "deliverable.name",
          "description": "deliverable.name"
        }
      ]
    }
  }
]
```

---

## 2. Execute Report

### Endpoint
```
POST /report/execute
```

### Description
Executes a report generation job using a template ID and filter parameters. Returns preview data and a job ID for tracking the asynchronous report generation.

### Request Structure

```typescript
interface ExecuteReportInput {
  id: string;                    // Template ID from step 1 (required)
  filterParams: FilterParam[];   // Filter values to apply (required)
  exportConfig?: ExportConfig;   // Override export settings (optional)
}

interface FilterParam {
  field: FieldItem;              // Field definition (required)
  value: string;                 // Filter value (required)
}

interface ExportConfig {
  fileName: string;              // Output filename (required)
  fileTypes: Array<"xlsx","json">;  // Export formats (required)
}
```

### Example Request
```bash
curl -X POST "http://localhost:3000/report/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "47332eb4-43c5-401e-817a-a3e7fd787a6a",
    "filterParams": [
      {
        "field": {
          "fieldName": "order.meta.ref_extern",
          "label": "Ref Extern"
        },
        "value": "DB001"
      }
    ],
    "exportConfig": {
      "fileTypes": ["xlsx", "json"],
      "fileName": "test"
    }
  }'
```

### Response Structure

```typescript
interface ExecuteReportResponse {
  results: Record<string, any>[]; // Preview data (limited to 100 records)
  jobId: string;                 // Job ID for status tracking
  jobStatusLink: string;         // URL for checking job status
}
```

The `results` array contains flat objects where:
- **Keys**: Field labels (e.g., "Order Name", "Deliverable Name")
- **Values**: Extracted field values from the Neo4j nodes

### Example Response
```json
{
  "results": [
    {
      "Order Name": "Test Order Alpha",
      "Deliverable Name": "Test Deliverable Alpha"
    },
    {
      "Order Name": "Test Order Beta",
      "Deliverable Name": "Test Deliverable Beta"
    },
    {
      "Order Name": "Test Order Gamma",
      "Deliverable Name": "Test Deliverable Gamma"
    }
  ],
  "jobId": "118",
  "jobStatusLink": "/report/status/118"
}
```

---

## 3. Check Report Status

### Endpoint
```
GET /report/status/{jobId}
```

### Description
Checks the status of a report generation job. Poll this endpoint until the status is "completed" or "failed".

### Response Structure

```typescript
interface ReportStatusResponse {
  status: "pending" | "completed" | "failed";
  reports?: ReportFile[];        // Present when status is "completed"
  reason?: string;               // Present when status is "failed"
}

interface ReportFile {
  fileType: string;             // File format ("xlsx", "json", etc.)
  filePath: string;             // Download URL path
  fileName: string;             // Original filename
  originalFileName: string;     // Original uploaded filename
  storedFileName: string;       // Actual stored filename with UUID
}
```

### Example Responses

#### Pending Status
```json
{
  "status": "pending"
}
```

#### Completed Status
```json
{
  "status": "completed",
  "reports": [
    {
      "fileType": "xlsx",
      "filePath": "/management/projects/default/documents/reports/test_dfc8747a-5bbb-4633-a50b-9350a7e9350f.xlsx/download",
      "fileName": "test.xlsx",
      "originalFileName": "test.xlsx",
      "storedFileName": "test_dfc8747a-5bbb-4633-a50b-9350a7e9350f.xlsx"
    },
    {
      "fileType": "json",
      "filePath": "/management/projects/default/documents/reports/test_0e43a6ea-ed4a-4b14-b312-209a44aa1bf6.json/download",
      "fileName": "test.json",
      "originalFileName": "test.json",
      "storedFileName": "test_0e43a6ea-ed4a-4b14-b312-209a44aa1bf6.json"
    }
  ]
}
```

#### Failed Status
```json
{
  "status": "failed",
  "reason": "Error message describing the failure"
}
```

---

## Additional Endpoints

### Get Single Template
```
GET /report/template/{id}
```
Returns a specific report template by ID.

### Create Report Config
```
POST /report/config
```
Creates a new report template configuration.

#### Request Structure
```typescript
interface CreateReportConfigRequest {
  token: string;                  // Template token/identifier (required)
  type: string;                   // Report type (required)
  name: string;                   // Human-readable template name (required)
  query: ReportDSL;               // Report DSL query definition (required)
  defaultExportConfig?: ExportConfig;  // Optional default export settings
  project_token?: string;         // Optional project token, generated reports are uploaded to the s3 bucket of this project. If not provided, it is uploaded to the default bucket.
}
```

#### Example Request
```bash
curl -X POST "http://localhost:3000/report/config" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "order_deliverable",
    "type": "order_deliverable",
    "name": "Order Deliverable",
    "query": {
      "start": { "alias": "order", "label": "ORDER" },
      "match": [
        { "direction": "out", "type": "HAS_DELIVERABLE", "target": { "alias": "deliverable", "label": "DELIVERABLE" } }
      ],
      "where": [
        { "field": {"fieldName": "order.meta.ref_extern", "label": "External reference"}, "op": "=" }
      ],
      "return": [
        { "fieldName": "order.name", "label": "Order Name" },
        { "fieldName": "deliverable.name", "label": "Deliverable Name" }
      ],
      "orderBy": [
        { "fieldName": "order.meta.name", "direction": "asc" }
      ]
    },
    "defaultExportConfig": {
      "fileName": "Order_deliverables",
      "fileTypes": ["xlsx"]
    },
    "project_token": "PR1001-001"
  }'
```

#### Response
```json
{
  "id": "47332eb4-43c5-401e-817a-a3e7fd787a6a"
}
```

### Update Report Config
```
PUT /report/config/{id}
```
Updates an existing report template configuration.

#### Request Structure
```typescript
interface UpdateReportConfigRequest {
  id: string;                     // Config ID (required)
  token: string;                  // Template token/identifier (required)
  type: string;                   // Report type (required)
  name: string;                   // Human-readable template name (required)
  query: ReportDSL;               // Report DSL query definition (required)
  defaultExportConfig?: ExportConfig;  // Optional default export settings
  project_token?: string;         // Optional project token
}
```

#### Example Request
```bash
curl -X PUT "http://localhost:3000/report/config/47332eb4-43c5-401e-817a-a3e7fd787a6a" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "47332eb4-43c5-401e-817a-a3e7fd787a6a",
    "token": "order_deliverable_updated",
    "type": "order_deliverable",
    "name": "Order Deliverable (Updated)",
    "query": {
      "start": { "alias": "order", "label": "ORDER" },
      "match": [
        { "direction": "out", "type": "HAS_DELIVERABLE", "target": { "alias": "deliverable", "label": "DELIVERABLE" } }
      ],
      "where": [
        { "field": {"fieldName": "order.meta.ref_extern", "label": "External reference"}, "op": "=" },
        { "field": {"fieldName": "order.meta.status", "label": "Status"}, "op": "=" }
      ],
      "return": [
        { "fieldName": "order.name", "label": "Order Name" },
        { "fieldName": "order.meta.status", "label": "Order Status" },
        { "fieldName": "deliverable.name", "label": "Deliverable Name" }
      ],
      "orderBy": [
        { "fieldName": "order.meta.name", "direction": "asc" }
      ]
    },
    "defaultExportConfig": {
      "fileName": "Order_deliverables_updated",
      "fileTypes": ["xlsx", "json"]
    },
    "project_token": "PR1001-001"
  }'
```

#### Response
```json
{
  "id": "47332eb4-43c5-401e-817a-a3e7fd787a6a"
}
```

### Delete Report Config
```
DELETE /report/config/{id}
```
Deletes a report template configuration.

#### Example Request
```bash
curl -X DELETE "http://localhost:3000/report/config/47332eb4-43c5-401e-817a-a3e7fd787a6a"
```

#### Response
```json
{
  "id": "47332eb4-43c5-401e-817a-a3e7fd787a6a"
}
```

---

## Report DSL Structure

The Report DSL defines the structure of graph queries:

```typescript
interface ReportDSL {
  start: {
    alias: string;               // Starting node alias
    label: string;               // Starting node label
  };
  match?: Array<{
    type: string;                // Relationship type
    direction: "in" | "out" | "undirected";  // Relationship direction
    target: {
      alias: string;             // Target node alias
      label: string;             // Target node label
    };
  }>;
  where?: Array<{
    field: FieldItem;            // Field to filter on
    op: "=" | "<>" | ">" | "<" | ">=" | "<=" | "IN" | "CONTAINS";  // Operator
    value?: any;                 // Filter value (optional for template)
  }>;
  return: FieldItem[];           // Fields to return
  orderBy?: Array<{
    fieldName: string;           // Field to order by
    direction: "ASC" | "DESC";   // Sort direction
  }>;
}
```

---

## Error Handling

- **400 Bad Request**: Invalid request parameters or missing required fields
- **500 Internal Server Error**: Server-side errors during report generation
- **Job Retry**: Failed jobs are automatically retried up to 10 times with exponential backoff

## Field Path Format

Field paths follow the pattern: `{alias}.{property}` or `{alias}.meta.{property}`

Examples:
- `order.name` - Direct property access
- `order.meta.ref_extern` - Meta object property access
- `deliverable.meta.estimateCost` - Nested meta property access

## Supported Export Formats

- **xlsx**: Excel spreadsheet format
- **json**: JSON data format

## Notes

- Preview results are limited to 100 records for performance
- Full report generation is handled asynchronously by background workers
- Reports are stored with UUID suffixes to prevent filename conflicts
- Original filenames are preserved in metadata for download purposes