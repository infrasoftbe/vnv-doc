---
title: "VPI Guide"
description: "How to work with a VNV project and its Fragments."
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

# How to work with a VNV project and its Fragments

A **Project DUMP** comes directly from the database and contains all data for a VNV project in JSON format.

A **VPI** (Virtual Project Interface) is a virtual project interface that works with **Fragments** - atomic data units allowing interaction with the project in a simplified and structured manner.

## Project DUMP and VPI: What are the differences?

- A **Project DUMP** is a raw JSON file where nodes and their metadata are integrated, except in the case of DUMPs where there is also separation.
- A **VPI** is built from a DUMP and maintains a **strict separation** between Node Fragments and their MetaContainers, allowing more fine-grained and structured management.

The VPI effectively encapsulates a node's metadata in a **MetaContainer** that has a reference to the owner node.

### Fragment Architecture

The VPI works exclusively with **Fragments**:
- **Everything is a "node"** in the VPI (`data.nodes`, `data.structures`, `data.lists`)
- **EXCEPT** children which are **virtual nodes** present in `(structure|list).metadata.children` and therefore **do not have their own metadata**

The VPI also offers search, add, update, and delete data features. It uses a difference calculation system (diff) between operations that execute in the VPI, enabling modification history management as well as a possible undo/redo system.

These differences are used to apply changes made in a VPI to the project stored in the database.

## Using a VPI

The VPI is instantiated with the `VPI` package from the `@infrasoftbe/vnv-sdk` SDK.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

const JSONDump = /* your JSON dump */;

const vpi = vnv.VPI.ProjectInstance.init(JSONDump);
```

Once instantiated, the VPI is ready to be used for all project operations.

## Data Types Contained in the DUMP

The dump is a key-value object containing several main fields:

- **`self`**: Contains the project information itself as well as its metadata
- **`data.nodes`**: Contains the project nodes
- **`data.relations`**: Contains relationships between project nodes
- **`data.metas`**: Contains metadata for nodes, structures, and lists
- **`data.structures`**: Contains project structures
- **`data.lists`**: Contains project lists

## Data Types Contained in the VPI

The VPI contains the same data sets as the JSON DUMP, except that it adds utilities to facilitate interactions. It also modifies certain data types, such as arrays that are replaced by Maps, allowing direct access rather than searches on data sets.

This optimization significantly improves performance when manipulating large volumes of data.

## VPI Features with Fragments

A VPI offers numerous features to manage a VNV project based on Fragment architecture:

### Token management
- **Unified token calculation**: Automatic generation of unique identifiers
- **Token validation**: Verification of identifier validity

### Event management
- `vpi.emit()`: Emits an event
- `vpi.on()`: Listens to an event

### Node Fragment Management (2-step process)
- `vpi.addNode()`: Adds a **Node Fragment** (step 1)
- `vpi.addMetadata(metaContainer)`: Adds the **MetaContainer** via IMetaContainer object (step 2)
- `vpi.setNode()`: Updates the Node Fragment
- `vpi.setMetadata(metaContainer)`: Updates the MetaContainer via IMetaContainer object
- `vpi.hasNode()`: Checks the existence of a Node Fragment
- `vpi.deleteNode()`: Deletes a Node Fragment and its MetaContainer
- `vpi.getNodeByToken()`: Retrieves a Node Fragment by its token
- `vpi.getMetadataByNodeToken()`: Retrieves the MetaContainer of a node
- `vpi.queryNodeAll()`: Searches all Node Fragments
- `vpi.getNodesByType()`: Retrieves Node Fragments by type

### Relationship management
- `vpi.addRelation()`: Adds a new relationship
- `vpi.setRelation()`: Updates an existing relationship
- `vpi.hasRelation()`: Checks relationship existence
- `vpi.deleteRelation()`: Deletes a relationship
- `vpi.getRelationByToken()`: Retrieves a relationship by its token
- `vpi.queryRelationAll()`: Searches all relationships
- `vpi.getRelationFromNodeToken()`: Retrieves relationships from a node
- `vpi.getRelationToToken()`: Retrieves relationships to a node

### MetaContainer Management
- `vpi.addMetadata(metaContainer)`: Adds a MetaContainer via IMetaContainer object
- `vpi.setMetadata(metaContainer)`: Updates a MetaContainer via IMetaContainer object
- `vpi.hasMetadata()`: Checks MetaContainer existence
- `vpi.deleteMetadata()`: Deletes a MetaContainer
- `vpi.getMetadataByToken()`: Retrieves a MetaContainer by token
- `vpi.queryMetadataAll()`: Searches all MetaContainers

### Structure Fragment Management (with virtual children)
- `vpi.addStructure()`: Adds a Structure Fragment (step 1)
- `vpi.addMetadata(metaContainer)`: Adds virtual children via IMetaContainer object (step 2)
- `vpi.setStructure()`: Updates an existing structure
- `vpi.hasStructure()`: Checks structure existence
- `vpi.deleteStructure()`: Deletes a structure
- `vpi.getStructureByToken()`: Retrieves a structure by its token
- `vpi.queryStructureAll()`: Searches all structures

### List Fragment Management (with ordered virtual children)
- `vpi.addList()`: Adds a List Fragment (step 1)
- `vpi.addMetadata(metaContainer)`: Adds ordered virtual children via IMetaContainer object (step 2)
- `vpi.setList()`: Updates an existing list
- `vpi.hasList()`: Checks list existence
- `vpi.deleteList()`: Deletes a list
- `vpi.getListBytoken()`: Retrieves a list by its token
- `vpi.queryListAll()`: Searches all lists

### Useful properties
- `vpi.nodeTypeList`: Returns an array of possible node types in the project
- `vpi.relationTypeList`: Returns an array of possible link types in the project
- `vpi.projectToken`: Project token contained in the `self.token` field
- `vpi.json`: JSON expression of the VPI
- `vpi.findNodeByToken`: Allows searching for a node by its token in the project's `nodes`, `lists`, `structures`, or `childs`

### Utilities
- `vpi.ensureInstance`: Ensures an instance is valid
- `vpi.createAvailableToken`: Creates an available token
- `vpi.isAvailableToken`: Checks token availability

### Node Features

A node within a VPI is not simply an object, but an instance of the `Node` class, which means it also has utilities allowing it to interact as a node in the project.

#### Metadata management
- `node.getMetadata()`: Retrieves node metadata
- `node.setMetadata()`: Sets node metadata

#### Relationship management
- `node.inRelationships`: Incoming relationships to this node
- `node.outRelationships`: Outgoing relationships from this node
- `node.fromRelationships`: Relationships originating from this node
- `node.forRelationships`: Relationships destined for this node

#### Linked node management
- `node.inNodes`: Connected nodes in input
- `node.outNodes`: Connected nodes in output
- `node.fromNodes`: Source nodes
- `node.forNodes`: Destination nodes

#### Node operations
- `node.update()`: Updates the node
- `node.delete()`: Deletes the node
- `node.linkTo()`: Creates a link to another node of type `HAS_...`
- `node.linkFor()`: Creates a link to another node of type `IS_..._FOR_...`

#### Properties
- `node.flat`: Flattened representation of the node
- `node.schema`: Node schema

### Structure Features

A structure within a VPI is also an instance of the `Node` class that has been extended by the `Structure` class. This means the structure has the same utilities as the node, plus the following specific functionalities:

#### Child node management
- `structure.addNode()`: Adds a child node to the structure
- `structure.setNode()`: Updates a child node
- `structure.hasNode()`: Checks child node existence
- `structure.deleteNode()`: Deletes a child node
- `structure.queryNodeAll()`: Searches all child nodes
- `structure.getChildByToken()`: Retrieves a child by its token

#### Structure validation
- `structure.isConsistant()`: Checks structure consistency
- `structure.isComplete()`: Checks if the structure is complete
- `structure.isCorrect()`: Checks structure validity

#### Data representations
- `structure.nestedv1()`: Nested representation (Structure - Childs)
- `structure.nestedv2()`: Nested representation (Structure - Childs - Nodes)
- `structure.flatv1()`: Flattened representation (Structure - Childs)
- `structure.flatv2()`: Flattened representation (Structure - Childs - Nodes)

### List Features

A list within a VPI is an instance of the `List` class that inherits from the `Structure` class. This means it has the same utilities as the structure, with specific optimizations for managing ordered collections of elements.

### CRUD, Transactions, and Operations

All operations are stored in `vpi.operations`. An operation represents a transaction between two data states for a given element, with difference calculation on modified fields. Values are stored as `key: [oldValue, newValue]`, allowing tracking of each modification.

#### Operation structure

An operation is structured as follows:

- **`operation._id`**: Internal operation identifier
- **`operation.eventTime`**: Internal operation timestamp
- **`operation.method`**: CRUD method associated with the operation (POST, UPDATE, DELETE)
- **`operation.data`**: Operation data
- **`operation.operationtype`**: Type of element associated with the operation (node, relation, structure, etc.)
- **`operation.operationId`**: Idempotent operation identifier, ensuring operation uniqueness over time
- **`operation.ref`**: Internal reference to the element modified by the operation
- **`operation.delta`**: Modification delta (differences between old and new state)

#### Advantages of the operation system

This system offers several advantages:

1. **Complete traceability**: Each modification is recorded with its context
2. **Synchronization**: Deltas allow efficient synchronization with the database
3. **Undo/Redo**: Possibility to implement undo/redo functionalities
4. **Audit**: Complete modification history for auditing and debugging
5. **Performance**: Only differences are transmitted during synchronization
