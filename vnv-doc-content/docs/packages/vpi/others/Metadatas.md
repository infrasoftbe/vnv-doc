---
title: "Metadata Reference"
weight: 2400
---

# VPI Metadata Reference

## Overview

Metadata in the system provides contextual information for all node types. Each node can have associated metadata that describes its properties, relationships, and state within the project structure.

Each metadata field has a unique **Metadata Key** (used in code) and a corresponding **Metadata KeyId** (internal identifier) that maps to specific validation schemas.

## Use Cases

- **Project Management**: Track estimates, costs, dates, and status
- **File Management**: Store file properties, MIME types, and modification history
- **Quality Assurance**: Record correctness, completeness, and consistency metrics
- **User Management**: Maintain user profiles and contact information
- **External Integration**: Link to external platforms (Jira, SharePoint, Excel, etc.)
- **Requirement Analysis**: Document requirements with RAT quality assessments

## Available Metadata Fields

Below is the complete reference of all available metadata fields in the VPI system:

| Metadata Key | Metadata KeyId | Metadata Description | Metadata Type |
| ------------ | -------------- | -------------------- | ------------- |
| userGroup | UserGroup | User groups with access to this element | Array\<string\> |
| description | Description | Textual description of the element | string |
| ref_extern | ReferenceExternal | External reference to a third-party system | string |
| path | Path | Hierarchical path of the element | Array\<string\> |
| external | External | References to external platforms (Excel, Jira, Relatics, etc.) | Object |
| budgetYear | BudgetYear | Associated budget year | string |
| estimateTime | EstimateTime | Estimated time to complete the task | string |
| estimateCost | EstimateCost | Estimated cost of the project/task | string |
| status | Status | Current status of the element | string |
| startDate | StartDate | Start date | string |
| endDate | EndDate | End date | string |
| site | WebSiteReference | Website reference (url + id) | Object |
| extension | Extension | File extension | string |
| category | Category | Classification category | string |
| url | Url | Full URL to the resource | string |
| liveview | LiveView | Live view of the resource | string |
| key | Key | Identification key | string |
| value | Value | Value associated with the key | string |
| correctness | CorrectnessStatus | Correctness/accuracy level | number |
| fileType | FileType | File type | string |
| mimeType | MimeType | MIME type of the file | string |
| modifiedBy | ModifiedBy | Identifier of the user who modified | string |
| dateModified | ModifiedDate | Last modification date | string |
| dateModifiedValue | ModifiedDateValue | Modification timestamp | number |
| fileSize | FileSize | File size in bytes | number |
| fileSizeRaw | FileSizeRaw | Raw file size | string |
| linkItem | LinkItem | Link to an associated element | string |
| projectStatus | ProjectStatus | Project status | string |
| dbStatus | DBStatus | Database status | string |
| metatag | Metatag | Metadata tag | string |
| completeness | CompletenessStatus | Completeness level | number |
| consistency | ConsistencyStatus | Consistency level | string |
| tags | Tags | List of associated tags | Array\<string\> |
| project_id | ProjectId | Parent project identifier | string |
| register_dt | RegisterDate | Registration date | number |
| resolver_dt | ResolverDate | Resolution date | number |
| type | Type | Node type | string |
| assignee | AssignedTo | Person assigned to the task | string |
| remark | Remark | Remark or comment | string |
| itemPath | ItemPath | Complete path of the element | string |
| author | Author | Author of the element | string |
| content | Content | Textual content of the element | string |
| dataQuality | DataQuality | Data quality level | string |
| rat | Rat | RAT quality assessment object | Object |
| rat.qualityLevel | RatQualityLevel | RAT quality level | string |
| rat.numericQuality | RatNumericQuality | RAT numeric quality score | number |
| rat.qualityDate | RatDataQuality | RAT quality assessment date | string |
| rat.qualitySummary | RatSummaryQuality | RAT assessment summary | string |
| validationType | ValidationType | Applied validation type | string |
| first_name | FirstName | User's first name | string |
| last_name | LastName | User's last name | string |
| email | Email | User's email address | string (email format) |
| alias | Alias | Alias or username | string |
| groups | Groups | Group memberships | string |
| children | Children | Child elements of the structure | Map\<string, any\> |
| views | Views | Display view configuration | Object |
| views.bubble | ViewsBubble | Bubble view configuration | string |
| views.forceDirectedTree | ViewsForceDirectedTree | Tree view configuration | string |
| views.listView.fields | ViewsListViewFields | List field configuration | any |
| mobile | MobilePhone | Mobile phone number | string |
| officeLocation | OfficeLocation | Office location | string |
| businessPhones | BusinessPhone | Business phone numbers | string |
| preferredLanguage | PreferredLanguage | Preferred language | string |
| jobTitle | JobTitle | Job title | string |
| userPrincipalName | UserPrincipalName | User principal name | string |
| default | Default | Default value indicator | boolean |

## Usage Example

```typescript
import { metadataFactory } from '@vpi/models/metadatas/metadata-factory';

// Create metadata for a deliverable with time and cost estimates
const DeliverableMetadata = metadataFactory('deliverable', ['estimateTime', 'estimateCost']);

const metadata = new DeliverableMetadata({
  estimateTime: '40h',
  estimateCost: '5000',
  description: 'Project deliverable with documentation',
  author: 'John Doe'
});
```

## Notes

- All metadata fields are validated using Zod schemas
- Invalid fields are automatically filtered out during instantiation
- Metadata can be extended per node type using the factory pattern
- External platform references support Excel, Jira, Relatics, TestLink, SharePoint, and Graph365
