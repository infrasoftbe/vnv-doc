---
title: "MetaContainer CRUD with Fragments"
weight: 2306
---
# MetaContainer CRUD with Fragments

This guide explains how to perform CRUD (Create, Read, Update, Delete) operations on **MetaContainers** for nodes in a VNV project using the VPI.

## MetaContainer vs Metadata Architecture

The VPI encapsulates a node's metadata in a **MetaContainer** that:

- Has a **reference** to the owner node
- Allows separate management of node properties
- Encapsulates raw metadata in a structured container

## Adding a MetaContainer (Create)

The `addMetadata()` process creates a **MetaContainer** associated with an existing Node Fragment:

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Project initialization
let vpi = vnv.VPI.ProjectInstance.init({/* your project */});

// The node must exist beforehand (see node-crud.md)
const nodeToken = 'existing-node-token';

// Add MetaContainer to the node
let metaContainer = {
  id: crypto.randomUUID(),
  token: nodeToken,
  meta: {
    description: 'Detailed node description',
    category: 'Documentation',
    tags: ['important', 'document'],
    author: 'user-123',
    priority: 'high',
    language: 'fr',
    createdAt: new Date().toISOString()
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [operation, metadata] = vpi.addMetadata(metaContainer);
```

### Adding via node instance

You can also add metadata directly via the node instance:

```typescript
// Set metadata directly on the node
node.setMetadata({
  description: 'Node description',
  tags: ['important', 'document'],
  category: 'work',
  priority: 'high'
});
```

### Code Explanation

- `ProjectInstance.init(...)`: Initializes a project by returning a ProxyProjectInstance that allows simplified access to all project layers.
- `vpi.addMetadata(metaContainer)`: Adds metadata to a node via a complete IMetaContainer object. This method returns an array containing two elements:
  - `operation`: The operation associated with adding the metadata.
  - `metadata`: The metadata that was added.

## Reading Metadata (Read)

To read existing metadata, several methods are available:

```typescript
// Retrieve metadata by token
const metadata = vpi.getMetadataByToken('metadata-token');

// Check metadata existence
const exists = vpi.hasMetadata('metadata-token');

// Search all metadata with criteria
const searchResults = vpi.queryMetadataAll({
  type: 'description',
  target: 'node-token'
});

// Retrieve metadata via node instance
const nodeMetadata = node.getMetadata();
```

### Common Metadata Types

In the VNV system, several types of metadata are used:

```typescript
// Description metadata
const descriptionMeta = {
  type: 'description',
  value: 'Detailed description',
  properties: { language: 'fr' }
};

// Categorization metadata
const categoryMeta = {
  type: 'category',
  value: 'work',
  properties: { subcategory: 'project-management' }
};

// Tag metadata
const tagsMeta = {
  type: 'tags',
  value: ['urgent', 'review', 'client'],
  properties: { source: 'user-input' }
};

// Technical metadata
const technicalMeta = {
  type: 'technical',
  value: {
    version: '1.2.3',
    format: 'markdown',
    encoding: 'utf-8'
  }
};
```

## Updating Metadata (Update)

To update existing metadata for a node, use the `setMetadata` method by passing the desired new values.

```typescript
// Update metadata via IMetaContainer object
let updatedMetaContainer = {
  ...metadata, // retrieve existing metadata object
  meta: {
    ...metadata.meta, // keep existing metadata
    value: 'New updated description',
    properties: {
      language: 'en',
      lastModified: new Date().toISOString(),
      modifiedBy: 'user-456'
    }
  },
  update_dt: Date.now()
};
let [operation, updatedMetadata] = vpi.setMetadata(updatedMetaContainer);

// Update via node instance (overwrites existing metadata)
node.setMetadata({
  description: 'New description',
  tags: ['updated', 'current'],
  lastUpdate: new Date().toISOString()
});

// Partial update via node instance
const currentMeta = node.getMetadata();
node.setMetadata({
  ...currentMeta,
  description: 'Updated description',
  tags: [...(currentMeta.tags || []), 'new-tag']
});
```

### Code Explanation

- `vpi.setMetadata(metaContainer)`: Updates metadata via a complete IMetaContainer object. This method returns an array containing the operation performed and the updated metadata.
- `node.setMetadata(...)`: Directly updates the node's metadata. This method replaces all existing metadata.

## Deleting Metadata (Delete)

To delete metadata from a node, use the `deleteMetadata` method by specifying the token of the metadata to delete.

```typescript
// Delete metadata by token
let operation = vpi.deleteMetadata('metadata-token');
```

### Code Explanation

- `vpi.deleteMetadata(metadata.token)`: Deletes the metadata identified by `metadata.token`. This method returns the operation associated with the deletion.

## Advanced Metadata Management

### Structured Metadata

Metadata can contain complex structures:

```typescript
const complexMetadata = {
  type: 'project-info',
  value: {
    status: 'in-progress',
    phases: [
      { name: 'analysis', completed: true, date: '2024-01-15' },
      { name: 'development', completed: false, date: null },
      { name: 'testing', completed: false, date: null }
    ],
    team: {
      lead: 'user-123',
      members: ['user-456', 'user-789'],
      external: []
    },
    budget: {
      allocated: 50000,
      spent: 12500,
      currency: 'EUR'
    }
  },
  properties: {
    version: '2.1',
    schema: 'project-metadata-v2',
    confidentiality: 'internal'
  }
};
```

### Advanced Metadata Search

```typescript
// Search by metadata type
const descriptions = vpi.queryMetadataAll({ type: 'description' });

// Search by specific properties
const frenchDescriptions = vpi.queryMetadataAll({
  type: 'description',
  properties: { language: 'fr' }
});

// Search by value
const urgentItems = vpi.queryMetadataAll({
  type: 'tags',
  value: 'urgent'
});
```

### Metadata with Validation

```typescript
// Add metadata with custom validation
const validatedMetadata = {
  type: 'status',
  value: 'approved',
  properties: {
    validatedBy: 'user-admin',
    validationDate: new Date().toISOString(),
    validationRules: ['required-approval', 'manager-review'],
    isValid: true
  }
};
```

## Best Practices

### Metadata Type Naming

Use consistent naming conventions:

```typescript
// Base types
'description'     // Textual description
'tags'           // Labels/keywords
'category'       // Categorization
'status'         // Node status

// Compound types
'technical-info'  // Technical information
'user-settings'   // User settings
'audit-trail'     // Audit trail
'workflow-state'  // Workflow state
```

### Version Management

```typescript
const versionedMetadata = {
  type: 'content-version',
  value: '1.3.2',
  properties: {
    previousVersion: '1.3.1',
    changes: ['updated-section-2', 'fixed-typos'],
    changelog: 'Version 1.3.2: Updated section 2 and fixed typos',
    releaseDate: '2024-10-27'
  }
};
```

## Operations Summary

- **Creation (addMetadata, node.setMetadata)**: Adds metadata to a node and returns both the operation and the added metadata.
- **Reading (getMetadataByToken, hasMetadata, queryMetadataAll, node.getMetadata)**: Different methods to retrieve and search for metadata.
- **Update (setMetadata, node.setMetadata)**: Modifies existing metadata values and returns the operation and updated metadata.
- **Deletion (deleteMetadata)**: Removes metadata from a node and returns the associated operation.

These operations allow you to efficiently manipulate node metadata in a VNV project, using the functionalities exposed by the ProxyProjectInstance to directly access different project layers.
