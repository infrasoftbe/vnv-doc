---
title: "Lists CRUD"
weight: 2309
---
# Lists CRUD

This guide explains how to perform CRUD (Create, Read, Update, Delete) operations on lists in a VNV project using the VPI.

## What is a List?

A list within a VPI is an instance of the `_list` class that inherits from the `_structure` class. This means it has the same utilities as the structure, with specific optimizations for managing ordered collections of elements.

### Structure Inheritance

Lists inherit all structure functionalities:

**Methods inherited from Structure:**

- **Navigation**: `forNodes`, `fromNodes`, `inNodes`, `outNodes`
- **Relationships**: `forRelationships`, `fromRelationships`, `inRelationships`, `outRelationships`
- **Link methods**: `linkFor`, `linkFrom`, `linkTo`
- **Child management**: `deleteNode`, `hasNode`, `getChildByToken`, `queryNodeAll`
- **Output formats**: `flatv1`, `flatv2`, `nestedv1`, `nestedv2`
- **Metadata**: `getMetadata`, `setMetadata`, `setMetaDataKey`
- **Others**: `delete`, `update`, `flat`, `json`, `shema`

**Specialized methods for List:**

- `addNode`: Adds an element of type `IListChild` (override of Structure)
- `setNode`: Modifies an `IListChild` element (override of Structure)
- `constructor`: Uses `IListInitOptions` instead of `IStructureInitOptions`

## Adding a List (Create)

To add a list to a project, follow this 2-step process:

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Project initialization
let vpi = vnv.VPI.ProjectInstance.init({/* your project */});

// STEP 1: Add the list fragment
let [operation, list] = vpi.addList({
  type: 'list', // <-- !REQUIRED!
  name: 'My task list' // <-- !REQUIRED!
});

// STEP 2: Add metadata with organizational children
let listMetaContainer = {
  id: crypto.randomUUID(),
  token: list.token,
  meta: {
    description: 'List of tasks to accomplish for the project',
    path: [],
    ref_extern: '',
    external: null,
    type: 'work', // <-- !REQUIRED!
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [metaOperation, metadata] = vpi.addMetadata(listMetaContainer);
```

### Code Explanation

- `vpi.addList(...)`: Adds a new list to the project (Step 1). This method returns an array containing:
  - `operation`: The operation associated with adding the list.
  - `list`: The list that was added.
- `vpi.addMetadata(...)`: Adds metadata to the list (Step 2).

{{< callout context="tip" title="HAS_LINK Relations and Children" icon="outline/rocket" >}}
**Important:** The `child` field in `list_child` indicates the **position** in the list (e.g., "1", "2", "3"), **NOT** the target node token.

The connection to real nodes is made via **HAS_LINK relationships** stored in `vpi.data.relations`:

- **Source**: the `list_child` (structure_child for structures)
- **Target**: a node whose `type` corresponds to `list.meta.type`
- **Relationship type**: `"HAS_LINK"`
- **Constraint**: Links are only possible between children and nodes of the correct type

Example:

```typescript
// If list.meta.type = 'task'
// Then this list_child can ONLY be linked to nodes of type 'task'
// Possible relationship: FROM: list_child.token -> TO: task_node.token (type: "HAS_LINK")
// Impossible relationship: FROM: list_child.token -> TO: file_node.token
```
{{< /callout >}}

## Reading a List (Read)

To retrieve an existing list, several methods are available:

```typescript
// Retrieve a list by its token
const list = vpi.getListBytoken('list-token');

// Check list existence
const exists = vpi.hasList('list-token');

// Search all lists with criteria
const searchResults = vpi.queryListAll({ type: 'list' });

// Search for a list in all collections
const foundList = vpi.findNodeByToken('list-token');
```

## Updating a List (Update)

To update an existing list, use the `setList` method:

```typescript
// Update an existing list
let [operation, updatedList] = vpi.setList(list.token, {
  name: 'Modified list',
  metadata: {
    description: 'Updated description',
    path: [],
    ref_extern: '',
    external: null
  }
});

// Alternative: use the list's update method
const updateOperation = list.update({
  name: 'New name via list'
});
```

## Deleting a List (Delete)

To delete a list, use the `deleteList` method:

```typescript
// Delete a list
let operation = vpi.deleteList('list-token');

// Alternative: direct deletion via list
const deleteOperation = list.delete();
```

## Managing List Elements

{{< callout context="tip" title="Important Distinction: Real Nodes vs List Children" icon="outline/rocket" >}}
**DO NOT CONFUSE**:
- **Real nodes**: Created with `vpi.addNode({ type: 'task' })` - have complete metadata
- **List Children**: Created with `list.addNode({ type: 'list_child' })` - virtual references WITHOUT metadata

**When to use what**:
- `vpi.addNode()` → To create a real business node (task, file, contact...)
- `list.addNode({ type: 'list_child' })` → To reference/organize existing nodes in the list
{{< /callout >}}

Lists inherit all structure methods to manage their elements (list_child):

### Adding an element to the list

```typescript
// Add an element to the list (IListChild)
const [itemOp, listItem] = list.addNode({
  type: 'list_child',
  name: 'New task',
  child: '1', // Position in the list (1, 2, 3...)
  meta: null
});
```

{{< callout context="note" title="List Element Architecture" icon="outline/info-circle" >}}
List elements (`IListChild`) are ordered **virtual references** that **can be linked** to real nodes via `HAS_LINK` relationships in `vpi.data.relations`.

- `type: 'list_child'`: Type specific to list elements
- `child: '1'`: **Position** in the ordered list (1, 2, 3...)
- `name`: Display name in the list
- `meta: null`: List elements don't have their own metadata
- **Link constraint**: If `list.meta.type = "file"`, then this `list_child` can only be linked (via HAS_LINK) to a node of type `"file"`
{{< /callout >}}

### Updating a list element

```typescript
// Update a list element (IListChild)
const [updateItemOp, updatedItem] = list.setNode({
  ...listItem,
  name: 'Modified task',
  child: '2' // New position in the list
});
```

### Checking element existence

```typescript
// Check if an element is in the list
const hasItem = list.hasNode(listItem.token);
```

### Deleting an element from the list

```typescript
// Delete an element from the list
const deleteItemOp = list.deleteNode(listItem.token);
```

### Searching in elements

```typescript
// Search all list elements
const workResults = list.queryNodeAll({ type: 'work' });

// Retrieve an element by its token
const item = list.getChildByToken('item-token');

// Search by specific properties
const specificWork = list.queryNodeAll({
  type: 'work',
  name: 'Urgent task'
});
```

## Common List Types

### Task list

```typescript
// STEP 1: Create the list fragment
const [workListOp, workList] = vpi.addList({
  type: 'list',
  name: 'Sprint Backlog'
});

// STEP 2: Add metadata
let workListMetaContainer = {
  id: crypto.randomUUID(),
  token: workList.token,
  meta: {
    description: 'List of work to be done',
    path: [],
    ref_extern: '',
    external: null,
    type: 'task',
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [workMetaOp, workMetadata] = vpi.addMetadata(workListMetaContainer);

// Add references to work items (IListChild)
workList.addNode({
  type: 'list_child',
  name: 'Implement authentication',
  child: '1', // Position 1 in the list
  meta: null
  // Can be linked via HAS_LINK to a node of type 'task'
});
```

### File list

```typescript
// STEP 1: Create the list fragment
const [fileListOp, fileList] = vpi.addList({
  type: 'list',
  name: 'Project Documents'
});

// STEP 2: Add metadata
let fileListMetaContainer = {
  id: crypto.randomUUID(),
  token: fileList.token,
  meta: {
    description: 'List of project files',
    path: [],
    ref_extern: '',
    external: null,
    type: 'file',
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [fileMetaOp, fileMetadata] = vpi.addMetadata(fileListMetaContainer);

// Add references to files (IListChild)
fileList.addNode({
  type: 'list_child',
  name: 'specification.pdf',
  child: '1', // Position 1 in the list
  meta: null
  // Can be linked via HAS_LINK to a node of type 'file'
});
```

### Contact list

```typescript
// STEP 1: Create the list fragment
const [contactListOp, contactList] = vpi.addList({
  type: 'list',
  name: 'Project Team'
});

// STEP 2: Add metadata
let contactListMetaContainer = {
  id: crypto.randomUUID(),
  token: contactList.token,
  meta: {
    description: 'List of project team contacts',
    path: [],
    ref_extern: '',
    external: null,
    type: 'contact',
    children: []
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [contactMetaOp, contactMetadata] = vpi.addMetadata(contactListMetaContainer);

// Add references to contacts (IListChild)
contactList.addNode({
  type: 'list_child',
  name: 'John Doe',
  child: '1', // Position 1 in the list
  meta: null
  // Can be linked via HAS_LINK to a node of type 'contact'
});
```

## List-Specific Features

### Order management

```typescript
// Reorder list elements
const reorderOperation = list.reorderItems([
  'item-1-token',
  'item-3-token',
  'item-2-token'
]);

// Move an element to a specific position
const moveOperation = list.moveItemToPosition('item-token', 2);
```

### Automatic sorting

```typescript
// Configure automatic sorting
list.update({
  properties: {
    ...list.properties,
    autoSort: true,
    sortBy: 'dueDate',
    sortOrder: 'ascending'
  }
});

// Apply sorting
const sortOperation = list.applySort();
```

### Filtering

```typescript
// Configure default filters
list.update({
  properties: {
    ...list.properties,
    defaultFilters: {
      status: ['active', 'pending'],
      priority: ['high', 'medium']
    }
  }
});

// Apply filters
const filteredItems = list.queryNodeAll({
  status: 'active',
  assignee: 'user-123'
});
```

## List Validation

Lists inherit structure validation methods:

```typescript
// Check list consistency
const isConsistent = list.isConsistant();

// Check if the list is complete
const isComplete = list.isComplete();

// Check list validity
const isCorrect = list.isCorrect();
```

## List Representations

Lists provide the same representations as structures:

```typescript
// Nested representations
const nestedV1 = list.nestedv1(); // List - Elements
const nestedV2 = list.nestedv2(); // List - Elements - Details

// Flattened representations
const flatV1 = list.flatv1(); // Flattened list with elements
const flatV2 = list.flatv2(); // Complete flattened list
```

## List Metadata

```typescript
// Add list-specific metadata
list.setMetadata({
  statistics: {
    totalItems: list.queryNodeAll().length,
    completedItems: list.queryNodeAll({ status: 'completed' }).length,
    averageProcessingTime: '2.5 days'
  },
  configuration: {
    autoArchive: true,
    archiveAfterDays: 30,
    notifications: ['item-added', 'item-completed']
  },
  lastUpdated: new Date().toISOString()
});
```

## Operations Summary

- **Creation (addList)**: Adds a new list to the project
- **Reading (getListBytoken, hasList, queryListAll)**: Different methods to retrieve and search for lists
- **Update (setList, list.update)**: Modifies properties of an existing list
- **Deletion (deleteList, list.delete)**: Removes a list from the project
- **Element management**: All methods inherited from structures to manage elements
- **Specific features**: Sorting, filtering, element reorganization
- **Validation**: Inherited methods plus list-specific validations
- **Representations**: Ordered views and representations inherited from structures

Lists offer advanced management of ordered element collections, with specific features for sorting, filtering, and order validation, while inheriting the power of structures for hierarchical organization.
