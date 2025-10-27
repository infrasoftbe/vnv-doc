---
title: "Node CRUD with Fragments"
weight: 2305
---
# Node CRUD with Fragments

This guide explains how to perform CRUD (Create, Read, Update, Delete) operations on **Node Fragments** in a VNV project using the VPI.

## Node Fragment Architecture

The VPI works with **Fragments** - atomic data units. A node within a VPI is not simply an object, but an instance of the `Node` class that has utilities allowing it to interact as a node in the project.

### Node/Metadata Separation

The VPI maintains a clear separation between:

- **Node Fragment**: The basic entity (ID, name, type, token)
- **MetaContainer**: Encapsulates metadata with a reference to the owner node

## Adding a Node (Create) - 2-Step Process

Node creation is done in **2 distinct steps**: `addNode()` then `addMetadata()`.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Project initialization
let vpi = vnv.VPI.ProjectInstance.init({/* your project */});

// STEP 1: Add the node fragment
let [operation, node] = vpi.addNode({
  type: 'file',
  name: 'My new document'
});

// STEP 2: Add metadata via MetaContainer
let metaContainer = {
  id: crypto.randomUUID(),
  token: node.token,
  meta: {
    description: 'Document content',
    path: [],
    category: 'Documentation',
    tags: ['important', 'project']
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
let [metaOperation, metadata] = vpi.addMetadata(metaContainer);
```

### Code Explanation

- `ProjectInstance.init(...)`: Initializes a project by returning a ProxyProjectInstance that allows simplified access to all project layers.
- `vpi.addNode(...)`: Creates the basic **Node Fragment**. This method returns an array containing two elements:
  - `operation`: The operation associated with adding the node.
  - `node`: The node fragment that was added.
- `vpi.addMetadata(metaContainer)`: Creates the **MetaContainer** associated with the node. Takes a complete IMetaContainer object with id, token, meta, create_dt, update_dt.

### Why 2 steps?

This separation allows:

- Independent validation of the node and its metadata
- Flexible MetaContainer management
- Clear architecture between entity and properties

## Reading a Node (Read)

To retrieve an existing node and its metadata, several methods are available:

```typescript
// Retrieve a node fragment by its token
const node = vpi.getNodeByToken('node-token');

// Retrieve metadata associated with the node
const nodeMetadata = vpi.getMetadataByNodeToken('node-token');

// Check node existence
const exists = vpi.hasNode('node-token');

// Retrieve all nodes of a specific type
const fileNodes = vpi.getNodesByType('file');

// Search all nodes with criteria
const searchResults = vpi.queryNodeAll({ type: 'file' });

// Search for a node in all collections (nodes, lists, structures, childs)
const foundNode = vpi.findNodeByToken('any-token');
```

## Updating a Node (Update)

To update a node fragment and its metadata, you can act on each component separately.

```typescript
// Update the node fragment itself
let [operation, updatedNode] = vpi.dataManager.setNode({
  ...node,
  name: 'Modified name'
});

// Update metadata via MetaContainer
let updatedMetaContainer = {
  ...metadata, // retrieve existing metadata object
  meta: {
    ...metadata.meta, // keep existing metadata
    description: 'New content',
    category: 'Updated Documentation',
    tags: ['modified', 'important']
  },
  update_dt: Date.now()
};
let [metaOperation, updatedMetadata] = vpi.setMetadata(updatedMetaContainer);

// Alternative: use the node's update method directly
const updateOperation = node.update({
  name: 'Modified name via node'
});
```

### Code Explanation

- `vpi.setNode(node.token, updatedProperties)`: Updates the **Node Fragment** identified by `node.token`. This method returns the operation performed and the updated fragment.
- `vpi.setMetadata(metaContainer)`: Updates the **MetaContainer** associated with the node. Takes a complete updated IMetaContainer object.
- `node.update(...)`: Direct method on the node instance to update it.

## Deleting a Node (Delete)

To delete a node, use the `deleteNode` method by specifying the identifier of the node to delete.

```typescript
// Delete a node via the project
let operation = vpi.deleteNode(node.token);

// Alternative: direct deletion via the node
const deleteOperation = node.delete();
```

### Code Explanation

- `vpi.deleteNode(node.token)`: Deletes the node identified by `node.token` from the project. This method returns the operation associated with the deletion.
- `node.delete()`: Direct method on the node instance to delete it.

## Advanced Node Features

### Metadata Management

```typescript
// Retrieve node metadata
const metadata = node.getMetadata();

// Set node metadata
node.setMetadata({
  description: 'Node description',
  tags: ['important', 'document']
});
```

### Relationship Management

```typescript
// Incoming relationships to this node
const incomingRelations = node.inRelationships;

// Outgoing relationships from this node
const outgoingRelations = node.outRelationships;

// Relationships originating from this node
const fromRelations = node.fromRelationships;

// Relationships destined for this node
const forRelations = node.forRelationships;
```

### Linked Node Management

```typescript
// Connected nodes in input
const incomingNodes = node.inNodes;

// Connected nodes in output
const outgoingNodes = node.outNodes;

// Source nodes
const sourceNodes = node.fromNodes;

// Destination nodes
const destinationNodes = node.forNodes;
```

### Link Creation

```typescript
// Create a link to another node of type HAS_...
node.linkTo(otherNode.token);

// Create a link to another node of type IS_..._FOR_...
node.linkFor(otherNode.token);
```

### Node Properties

```typescript
// Flattened representation of the node
const flatRepresentation = node.flat;

// Node schema
const nodeSchema = node.schema;
```

## Operations Summary

- **Creation (addNode)**: Adds a new node to the project and returns both the operation and the created node.
- **Reading (getNodeByToken, hasNode, getNodesByType, queryNodeAll)**: Different methods to retrieve and search for nodes.
- **Update (setNode, node.update)**: Modifies properties of an existing node and returns the operation and updated node.
- **Deletion (deleteNode, node.delete)**: Removes a node from the project and returns the associated operation.

These operations allow you to efficiently manipulate nodes in a VNV project, using the functionalities exposed by the ProxyProjectInstance to directly access different project layers.
