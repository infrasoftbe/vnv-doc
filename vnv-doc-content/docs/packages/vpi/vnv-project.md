---
title: "Introduction"
weight: 2301
---
# Introduction to VPI (Virtual Project Interface)

A **Project DUMP** comes directly from the database and contains all data for a VNV project in JSON format.

A **VPI** (Virtual Project Interface) is a virtual project interface, that is, a virtual representation of a project allowing interaction with it in a simplified and structured manner.

{{< callout context="tip" title="GitHub Package - Authentication Required" icon="outline/key" >}}
The package [@infrasoftbe/vnv-sdk](https://github.com/infrasoftbe/Infrasoft-vnv-ritual-project/pkgs/npm/vnv-sdk) is hosted on GitHub Packages. **Note that you need an authentication token distributed by the administrator to use this package.** You must also be a member of the Infrasoft organization to have access.
{{< /callout >}}

## Installation

To install this package, use npm:

```bash
npm install @infrasoftbe/vnv-sdk@latest
```

## Project DUMP and VPI: What are the differences?

- A **Project DUMP** is a raw JSON file, which means you need to perform manual manipulations in the object to interact with the project.
- A **VPI** is built from a DUMP and allows unified and global interaction with it. When an element is created and it involves creating a link, this is automatically managed by the VPI, reducing interactions and simplifying them.

The VPI also offers search, add, update, and delete data features. It uses a difference calculation system (diff) between operations that execute in the VPI, enabling modification history management as well as a possible undo/redo system.

These differences are used to apply changes made in a VPI to the project stored in the database.

## Architecture of a VNV Project

A VNV project consists of several main components:

### Data Types Contained in the DUMP

The dump is a key-value object containing several main fields:

- **`self`**: Contains the project information itself as well as its metadata
- **`data.nodes`**: Contains the project nodes
- **`data.relations`**: Contains relationships between project nodes
- **`data.metas`**: Contains metadata for nodes, structures, and lists
- **`data.structures`**: Contains project structures
- **`data.lists`**: Contains project lists

### Data Types Contained in the VPI

The VPI contains the same data sets as the JSON DUMP, except that it adds utilities to facilitate interactions. It also modifies certain data types, such as arrays that are replaced by Maps, allowing direct access rather than searches on data sets.

This optimization significantly improves performance when manipulating large volumes of data.

## VPI Advantages

1. **Unified interface**: Simplifies interactions with project data
2. **Automatic link management**: Relationships are created automatically during operations
3. **Performance optimization**: Use of Map instead of arrays for direct access
4. **Traceability**: Operation system to track all changes
5. **Synchronization**: Difference calculation for efficient synchronization with the database
