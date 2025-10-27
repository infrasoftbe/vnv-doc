---
title: "Relations CRUD"
weight: 2307
---
# Relations CRUD

This guide explains how to perform CRUD (Create, Read, Update, Delete) operations on relationships between nodes in a VNV project using the VPI.

## Adding a Relationship (Create)

To add a relationship between two nodes in a project, use the `addRelation` method after initializing the project.

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Project initialization
let project = vnv.VPI.ProjectInstance.init({/* your project */});

// Adding a new relationship between two nodes
let [operation, relation] = vpi.addRelation({
  f_id: crypto.randomUUID(),
  f_token: node1.token,
  t_id: crypto.randomUUID(),
  t_token: node2.token,
  r_type: 'HAS_FILE',
  create_dt: Date.now(),
  update_dt: Date.now()
});
```

### Code Explanation

- `ProjectInstance.init(...)`: Initializes a project by returning a ProxyProjectInstance that allows simplified access to all project layers.
- `vpi.addRelation()`: Adds a relationship between two nodes identified by their tokens. This method returns an array containing two elements:
  - `operation`: The operation associated with adding the relationship.
  - `relation`: The relationship that was added, including the relationship type and associated properties.

### Creating relationships via nodes

Nodes also offer direct methods for creating relationships:

```typescript
// Create a HAS_... type link to another node
const linkOperation = node1.linkTo(node2.token);

// Create an IS_..._FOR_... type link to another node
const forLinkOperation = node1.linkFor(node2.token);
```

## Reading a Relationship (Read)

To read details of an existing relationship, several methods are available:

```typescript
// Retrieve a relationship by its token
const relation = vpi.getRelationByToken('relation-token');

// Check relationship existence
const exists = vpi.hasRelation('relation-token');

// Retrieve relationships from a specific node
const outgoingRelations = vpi.getRelationFromNodeToken('node-token');

// Retrieve relationships to a specific node
const incomingRelations = vpi.getRelationToToken('node-token');

// Search all relationships with criteria
const searchResults = vpi.queryRelationAll({ r_type: 'HAS_FILE' });
```

### Accessing relationships via nodes

Nodes provide direct access to their relationships:

```typescript
// Incoming relationships to this node
const incomingRels = node.inRelationships;

// Outgoing relationships from this node
const outgoingRels = node.outRelationships;

// Relationships originating from this node
const fromRels = node.fromRelationships;

// Relationships destined for this node
const forRels = node.forRelationships;

// Connected nodes in input
const incomingNodes = node.inNodes;

// Connected nodes in output
const outgoingNodes = node.outNodes;

// Source nodes
const sourceNodes = node.fromNodes;

// Destination nodes
const destinationNodes = node.forNodes;
```

## Updating a Relationship (Update)

To update an existing relationship, use the `setRelation` method by specifying the new properties.

```typescript
// Updating an existing relationship
let [operation, updatedRelation] = vpi.setRelation({
  ...relation, // Keep all existing properties
  r_type: 'HAS_LINK',
  update_dt: Date.now()
});
```

### Code Explanation

- `vpi.setRelation(...)`: Updates an existing relationship by passing a complete `IRelation` object with all properties. This method returns an array containing the operation performed and the updated relationship.

## Deleting a Relationship (Delete)

To delete a relationship between two nodes, use the `deleteRelation` method by specifying the relationship token.

```typescript
// Deleting a relationship
let operation = vpi.deleteRelation('relation-token');
```

### Code Explanation

- `vpi.deleteRelation(...)`: Deletes the relationship identified by its token. This method returns the operation associated with deleting the relationship.

## Common Relationship Types

In the VNV system, several types of relationships are used:

### HAS_... Relationships

These relationships indicate that a node "owns" or "contains" another element:

```typescript
// A folder that has a file
node.linkTo(referenceNode.token);

// A folder that has a file
folderNode.linkTo(fileNode.token);

// A project that has a structure
projectNode.linkTo(structureNode.token);
```

### IS_..._FOR_... Relationships

These relationships indicate that a node "is something for" another node:

```typescript
// A file that is a child for a folder
fileNode.linkFor(folderNode.token);

// A requirement that is linked to an object
requirementNode.linkFor(objectNode.token);

// A test that is linked to a requirement
testNode.linkFor(requirementNode.token);
```

## Advanced Relationship Management

### Relationship Properties

Relationships can carry additional properties:

```typescript
const [op, relation] = vpi.addRelation({
  f_id: crypto.randomUUID(),
  f_token: sourceNode.token,
  t_id: crypto.randomUUID(),
  t_token: targetNode.token,
  r_type: 'HAS_LINK',
  create_dt: Date.now(),
  update_dt: Date.now()
  }
});
```

### Complex Relationship Search

```typescript
// Search for relationships of a specific type
const references = vpi.queryRelationAll({ r_type: 'HAS_FILE' });

// Search for relationships with specific properties
const strongLinks = vpi.queryRelationAll({
  r_type: 'HAS_LINK',
  create_dt: Date.now() - 86400000 // Relationships created in the last 24h
});
```

## Operations Summary

- **Creation (addRelation, node.linkTo, node.linkFor)**: Adds a new relationship between two nodes and returns both the operation and the added relationship.
- **Reading (getRelationByToken, hasRelation, getRelationFromNodeToken, getRelationToToken, queryRelationAll)**: Different methods to retrieve and search for relationships.
- **Update (setRelation)**: Modifies properties of an existing relationship and returns the operation and updated relationship.
- **Deletion (deleteRelation)**: Deletes a relationship between two nodes and returns the associated operation.

These operations allow you to efficiently manipulate relationships between nodes in a VNV project, using the functionalities exposed by the ProxyProjectInstance and node instances to directly access different project layers.
