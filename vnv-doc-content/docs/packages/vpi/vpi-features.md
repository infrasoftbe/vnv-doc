---
title: "Features"
weight: 2303
---
# VPI Features

A VPI offers numerous features to manage a VNV project efficiently and in a structured manner.

## Token Management

The VPI provides utilities for managing unique identifiers:

- **Unified token calculation**: Automatic generation of unique identifiers
- **Token validation**: Verification of identifier validity

```typescript
// Create an available token
const newToken = vpi.createAvailableToken();

// Check token availability
const isAvailable = vpi.isAvailableToken('my-token');
```

## Event Management

The VPI supports an event system to react to changes:

```typescript
// Listen to an event
vpi.on('nodeAdded', (event) => {
  console.log('New node added:', event.node);
});

// Emit an event
vpi.emit('customEvent', { data: 'example' });
```

## Node Fragment Management

### Fragment Architecture

The VPI works with **Fragments** - atomic data units. Everything is a "node" in the VPI (even though there are `data.nodes`, `data.structures`, `data.lists`) **EXCEPT** children which are virtual nodes present in `(structure|list).metadata.children` and therefore do not have their own metadata.

### Node/Metadata Separation

The VPI maintains a clear separation between nodes and their metadata:

- **Node**: The basic entity with ID, name, type, token
- **MetaContainer**: Encapsulates a node's metadata with a reference to the owner node

### 2-Step Creation Process

```typescript
// 1. Create the node fragment (addNode)
const [operation, node] = vpi.addNode({
  type: 'file',
  name: 'My document'
});

// 2. Add metadata (addMetadata)
const metaContainer = {
  id: crypto.randomUUID(),
  token: node.token,
  meta: {
    description: 'Document description',
    category: 'Documentation',
    tags: ['important', 'project']
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
const [metaOp, metadata] = vpi.addMetadata(metaContainer);

// Update an existing node
const [updateOp, updatedNode] = vpi.dataManager.setNode({
  ...node,
  name: 'Modified name'
});

// Check node existence
const exists = vpi.hasNode('node-token');

// Delete a node
const deleteOp = vpi.deleteNode('node-token');

// Retrieve a node by its token
const retrievedNode = vpi.getNodeByToken('node-token');

// Search all nodes
const searchResults = vpi.queryNodeAll({ type: 'file' });

// Get nodes by type
const fileNodes = vpi.getNodesByType('file');
```

## Relationship Management

### CRUD Operations on Relationships

```typescript
// Add a new relationship
const [relationOp, relation] = vpi.addRelation({
  f_id: crypto.randomUUID(),
  f_token: 'node1-token',
  t_id: crypto.randomUUID(),
  t_token: 'node2-token',
  r_type: 'HAS_FILE',
  create_dt: Date.now(),
  update_dt: Date.now()
});

// Update an existing relationship
const [updateRelOp, updatedRel] = vpi.setRelation({
  ...relation, // Keep all existing properties
  r_type: 'HAS_LINK',
  update_dt: Date.now()
});

// Check relationship existence
const relationExists = vpi.hasRelation('relation-token');

// Delete a relationship
const deleteRelOp = vpi.deleteRelation('relation-token');

// Retrieve a relationship by its token
const retrievedRelation = vpi.getRelationByToken('relation-token');

// Search all relationships
const relationResults = vpi.queryRelationAll({ r_type: 'HAS_FILE' });

// Get relationships from a node
const outgoingRels = vpi.getRelationFromNodeToken('node-token');

// Get relationships to a node
const incomingRels = vpi.getRelationToToken('node-token');
```

## MetaContainer Management

### Metadata vs MetaContainer Distinction

The VPI encapsulates a node's metadata in a **MetaContainer** that has a reference to the owner node. This separation allows:

- Independent metadata management
- Clear reference to the owner node
- Separate data validation

### CRUD Operations on Metadata

```typescript
// Add metadata via MetaContainer
const nodeMetaContainer = {
  id: crypto.randomUUID(),
  token: nodeToken,
  meta: {
    description: 'Node description',
    category: 'Documentation',
    tags: ['important'],
    author: 'John Doe'
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
const [metaOp, metadata] = vpi.addMetadata(nodeMetaContainer);

// Update metadata
const updatedMetaContainer = {
  ...metadata,
  meta: {
    ...metadata.meta,
    description: 'New description',
    modifiedBy: 'Jane Smith'
  },
  update_dt: Date.now()
};
const [updateMetaOp, updatedMeta] = vpi.setMetadata(updatedMetaContainer);

// Check metadata existence
const metaExists = vpi.hasMetadata('metadata-token');

// Delete metadata
const deleteMetaOp = vpi.deleteMetadata('metadata-token');

// Retrieve metadata by token
const retrievedMeta = vpi.getMetadataByToken('metadata-token');

// Search all metadata
const metaResults = vpi.queryMetadataAll({ type: 'description' });

// Get metadata for a specific node
const nodeMetadata = vpi.getMetadataByNodeToken('node-token');
```

## Structure Fragment Management

### Structures with Virtual Children

Structures are real nodes in the VPI, but their **children** are virtual references stored in `structure.metadata.children`. These children:

- Do **not** have their own metadata
- Are pointers to other real nodes
- Allow hierarchical organization

### CRUD Operations on Structures

```typescript
// 1. Create the structure fragment
const [structOp, structure] = vpi.addStructure({
  type: 'structure',
  name: 'My folder'
});

// 2. Add metadata with virtual children
const structMetaContainer = {
  id: crypto.randomUUID(),
  token: structure.token,
  meta: {
    description: 'Main folder',
    children: [
      {
        child: '1', // Hierarchical position
        id: 'structure-child-1',
        meta: null,
        name: 'Node 1',
        token: 'node1-token',
        type: 'structure_child'
        // Can be linked via HAS_LINK to a node of type structure.meta.type
      },
      {
        child: '1.1', // Child of '1'
        id: 'structure-child-2',
        meta: null,
        name: 'Node 2',
        token: 'node2-token',
        type: 'structure_child'
        // Can be linked via HAS_LINK to a node of type structure.meta.type
      }
    ]
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
const [metaOp, structMeta] = vpi.addMetadata(structMetaContainer);

// Update an existing structure
const [updateStructOp, updatedStruct] = vpi.setStructure(structure.token, {
  name: 'Renamed folder'
});

// Check structure existence
const structExists = vpi.hasStructure('structure-token');

// Delete a structure
const deleteStructOp = vpi.deleteStructure('structure-token');

// Retrieve a structure by its token
const retrievedStruct = vpi.getStructureByToken('structure-token');

// Search all structures
const structResults = vpi.queryStructureAll({ type: 'structure' });
```

## List Fragment Management

### Lists with Virtual Children

Like structures, lists are real nodes in the VPI, but their **children** are virtual references stored in `list.metadata.children`. This architecture allows flexible management of ordered collections.

### CRUD Operations on Lists

```typescript
// 1. Create the list fragment
const [listOp, list] = vpi.addList({
  type: 'list',
  name: 'My task list'
});

// 2. Add metadata with ordered virtual children
const listMetaContainer = {
  id: crypto.randomUUID(),
  token: list.token,
  meta: {
    description: 'Priority task list',
    children: [
      {
        child: '1', // Position 1 in the list
        id: 'list-child-1',
        meta: null,
        name: 'Task 1',
        token: 'task1-token',
        type: 'list_child'
        // Can be linked via HAS_LINK to a node of type list.meta.type
      },
      {
        child: '2', // Position 2 in the list
        id: 'list-child-2',
        meta: null,
        name: 'Task 2',
        token: 'task2-token',
        type: 'list_child'
        // Can be linked via HAS_LINK to a node of type list.meta.type
      },
      {
        child: '3', // Position 3 in the list
        id: 'list-child-3',
        meta: null,
        name: 'Task 3',
        token: 'task3-token',
        type: 'list_child'
        // Can be linked via HAS_LINK to a node of type list.meta.type
      }
    ]
  },
  create_dt: Date.now(),
  update_dt: Date.now()
};
const [metaOp, listMeta] = vpi.addMetadata(listMetaContainer);

// Update an existing list
const [updateListOp, updatedList] = vpi.setList(list.token, {
  name: 'Modified list'
});

// Check list existence
const listExists = vpi.hasList('list-token');

// Delete a list
const deleteListOp = vpi.deleteList('list-token');

// Retrieve a list by its token
const retrievedList = vpi.getListBytoken('list-token');

// Search all lists
const listResults = vpi.queryListAll({ type: 'list' });
```

## Useful Properties

The VPI exposes several practical properties:

```typescript
// Possible node types in the project
const nodeTypes = vpi.nodeTypeList;

// Possible relationship types in the project
const relationTypes = vpi.relationTypeList;

// Project token
const projectToken = vpi.projectToken;

// JSON expression of the VPI
const jsonRepresentation = vpi.json;

// Search for a node by token in all collections
const foundNode = vpi.findNodeByToken('any-token');
```

## Utilities

### Instance and Token Management

```typescript
// Ensure an instance is valid
vpi.ensureInstance(someObject);

// Create an available token
const availableToken = vpi.createAvailableToken();

// Check token availability
const isTokenAvailable = vpi.isAvailableToken('proposed-token');
```

These VPI features enable complete and efficient management of VNV projects, with an integrated traceability system and optimized performance.
