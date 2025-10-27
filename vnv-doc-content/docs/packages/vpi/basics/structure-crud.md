---
title: "Structures CRUD with Fragments"
weight: 2308
---
# Structures CRUD with Fragments

This guide explains how to perform CRUD (Create, Read, Update, Delete) operations on **Structure Fragments** in a VNV project using the VPI.

## What is a Structure with Fragments?

A structure within a VPI is a **Node Fragment** extended by the `Structure` class. It has the same utilities as the node, plus specific functionalities for managing organized collections.

### Children - Organizational Nodes

Structures use **Children** (structure_child) which are **virtual references** stored in `structure.metadata.children`. These children:

- **Do not have** their own metadata
- Are **organizational pointers** to real nodes
- Have a `child` field that indicates the **hierarchical position**:
  - **Structures**: `child: "1.2.1"` (position in hierarchy - child of "1.2")
  - **Lists**: `child: "3"` (position in ordered list)
- Are **linked to real nodes** via `HAS_LINK` relationships in `vpi.data.relations`
- The linked real node must have the type corresponding to `structure.meta.type`

## Adding a Structure (Create) - 2-Step Process

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Project initialization
let project = vnv.VPI.ProjectInstance.init({/* your project */});

// STEP 1: Add the structure fragment
let [operation, structure] = vpi.addStructure({
  type: 'structure', // <-- !REQUIRED!
  name: 'My document folder' // <-- !REQUIRED!
});

// STEP 2: Add metadata with organizational children
let structureMetaContainer = {
  id: crypto.randomUUID(),
  token: structure.token,
  meta: {
    description: 'Folder containing all project documents',
    path: [],
    ref_extern: '',
    external: null,
    type: 'file', // <-- !REQUIRED!
    children: [
      // Children nodes with hierarchical positioning
      {
        child: '1', // Hierarchical position
        id: 'structure-child-1',
        meta: null,
        name: 'Document 1',
        token: 'child1-token',
        type: 'structure_child'
        // HAS_LINK relationship to a 'file' type node created automatically
      },
      {
        child: '1.1', // Child of '1'
        id: 'structure-child-2',
        meta: null,
        name: 'Sub-document 1.1',
        token: 'child2-token',
        type: 'structure_child'
        // HAS_LINK relationship to a 'file' type node created automatically
      }
  ]
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [metaOperation, metadata] = vpi.addMetadata(structureMetaContainer);
```

### Code Explanation

- `vpi.addStructure(...)`: Adds a new structure to the project. This method returns an array containing:
  - `operation`: The operation associated with adding the structure.
  - `structure`: The structure that was added.

## Reading a Structure (Read)

To retrieve an existing structure, several methods are available:

```typescript
// Retrieve a structure by its token
const structure = vpi.getStructureByToken('structure-token');

// Check structure existence
const exists = vpi.hasStructure('structure-token');

// Search all structures with criteria
const searchResults = vpi.queryStructureAll({ type: 'structure' });

// Search for a structure in all collections
const foundStructure = vpi.findNodeByToken('structure-token');
```

## Updating a Structure (Update)

To update an existing structure, use the `setStructure` method:

```typescript
// Updating an existing structure
let [operation, updatedStructure] = vpi.setStructure(structure.token, {
  name: 'Renamed folder',
  metadata: {
    description: 'Updated description',
    path: [],
    ref_extern: '',
    external: null,
  }
});

// Alternative: use the structure's update method
const updateOperation = structure.update({
  name: 'New name via structure'
});
```

## Deleting a Structure (Delete)

To delete a structure, use the `deleteStructure` method:

```typescript
// Deleting a structure
let operation = vpi.deleteStructure('structure-token');

// Alternative: direct deletion via structure
const deleteOperation = structure.delete();
```

## Managing Child Nodes

{{< callout context="tip" title="Important Distinction: Real Nodes vs Structure Children" icon="outline/rocket" >}}
**DO NOT CONFUSE**:
- **Real nodes**: Created with `vpi.addNode({ type: 'file' })` - have complete metadata
- **Structure Children**: Created with `structure.addNode({ type: 'structure_child' })` - virtual references WITHOUT metadata

**When to use what**:
- `vpi.addNode()` → To create a real business node (file, task, contact...)
- `structure.addNode({ type: 'structure_child' })` → To reference/organize existing nodes in the structure
{{< /callout >}}

Structures offer specific methods to manage their child nodes (structure_child):

### Adding a child node

```typescript
// Add a child node to the structure
const [childOp, childNode] = structure.addNode({
  type: 'structure_child',
  name: 'Child document',
  child: '1', // Hierarchical position
  meta: null // structure_child don't have metadata
  // Can be linked via HAS_LINK to a node of type structure.meta.type
});
```

### Updating a child node

```typescript
// Update a child node (IStructureChild)
const [updateChildOp, updatedChild] = structure.setNode({
  ...childNode,
  name: 'Modified title'
});
```

### Checking child node existence

```typescript
// Check if a node is a child of the structure
const hasChild = structure.hasNode(childNode.token);
```

### Deleting a child node

```typescript
// Delete a child node from the structure
const deleteChildOp = structure.deleteNode(childNode.token);
```

### Searching child nodes

```typescript
// Search all child nodes
const childResults = structure.queryNodeAll({ type: 'file' });

// Retrieve a child by its token
const child = structure.getChildByToken('child-token');
```

## Structure Validation

Structures offer validation methods to check their integrity:

```typescript
// Check structure consistency
const isConsistent = structure.isConsistant();

// Check if the structure is complete
const isComplete = structure.isComplete();

// Check structure validity
const isCorrect = structure.isCorrect();

// Usage example
if (!structure.isCorrect()) {
  console.warn('The structure has validity issues');

  if (!structure.isConsistant()) {
    console.error('Consistency problem detected');
  }

  if (!structure.isComplete()) {
    console.warn('The structure is incomplete');
  }
}
```

## Data Representations

Structures provide different representations for display and export:

### Nested representations

```typescript
// Nested representation (Structure - Childs)
const nestedV1 = structure.nestedv1();

// Nested representation (Structure - Childs - Nodes)
const nestedV2 = structure.nestedv2();

console.log('Structure with direct children:', nestedV1);
console.log('Structure with children and their nodes:', nestedV2);
```

### Flattened representations

```typescript
// Flattened representation (Structure - Childs)
const flatV1 = structure.flatv1();

// Flattened representation (Structure - Childs - Nodes)
const flatV2 = structure.flatv2();

console.log('Flattened structure with children:', flatV1);
console.log('Complete flattened structure:', flatV2);
```

## Advanced Usage Examples

### Hierarchical folder structure

```typescript
// STEP 1: Create a folder structure
const [folderOp, rootFolder] = vpi.addStructure({
  type: 'structure',
  name: 'Document Project'
});

// STEP 2: Add metadata
let folderMetaContainer = {
  id: crypto.randomUUID(),
  token: rootFolder.token,
  meta: {
    description: 'Project root structure',
    path: [],
    ref_extern: '',
    external: null,
    type: 'file', // Type of linked nodes
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [folderMetaOp, folderMetadata] = vpi.addMetadata(folderMetaContainer);

// Add sub-structures (structure_child pointing to a structure)
const [subStructureOp, subStructure] = rootFolder.addNode({
  type: 'structure_child',
  name: 'Technical Documentation',
  child: '1', // Hierarchical position
  meta: null // structure_child don't have metadata
  // Can be linked via HAS_LINK to an existing structure
});

// To add documents, you need to retrieve the real linked structure
// then add structure_child to that structure
// (conceptual example - subStructure is now a structure_child)
```

### Workflow structure

```typescript
// STEP 1: Create a workflow structure
const [workflowOp, workflow] = vpi.addStructure({
  type: 'structure',
  name: 'Validation Process'
});

// STEP 2: Add metadata
let workflowMetaContainer = {
  id: crypto.randomUUID(),
  token: workflow.token,
  meta: {
    description: 'Validation process structure',
    path: [],
    ref_extern: '',
    external: null,
    type: 'work', // Type of linked nodes
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [workflowMetaOp, workflowMetadata] = vpi.addMetadata(workflowMetaContainer);

// Add workflow steps
workflow.addNode({
  type: 'structure_child',
  name: 'Draft',
  child: '1', // First step
  meta: null // structure_child don't have metadata
  // Can be linked via HAS_LINK to a node of type workflow.meta.type
});

workflow.addNode({
  type: 'structure_child',
  name: 'Review',
  child: '2', // Second step
  meta: null // structure_child don't have metadata
  // Can be linked via HAS_LINK to a node of type workflow.meta.type
});
```

## Properties Inherited from Nodes

Structures inherit all node functionalities:

```typescript
// Metadata management
const metadata = structure.getMetadata();
structure.setMetadata({
  ...metadata,
  structureType: 'hierarchical',
  lastOrganized: new Date().toISOString()
});

// Relationship management
const incomingRelations = structure.inRelationships;
const outgoingRelations = structure.outRelationships;

// Link creation
structure.linkTo(otherStructure.token);
structure.linkFor(parentProject.token);

// Properties
const flatRepresentation = structure.flat;
const structureSchema = structure.schema;
```

## Operations Summary

- **Creation (addStructure)**: Adds a new structure to the project
- **Reading (getStructureByToken, hasStructure, queryStructureAll)**: Different methods to retrieve and search structures
- **Update (setStructure, structure.update)**: Modifies properties of an existing structure
- **Deletion (deleteStructure, structure.delete)**: Removes a structure from the project
- **Child management (addNode, setNode, hasNode, deleteNode, queryNodeAll, getChildByToken)**: Methods to manage child nodes
- **Validation (isConsistant, isComplete, isCorrect)**: Methods to validate structure integrity
- **Representations (nestedv1, nestedv2, flatv1, flatv2)**: Different ways to get a representation of the structure

These operations allow you to create and manage complex structures in a VNV project, offering hierarchical data organization with validation and multiple representations.
