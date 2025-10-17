---
title: Guide - ESS and VPI Import Format
description: Génération d’excel avec BER.ExcelDocument
summary: Voyons comment générer son propre fichier excel à l'aide de typescript et de vnv-sdk.
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: false
weight: 50
categories:
  - Tutorial
  - SDK-Tutorial
tags:
  - Tutorial
  - Guide
  - Excel
contributors:
  - Houthoofd Guillaume
pinned: false
homepage: false
seo:
  title: ""
  description: ""
  canonical: ""
  noindex: false
---

This guide describes the expected formats for importing data into the VNV system:
- **ESS (Elastic Session System)**: Complete cloud session containing a workspace and its documents
- **VPI (Virtual Project Interface)**: Workspace represented by an Excel file

## 📋 Table of Contents

1. [VPI - Excel Format](#vpi---excel-format)
2. [ESS - ZIP Format](#ess---zip-format)
3. [Schemas and Validation](#schemas-and-validation)
4. [Examples](#examples)
5. [Error Handling](#error-handling)

---

## 🔧 VPI - Excel Format

The VPI represents vnv project data as an Excel file with specific worksheets.

### Fundamental Concepts

- **Project**: Composed of "default" structures and lists that are required
- **Nodes**: Basic project elements (Work, Task, etc.)
- **Structures/Lists**: Symbolic expressions for organizing nodes
- **Default Lists**: Cannot be deleted, automatically created for each node type
- **Custom Structures/Lists**: User instances, symbolic expressions only

### 🎯 Token Format

**Mandatory format**: `[nodekind-prefix][year]-[year-iterator]-[node-iterator].[str\lst-name]-[child-name]`

#### Prefixes by Node Type

| NodeKind | Prefix | Token Example |
|----------|--------|---------------|
| `Attachement` | `ATT` | `ATT2025-001-001` |
| `Order` | `PO` | `PO2025-001-001` |
| `Deliverable` | `DEL` | `DEL2025-001-001` |
| `Contact` | `CNT` | `CNT2025-001-001` |
| `Work` | `WRK` | `WRK2025-001-001` |
| `Worklog` | `WRKLG` | `WRKLG2025-001-001` |
| `Entity` | `ENT` | `ENT2025-001-001` |
| `Material` | `MAT` | `MAT2025-001-001` |
| `Requirement` | `REQ` | `REQ2025-001-001` |
| `Register` | `REG` | `REG2025-001-001` |
| `Test` | `TST` | `TST2025-001-001` |
| `File` | `FIL` | `FIL2025-001-001` |
| `Functional` | `FN` | `FN2025-001-001` |
| `Structure` | `STR` | `STR2025-001-001` |
| `Product` | `PR` | `PR2025-001-001` |
| `Process` | `PRO` | `PRO2025-001-001` |
| `Object` | `OBJ` | `OBJ2025-001-001` |
| `Role` | `RO` | `RO2025-001-001` |
| `Report` | `REP` | `REP2025-001-001` |
| `Right` | `RIGT` | `RIGT2025-001-001` |
| `Group` | `GRP` | `GRP2025-001-001` |
| `Invoice` | `INV` | `INV2025-001-001` |
| `User` | `USR` | `USR2025-001-001` |
| `Risk` | `RISK` | `RISK2025-001-001` |
| `Descision` | `DESCI` | `DESCI2025-001-001` |
| `Action` | `ACTI` | `ACTI2025-001-001` |
| `List` | `LST` | `LST2025-001-001` |
| `Project` | `PR` | `PR2025-001` |
| `System` | `SYS` | `SYS2025-001-001` |
| `Application_component` | `APC` | `APC2025-001-001` |
| `Test_project` | `TPRJ` | `TPRJ2025-001-001` |
| `Test_build` | `TBLD` | `TBLD2025-001-001` |
| `Test_plan` | `TPLN` | `TPLN2025-001-001` |
| `Test_suite` | `TSUI` | `TSUI2025-001-001` |
| `Test_case` | `TCAS` | `TCAS2025-001-001` |
| `Test_case_execution` | `TCEX` | `TCEX2025-001-001` |

**Complete Examples**:
- `PR2025-001` (project, 1st project of 2025)
- `WRK2025-001-001` (work, 1st work of 1st project of 2025)
- `LST2025-001-005.MyList-002` (requirement in a custom list)

> ⚠️ **IMPORTANT**: The token must represent the expected numbering for this project based on the number of projects in the year.

### 📊 Mandatory Worksheets

#### 1. Worksheet `#Project`
**Project Definition - CRITICAL**

| Column | Mandatory | Description |
|--------|-----------|-------------|
| `name` | ✅ | Project name |
| `token` | ✅ | **MUST** represent the desired token or already stored in DB |
| `@meta.[key]` | ✅ | Metadata keys (must start with @meta.) |

> ⚠️ **CRITICAL**: The project token MUST be the real desired token, as it determines all subsequent deductions.

#### 2. Worksheets `#Itm#<NodeKind>`
**Node definition by type + default lists**

**STRICT naming rule**:
- Format: `#Itm#<NodeKind>`
- NodeKind: **First letter uppercase, rest lowercase, pluralize**
- **EXACT** spelling of the node type

**Examples**: `#Itm#Works`, `#Itm#Files`, `#Itm#Requirements`, `#Itm#Tests`, `#Itm#Materials`, `#Itm#Test_suites` etc.

> 📋 **Supported node types**: attachement, order, deliverable, contact, work, worklog, entity, material, requirement, register, test, file, functional, structure, product, process, object, role, report, right, group, invoice, user, risk, descision, action, list, project, system, application_component, test_project, test_build, test_plan, test_suite, test_case, test_case_execution

| Column | Mandatory | Description |
|--------|-----------|-------------|
| `name` | ✅ | Node name |
| `token` | ✅ | Unique token according to format |
| `type` | ✅ | **MANDATORY** - Node type (must match the NodeKind) |
| `@meta.[key]` | ✅ | Specific metadata |

> 📝 **Note**: Node names are used to create associated `list_child` for the default list.

#### 3. Worksheet `#Rel`
**Relationships definition**

| Column | Mandatory | Description | Examples |
|--------|-----------|-------------|----------|
| `from_type` | ✅ | Source NodeKind | `work`, `requirement`, `test`, `material`, `order`, etc. |
| `from_token` | ✅ | Source node token | `WRK2025-001-001`, `REQ2025-001-005` |
| `r_type` | ✅ | Relationship type | `HAS_REQUIREMENT`, `IS_REQUIREMENT_FOR_TEST_CASE` |
| `to_type` | ✅ | Target NodeKind | `requirement`, `test`, `deliverable`, `file`, etc. |
| `to_token` | ✅ | Target node token | `REQ2025-001-005`, `TST2025-001-001` |

#### 4. Worksheets `#Itm#Structures` and `#Itm#Lists`
**Custom structures and lists definition**

| Column | Mandatory | Description |
|--------|-----------|-------------|
| `name` | ✅ | Structure/list name |
| `token` | ✅ | Unique token according to format |
| `@meta.type` | ✅ | **MANDATORY** - Type of nodes that children can link to |
| `@meta.[key]` | ✅ | Other metadata according to StructureMetadata schema |

> 📝 **Note**: Default lists are not represented here (implicit via `#Itm#<NodeKind>`).

#### 5. Worksheet `#Str#Dossier` (Mandatory)
**Default structure for documents**

This worksheet **MUST** be present but **MUST NOT** appear in `#Itm#Structures`.

### 📁 Content Worksheets

#### Worksheets `#Str#<StructureName>` and `#Lst#<ListName>`
**Content of custom structures and lists**

⚠️ **Case sensitive**: `#Str#` and `#Lst#` exactly (not `#str#` or `#STR#`)

| Column | Mandatory | Description |
|--------|-----------|-------------|
| `id` | ✅ | Unique identifier |
| `name` | ✅ | Element name |
| `token` | ✅ | Element token |
| `type` | ✅ | Element type (NodeKind) |
| `child` | ✅ | Hierarchical position |

**`child` column format**:
- **Lists**: Integer only (e.g.: `1`, `2`, `3`) - flat list
- **Structures**: Hierarchical notation with dots (e.g.: `1`, `1.1`, `1.2`, `1.2.1`)

### 🔐 Token Management

- **Mandatory tokens**: Enable link creation between entities
- **External tokens**: If different from expected system → passed as `ref_extern` of the node
- **Exception**: Only the project token MUST be the desired/real token

---

## 📦 ESS - ZIP Format

The ESS contains the VPI (Excel file) + documents organized according to the defined structure.

### 📄 File Naming Convention

**ZIP and Excel file names MUST follow the project token format:**

#### ESS Import (ZIP + Excel)
- **ZIP file**: `[project-token].zip` or `[project-token].[version].zip`
  - Examples: `PR2025-001.zip`, `PR2025-001.v1.zip`, `PR2025-001.final.zip`
- **Excel file inside ZIP**: **MUST** be exactly `[project-token].xlsx`
  - Example: `PR2025-001.xlsx` (no version suffix allowed)

#### VPI Import (Excel only)
- **Excel file**: `[project-token].xlsx` or `[project-token].[version].xlsx`
  - Examples: `PR2025-001.xlsx`, `PR2025-001.v1.xlsx`, `PR2025-001.draft.xlsx`

> 🔍 **Matching Rule**: The system uses the filename **before the first dot** to match with the token in the `#Project` worksheet.

#### Examples:
- ✅ ZIP: `PR2025-001.final.zip` → Excel inside: `PR2025-001.xlsx` → Project token: `PR2025-001`
- ✅ Excel: `PR2025-001.v2.xlsx` → Project token: `PR2025-001`
- ❌ ZIP: `project.zip` → Project token: `PR2025-001` (mismatch)

### ZIP Structure

```
PR2025-001.zip
├── PR2025-001.xlsx      # VPI file (project definition) - MUST match project token
├── Files/               # Default list of all files
│   ├── document1.pdf
│   ├── image.png
│   └── ...
├── Dossier/            # Default project structure
│   ├── subfolder1/
│   ├── subfolder2/
│   └── ...
└── [other-structures]/ # Custom structures defined in Excel
    └── with-hierarchy/
        └── according-to-excel/
```

### 🔗 Excel ↔ Files Correspondence

1. **Structures with `@meta.type = "file"`** in Excel → Folders in ZIP
2. **Lists with `@meta.type = "file"`** in Excel → Folders in ZIP  
3. **Hierarchy**: MUST correspond **EXACTLY** between Excel and ZIP
4. **Files** → Interpreted as `file` nodes and `structure_child`

### 📁 Default Elements (implicit)

- **"Files" List**: Corresponds to the `Files/` folder in ZIP
- **"Dossier" Structure**: Corresponds to the `Dossier/` folder in ZIP

These elements do **NOT** appear in `#Itm#Structures` or `#Itm#Lists` worksheets.

### ⚠️ Strict Import Rules

✅ **Allowed**:
- Extra folders in ZIP (will be omitted during import)
- Files in folders defined in Excel

❌ **Blocking errors**:
- Structure/List defined in Excel but corresponding folder missing in ZIP
- Children (child) defined in Excel but corresponding folders absent
- Different hierarchy between Excel and ZIP

---

## 🔍 Schemas and Validation

### Node Metadata (NodeMetadata)

Metadata follows the Zod `NodeMetadata` schema with mandatory fields:

#### Mandatory generic fields
```typescript
{
  type: string,                      // MANDATORY - Node type (must match NodeKind)
  description: string | null,        // Node description
  ref_extern: string | null,         // External reference
  external: {                        // External integrations
    excel: { token?: string },
    jira: { id?: string, url?: string },
    relatics: { id?: string, url?: string },
    testlink: { id?: string, url?: string },
    sharepoint: { id?: string, url?: string },
    graph365: { id?: string, url?: string }
  }
}
```

#### Optional fields by type
- **Generic**: `estimateTime`, `estimateCost`, `status`, `startDate`, `endDate`
- **Files**: `fileType`, `mimeType`, `fileSize`, `extension`, `category`
- **Registers**: `project_id`, `register_dt`, `resolve_dt`, `assignee`
- **Requirements**: `author`, `content`, `dataQuality`, `consistency`, `rat`
- **Users**: `first_name`, `last_name`, `email`, `alias`, `jobTitle`

### Structure/List Metadata (StructureMetadata)

Structures and lists use a subset of `NodeMetadata`:

```typescript
{
  description: string | null,
  ref_extern: string | null,
  external: object,
  children: any[] | null,           // Structure/list children
  views: object | null,             // Display views
  type: string | null,              // MANDATORY for structures/lists
  default: boolean | null           // Indicates if it's a default element
}
```

---

## 📝 Complete Examples

### Example of worksheet `#Project`

| name | token | type  | @meta.description | @meta.status |
|------|-------|-------|-------------------|--------------|
| VNV Project 2025 | PR2025-001 | project | First project of the year | active |

### Example of worksheet `#Itm#Work`

| name | token | type | @meta.description | @meta.estimateTime | @meta.status |
|------|-------|------|-------------------|--------------------| -------------|
| Technical Analysis | WRK2025-001-001 | work | Requirements analysis | 40h | in_progress |
| Documentation | WRK2025-001-002 | work | Documentation writing | 20h | to_do |

### Example of worksheet `#Itm#Test`

| name | token | type | @meta.description | @meta.status | @meta.author |
|------|-------|------|-------------------|--------------|--------------|
| Auth Unit Test | TST2025-001-001 | test | Authentication test | passed | john.doe |
| API Integration Test | TST2025-001-002 | test | Endpoints test | pending | jane.smith |

### Example of worksheet `#Rel`

| from_type | from_token | r_type | to_type | to_token |
|-----------|------------|---------|---------|----------|
| work | WRK2025-001-001 | IS_WORK_FOR_REQUIREMENT | requirement | REQ2025-001-001 |
| requirement | REQ2025-001-001 | IS_REQUIREMENT_FOR_TEST_CASE | test | TST2025-001-001 |
| file | FIL2025-001-001 | IS_FILE_FOR_PROJECT | project | PR2025-001 |

### Example of worksheet `#Itm#Structures`

| name | token | @meta.type | @meta.description | @meta.default |
|------|-------|------------|-------------------|---------------|
| Technical Documents | STR2025-001-001 | file | Project technical docs | false |
| Archives | STR2025-001-002 | file | Archived documents | false |

### Example of worksheet `#Str#Technical Documents`

| id | name | token | type | child |
|----|------|-------|------|-------|
| 1 | Specifications | STR2025-001-002.Technical Documents-1 | structure_child | 1 |
| 2 | Architecture | STR2025-001-002.Technical Documents-1.1 | structure_child | 1.1 |
| 3 | Tests | STR2025-001-002.Technical Documents-2 | structure_child | 2 |

---

## 🚨 Error Handling

### Validation Process

1. **Excel Parsing** → JSON dataset creation
2. **Dynamic Zod schema generation** based on detected node types
3. **ZIP paths analysis** → Schema creation for file structures
4. **Cross validation** Excel ↔ ZIP

### Returned Zod Error Types

#### Excel structure errors
```json
{
  "error": "Invalid worksheet name",
  "path": ["worksheets", "#Itm#works"],
  "message": "NodeKind must start with capital letter: expected '#Itm#Work'"
}
```

#### Data errors
```json
{
  "error": "Missing required field",
  "path": ["#Itm#Work", 2, "token"],
  "message": "Token is required"
}
```

#### ZIP correspondence errors
```json
{
  "error": "Missing directory",
  "path": ["structures", "Technical Documents"],
  "message": "Directory 'Technical Documents' defined in Excel but not found in ZIP"
}
```

### Error Mapping

- **Excel row level errors**: Return row index + worksheet
- **Worksheet name errors**: Validation of name schema based on NodeKind
- **File correspondence errors**: ZIP path schema validation

### Error Resolution

1. **Worksheet error** → Check exact spelling and case
2. **Token error** → Check format and uniqueness
3. **ZIP error** → Check Excel/ZIP hierarchy correspondence
4. **Metadata error** → Check NodeMetadata/StructureMetadata schema

---

## ✅ Validation Checklist

Before import, verify:

- [ ] **File naming convention** respected:
  - ZIP: `[project-token].zip` or `[project-token].[version].zip`
  - Excel inside ZIP: exactly `[project-token].xlsx` (no version suffix)
  - Excel standalone: `[project-token].xlsx` or `[project-token].[version].xlsx`
  - Filename before first dot MUST match project token in `#Project` worksheet
- [ ] **Project tokens** in correct format and unique per year
- [ ] **Worksheet names** with exact case (`#Itm#Work` not `#itm#work`)
- [ ] **Mandatory columns** present in each worksheet:
  - `name`, `token`, `type` (MANDATORY for all nodes)
  - `@meta.[key]` metadata fields
- [ ] **'type' column** correctly filled with NodeKind matching the worksheet
- [ ] **@meta.type metadata** defined for structures/lists
- [ ] **ZIP hierarchy** corresponding exactly to Excel
- [ ] **Worksheet #Str#Dossier** present (but not in #Itm#Structures)
- [ ] **Token format** respecting convention with correct prefixes:
  - Attachement: `ATT`, Order: `PO`, Deliverable: `DEL`, Contact: `CNT`
  - Work: `WRK`, Worklog: `WRKLG`, Entity: `ENT`, Material: `MAT` 
  - Requirement: `REQ`, Register: `REG`, Test: `TST`, File: `FIL`
  - Structure: `STR`, Product: `PR`, Process: `PRO`, Object: `OBJ`
  - Role: `RO`, Report: `REP`, Group: `GRP`, User: `USR`
  - System: `SYS`, Project: `PR` (shares same prefix as Product)
  - Specialized tests: `TPRJ`, `TBLD`, `TPLN`, `TSUI`, `TCAS`, `TCEX`
- [ ] **Relationship types** using authorized values
- [ ] **NodeKind** with exact spelling and correct case
