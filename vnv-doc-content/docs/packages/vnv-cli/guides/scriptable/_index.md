---
title : Standalone & Scriptable CLI
---

Our CLI is designed to work in a **standalone** mode, meaning it can be executed directly from the terminal without requiring any additional application or graphical interface.

In addition, it is **scriptable**: commands exposed by the CLI can also be invoked programmatically (e.g., from TypeScript/JavaScript). This allows developers to:
 - Automate repetitive tasks
 - Dynamically generate and chain commands
 - Integrate CLI operations into larger workflows or test pipelines
 - Create complex command dependencies with template interpolation
 - Execute commands from files with a declarative syntax

### Using the `--scriptable` flag

By adding the `--scriptable` flag at the end of your commands, the CLI will return results as JSON instead of printing tables to the console.  
This makes it easy to capture the output of a command and store it in a JSON file, which can then be used as input for a subsequent command.

**Example:**

```bash
vnv-cli adm project default users --scriptable > output.json
```

**Note:** The CLI may output debug information (like "Running in Node.js environment") before the JSON. To get clean JSON output, you can filter it:

```bash
# Remove the first line and format with jq
vnv-cli adm project default users --scriptable | tail -n +2 | jq . > output.json

# Alternative: Remove first line only
vnv-cli adm project default users --scriptable | sed '1d' > output.json

# Alternative: Use grep to extract JSON starting with '{'
vnv-cli adm project default users --scriptable | grep -A 99999 '^{' > output.json
```

You can then reuse this output in other scripts or commands, enabling advanced automation and chaining.

---

## Programmatic Usage

### Basic Example in TypeScript
```typescript
import { scriptable } from '@infrasoftbe/vnv-cli';

let projectToken = "PR1001-001";

let commands = [
  `vnv-cli ess create-vpi test ${projectToken}`,
  `vnv-cli ess vpi f/add-node order my-order-1`,
  ...Array.from({ length: 3 }).map((_, i) => `vnv-cli ess vpi f/add-node deliverable my-deliverable-${i + 1}`),
];

(async () => {
  let engine = await scriptable(commands);
  console.log({ engine });
})();
```

This hybrid approach combines the simplicity of a CLI with the flexibility of a library/SDK, enabling both manual use and programmable **orchestration**.

---

## File-Based Scriptable Execution **[NEW]**

### Overview

The scriptable system now supports executing commands from files using a declarative **Input-Process-Output (IPO)** syntax. This enables you to:
- **Define typed input parameters** with validation and default values
- **Define complex command sequences** with dependencies
- **Use template interpolation** to pass data between commands and from inputs
- **Specify output collections** to extract specific command results
- **Execute entire workflows** from a single file with parameter injection

### Input-Process-Output Architecture

The IPO system consists of three main sections:

1. **INPUTS** (`--@` declarations): Define typed parameters with validation
2. **PROCESS** (command definitions): Execute commands with dependencies and interpolation
3. **OUTPUTS** (`#output` declarations): Specify which command results to collect

### File Syntax

Create a `.txt` file with the following syntax:

```plaintext
# INPUT DECLARATIONS
--@ PROJECT_TOKEN : string = PR2021-003;
--@ PROJECT_NAME? : string;
--@ COMPLEX_OBJECT : {
  "name" : string,
  "age" : number,
  "meta" : {
    tags : Array<string>
  }
};

# PROCESS COMMANDS
vnv-cli me

# Command Naming System
/// Commands are automatically assigned names with a unique suffix system:
/// Commands with the same base name get unique suffixes
${search-project#0};...    // → command ID: "search-project#0"
${search-project#1};...    // → command ID: "search-project#1" 
${search-project#2};...    // → command ID: "search-project#2"

# OUTPUT DECLARATION
#output=[get-project-nodes#0];
```

This enables:
- **Unique identification** of each command
- **Dependency resolution** by name  
- **Organized command mapping** in the execution cache

### Output Collection System **[NEW]**

#### Output Declarations

Use `#output` declarations to specify which command results should be collected:

```plaintext
# Single output
#output=[get-project-nodes#0];

# Multiple outputs
#output=[search#0,filter#0,process#0];

# Typed outputs (optional)
#output=[results#0] : Array<ProjectNode>;
```

#### Output Access

When executing files with parameters, outputs are returned in a structured format:

```typescript
const result = await scriptable.executeFile('workflow.txt', { PROJECT_TOKEN: 'PR123' });

// Access outputs
const nodes = result.outputs['get-project-nodes#0'];
const searchResults = result.outputs['search#0'];

// Access metadata
console.log(result.metadata.hasInputs);     // true/false
console.log(result.metadata.hasOutputs);    // true/false
console.log(result.metadata.availableCommandIds); // string[]
```

# OUTPUT DECLARATIONS

```plaintext
${get-project-nodes#0};vnv-cli dal project ${PROJECT_ID} nodes list -$deps:[search-project#0](
  -$preaction '{"context":{"args":{ "PROJECT_ID" : "{{depts[0][0].id}}" }}}'
);

#output=[get-project-nodes#0];
```

### Syntax Elements

#### 1. Input Declarations (`--@`)

Define typed input parameters with optional defaults:

```plaintext
# Basic types
--@ PROJECT_TOKEN : string = PR2021-003;
--@ MAX_ITEMS : number = 10;
--@ ENABLE_DEBUG : boolean = true;
--@ PROJECT_NAME? : string;  # Optional parameter

# Complex object types
--@ COMPLEX_OBJECT : {
  "name" : string,
  "age" : number,
  "meta" : {
    tags : Array<string>
  }
};

# Array types
--@ TAG_LIST : Array<string> = ["dev", "test"];
```

#### 2. Simple Commands
```plaintext
vnv-cli me
vnv-cli dal projects list
```

#### 3. Named Commands
```plaintext
${command-name#0};vnv-cli command here;
```

#### 4. Commands with Dependencies
```plaintext
${dependent-command#0};vnv-cli command -$deps:[dependency1#0,dependency2#0];
```

#### 5. Commands with PreAction Templates
```plaintext
${command#0};vnv-cli command -$deps:[dep#0] -$preaction '{"context":{"args":{"VAR":"{{template}}"}}}';
```

#### 6. Input Parameter Interpolation
```plaintext
${search#0};vnv-cli dal nodes search '{"type":"project","token":"${INPUTS.PROJECT_TOKEN}"}';
${complex#0};vnv-cli command '{"data": "${INPUTS.COMPLEX_OBJECT.name}"}';
```

#### 7. Output Declarations
```plaintext
#output=[get-project-nodes#0];
#output=[command1#0,command2#0];  # Multiple outputs
```

#### 8. Multiline Commands with Options
```plaintext
${complex-command#0};vnv-cli command -$deps:[dep#0](
  -$preaction '{"context":{"args":{"VAR":"{{template}}"}}}'
);
```

### Template System

The system supports two types of interpolation:

#### 1. Input Parameter Interpolation (`${INPUTS.VARIABLE}`)

Access typed input parameters with deep object navigation:

```plaintext
${INPUTS.PROJECT_TOKEN}              # Simple string parameter
${INPUTS.COMPLEX_OBJECT.name}        # Nested object property
${INPUTS.COMPLEX_OBJECT.meta.tags}   # Deep nested access
${INPUTS.MAX_ITEMS}                  # Number parameter
```

#### 2. Dependency Result Interpolation (`{{handlebars}}`)

Use Handlebars-like syntax to interpolate data from dependency results:

```handlebars
{{depts[0][0].id}}                   # Access first dependency's first result's id
{{depts[1].result.name}}             # Access second dependency's result name
{{depts[0][0].properties.name}}      # Nested property access
{{depts[0].result.items[2].value}}   # Array indexing
```

#### 3. Conditional Templates
```handlebars
{{#if depts.length}}{{depts[0][0].id}}{{else}}null{{/if}}
```

### Input Parameter System **[NEW]**

#### Type System

The input system supports comprehensive type definitions with TypeScript-like syntax:

```plaintext
# Primitive types
--@ STRING_VAR : string;
--@ NUMBER_VAR : number;
--@ BOOLEAN_VAR : boolean;
--@ ANY_VAR : any;

# Optional parameters
--@ OPTIONAL_VAR? : string;

# Default values
--@ WITH_DEFAULT : string = "default-value";
--@ NUMBER_DEFAULT : number = 42;

# Array types
--@ STRING_ARRAY : Array<string>;
--@ NUMBER_ARRAY : Array<number>;

# Complex objects
--@ USER_CONFIG : {
  "name" : string,
  "settings" : {
    "theme" : string,
    "notifications" : boolean
  },
  "tags" : Array<string>
};
```

#### Runtime Validation

All input parameters are validated at runtime using Zod schemas:

- **Type checking**: Ensures parameters match declared types
- **Required validation**: Enforces non-optional parameters
- **Default injection**: Applies default values for missing optional parameters
- **Deep validation**: Validates nested object structures

#### Parameter Injection

Input parameters are injected into commands using the `${INPUTS.VARIABLE}` syntax:

```plaintext
${search#0};vnv-cli dal nodes search '{"type":"project","token":"${INPUTS.PROJECT_TOKEN}"}';
${filter#0};vnv-cli dal filter '{"max": ${INPUTS.MAX_ITEMS}, "name": "${INPUTS.USER_CONFIG.name}"}';

${search-project};...    // → command ID: "search-project#0" 
${search-project};...    // → command ID: "search-project#1"
```

This enables:
- **Unique identification** of each command
- **Dependency resolution** by name
- **Organized command mapping** in the execution cache

### Execution from Files

#### Method 1: Using executeFile() with Parameters
```typescript
import { scriptable } from '@infrasoftbe/vnv-cli';
import * as path from 'path';

(async () => {
  // Execute with input parameters
  const result = await scriptable.executeFile(
    path.join(__dirname, 'workflow.txt'),
    {
      PROJECT_TOKEN: 'PR2024-007',
      COMPLEX_OBJECT: {
        name: "Test Project",
        age: 30,
        meta: {
          tags: ["dev", "testing"]
        }
      }
    }
  );
  
  // Access outputs
  const nodes = result.outputs['get-project-nodes#0'];
  console.log('Project nodes:', nodes.length);
  
  // Access metadata
  console.log('Has inputs:', result.metadata.hasInputs);
  console.log('Has outputs:', result.metadata.hasOutputs);
})();
```

#### Method 2: Parsing and Custom Execution
```typescript
import { parseScriptableFileEnhanced } from '@infrasoftbe/vnv-cli/scriptable/parse-scriptable-file';

(async () => {
  const content = fs.readFileSync('workflow.txt', 'utf-8');
  const parseResult = await parseScriptableFileEnhanced(content);
  
  // Validate inputs
  if (parseResult.inputs.inputs.length > 0) {
    console.log('Required inputs:', parseResult.inputs.inputs.map(i => i.name));
  }
  
  // Execute with environment
  const engine = await scriptable(parseResult.factories, { 
    INPUTS: parseResult.inputs.defaults 
  });
  
  console.log('Results:', Array.from(engine.storage.entries()));
})();
```

### Real-World Example

**File: `project-workflow.txt`**
```plaintext
# INPUT DECLARATIONS
--@ PROJECT_TOKEN : string = PR2021-003;
--@ MAX_RESULTS? : number;
--@ USER_CONFIG : {
  "name" : string,
  "department" : string,
  "preferences" : {
    "notifications" : boolean,
    "theme" : string
  }
};

# PROCESS COMMANDS
# Get user profile
vnv-cli me

# Search for a specific project using input parameter
${search-project#0};vnv-cli dal nodes search '{"type":"project","token":"${INPUTS.PROJECT_TOKEN}"}';

# Get project nodes using the found project ID and user config
${get-project-nodes#0};vnv-cli dal project ${PROJECT_ID} nodes list -$deps:[search-project#0](
  -$preaction '{"context":{"args":{ 
    "PROJECT_ID" : "{{depts[0][0].id}}", 
    "USER_NAME" : "${INPUTS.USER_CONFIG.name}",
    "MAX_ITEMS" : ${INPUTS.MAX_RESULTS}
  }}}'
);

# Filter results based on user department
${filter-by-dept#0};vnv-cli dal filter '{"department":"${INPUTS.USER_CONFIG.department}"}' -$deps:[get-project-nodes#0];

# OUTPUT DECLARATIONS
#output=[filter-by-dept#0];
```

**Execution:**
```typescript
import { scriptable } from '@infrasoftbe/vnv-cli';

(async () => {
  const result = await scriptable.executeFile('./project-workflow.txt', {
    PROJECT_TOKEN: 'PR2024-007',
    MAX_RESULTS: 50,
    USER_CONFIG: {
      name: "John Doe",
      department: "Engineering", 
      preferences: {
        notifications: true,
        theme: "dark"
      }
    }
  });
  
  const filteredResults = result.outputs['filter-by-dept#0'];
  console.log(`Found ${filteredResults.length} nodes for ${result.parameters.USER_CONFIG.department}`);
})();
```

### Benefits

This Input-Process-Output architecture provides:

- **Type Safety**: Runtime validation of input parameters
- **Reusability**: Parameterized workflows that can be reused with different inputs
- **Clarity**: Clear separation between inputs, processing, and outputs
- **Validation**: Automatic validation of parameter types and required fields
- **Flexibility**: Support for complex nested objects and arrays
- **Debugging**: Rich metadata and structured error messages
- **Integration**: Easy integration into larger automation systems
  -$preaction '{"context":{"args":{ "PROJECT_ID" : "{{depts[0][0].id}}" }}}'
);

# Create a VPI pull using the project

```shell
${pull-vpi};vnv-cli ess vpi pull {PROJECT_ID} -$deps:[search-project](
  -$preaction '{"context":{"args":{ "PROJECT_ID" : "{{depts[0][0].id}}" }}}'
);
```

# Add nodes to the VPI

```shell
${add-order};vnv-cli ess vpi f/add-node order main-order -$deps:[pull-vpi];
${add-deliverable};vnv-cli ess vpi f/add-node deliverable main-deliverable -$deps:[add-order];
```

**Execution:**
```typescript
import { scriptable } from '@infrasoftbe/vnv-cli';

(async () => {
  const engine = await scriptable.executeFile('./project-workflow.txt');
  
  // Access results via storage
  for (const [commandId, result] of engine.storage) {
    console.log(`${commandId}:`, result.success ? 'SUCCESS' : 'FAILED');
    if (result.result) {
      console.log('  Result:', result.result);
    }
  }
})();
```

---

## Advanced Concepts

### Understanding the Execution Engine Architecture

The scriptable system is built on these main components:

1. **ScriptableEngine**: The execution engine that manages commands and dependencies
2. **ExecutionCacheStorage**: A cache storage that extends `Map<string, any>` to persist results with intelligent naming
3. **CommandFactory**: Hybrid function/data objects that represent prepared commands
4. **FileParser**: Parses declarative command files into executable factories
5. **TemplateEngine**: Interpolates templates with dependency results

### Command Naming and Dependencies

#### Automatic Name Generation
```typescript
// Commands without explicit names get UUIDs
const cmd1 = scriptable.prepare('vnv-cli command');
console.log(cmd1.commandId); // → "550e8400-e29b-41d4-a716-446655440000"

// Commands with names get the naming system
const cmd2 = scriptable.prepare('vnv-cli command', 'my-command');
console.log(cmd2.commandId); // → "my-command#0"

const cmd3 = scriptable.prepare('vnv-cli command', 'my-command');
console.log(cmd3.commandId); // → "my-command#1"
```

#### Dependency Resolution by Name
```typescript
const searchCmd = scriptable.prepare('vnv-cli dal nodes search '{"type":"project","token":"PR2021-003"}'', 'search-project');
const processCmd = scriptable.prepareDependency({
  name: 'process-project',
  command: 'vnv-cli dal project {ID} nodes list',
  depends: ['search-project'], // Resolves to searchCmd by name
  preAction: '{"context":{"args":{"ID":"{{depts[0][0].id}}"}}}'
});

const engine = await scriptable([searchCmd, processCmd]);
```

### Prepared Commands vs Direct Execution

#### Direct execution (string)
```typescript
import { scriptable } from '@infrasoftbe/vnv-cli';

// Immediate execution, no fine-grained control
let engine = await scriptable([
  `vnv-cli dal projects list`,
  `vnv-cli dal nodes search '{"type": "project"}'`
]);
```

#### Prepared commands (scriptable.prepare)
```typescript
import { scriptable } from '@infrasoftbe/vnv-cli';

// Preparation without execution - enables control and dependencies
let commands = [
  scriptable.prepare(`vnv-cli dal projects list`, 'list-projects'),
  scriptable.prepare(`vnv-cli dal nodes search '{"type": "project"}'`, 'search-nodes')
];

let engine = await scriptable(commands);

// Access results via the commands themselves
let [projectsList, nodesSearch] = commands;
console.log('Projects:', projectsList.result);
console.log('Nodes:', nodesSearch.result);
console.log('Command ID:', projectsList.commandId); // → "list-projects#0"
```

#### Prepared commands with dependencies
```typescript
const findProject = scriptable.prepare(
  `vnv-cli dal nodes search '{"type": "project", "token": "PR1001-001"}'`,
  'find-project'
);

const pullVpi = scriptable.prepareDependency({
  name: 'pull-vpi',
  command: 'vnv-cli ess vpi pull {PROJECT_ID}',
  depends: ['find-project'],
  preAction: '{"context":{"args":{"PROJECT_ID":"{{depts[0].result[0].id}}"}}}'
});

const engine = await scriptable([findProject, pullVpi]);
```

### Accessing execution results

#### Method 1: Via command objects
```typescript
let commands = [
  scriptable.prepare(`vnv-cli dal projects list`, 'projects')
];

let engine = await scriptable(commands);

// Result properties are updated after execution
let [{ result: projects, success, status, error, output }] = commands;

if (success) {
  console.log('Projects found:', projects);
} else {
  console.error('Command failed:', error);
  console.log('Raw output:', output);
}
```

#### Method 2: Via engine storage
```typescript
let engine = await scriptable(commands);

// Retrieval via command ID from cache
let cached = engine.storage.get('projects#0');
console.log('Cached result:', cached.result);

// Find by base name
let allProjects = engine.storage.findByBaseName('projects');
console.log('All project commands:', allProjects);
```

### Template Interpolation System

#### Available Context in Templates

When using templates in `preAction`, you have access to:

```javascript
{
  depts: [        // Array of dependency results
    {
      result: {...},  // The actual result from the dependency
      success: true,  // Whether the dependency succeeded
      commandId: "search-project#0"
    }
  ]
}
```

#### Template Examples

**Simple variable access:**
```handlebars
{{depts[0].result.id}}
{{depts[0].result.name}}
{{depts[1].result.items[0].value}}
```

**Conditional logic:**
```handlebars
{{#if depts.length}}
  {{depts[0].result.id}}
{{else}}
  null
{{/if}}
```

**Multiple variables:**
```json
{
  "context": {
    "args": {
      "PROJECT_ID": "{{depts[0].result[0].id}}",
      "PROJECT_NAME": "{{depts[0].result[0].name}}",
      "HAS_NODES": "{{#if depts[1].result.length}}true{{else}}false{{/if}}"
    }
  }
}
```

### Error Handling and Debugging

#### Checking Command Results
```typescript
const commands = [
  scriptable.prepare('vnv-cli dal projects list', 'projects')
];

const engine = await scriptable(commands);
const [projectsCmd] = commands;

if (!projectsCmd.success) {
  console.error('Command failed!');
  console.error('Error:', projectsCmd.error);
  console.error('Status:', projectsCmd.status);
  console.error('Output:', projectsCmd.output);
}
```

#### Storage Inspection
```typescript
// View all executed commands
console.log('All executions:');
for (const [commandId, result] of engine.storage) {
  console.log(`${commandId}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
}

// Find specific commands
const projectCommands = engine.storage.findByBaseName('projects');
console.log('Project commands:', projectCommands);
```

#### Template Debugging
```typescript
// Use simple templates first, then add complexity
const simpleTemplate = '{"context":{"args":{"ID":"{{depts[0].result[0].id}}"}}}';
const complexTemplate = '{"context":{"args":{"ID":"{{#if depts.length}}{{depts[0].result[0].id}}{{else}}null{{/if}}"}}}';
```

---

## Best Practices

### 1. **File Organization**
```plaintext
project-setup.txt       # Initial project setup
data-processing.txt     # Data processing workflows
deployment.txt          # Deployment sequences
```

### 2. **Naming Conventions**
```plaintext
${search-projects};     # Use kebab-case for command names
${get-project-data};    # Be descriptive but concise
${deploy-to-prod};      # Use verbs for actions
```

### 3. **Template Organization**
```json
{
  "context": {
    "args": {
      "PROJECT_ID": "{{depts[0].result[0].id}}",
      "PROJECT_NAME": "{{depts[0].result[0].name}}"
    }
  }
}
```

### 4. **Error Handling**
```typescript
const engine = await scriptable.executeFile('./workflow.txt');

// Check overall success
const hasFailures = Array.from(engine.storage.values())
  .some(result => !result.success);

if (hasFailures) {
  console.error('Some commands failed!');
  // Handle failures appropriately
}
```

### 5. **Debugging Complex Workflows**
```typescript
// Enable verbose logging during development
const engine = await scriptable.executeFile('./workflow.txt');

// Inspect each step
for (const [commandId, result] of engine.storage) {
  console.log(`Step ${commandId}:`);
  console.log(`  Success: ${result.success}`);
  console.log(`  Command: ${result.command}`);
  if (result.result) {
    console.log(`  Result keys: ${Object.keys(result.result)}`);
  }
}
```

---

## Migration Guide

### From Basic Scriptable to File-Based

**Before (programmatic):**
```typescript
const findProject = scriptable.prepare(`vnv-cli dal nodes search '{"type": "project"}'`);
const processProject = scriptable.prepareDependency({
  command: 'vnv-cli process project',
  depends: [findProject],
  preAction: (inputs, context) => {
    context.args.PROJECT_ID = inputs[0]?.result?.[0]?.id;
  }
});

await scriptable([findProject, processProject]);
```

**After (file-based):**

**File: `workflow.txt`**
```plaintext
${find-project};vnv-cli dal nodes search '{"type": "project"}';
${process-project};vnv-cli process project {PROJECT_ID} -$deps:[find-project](
  -$preaction '{"context":{"args":{"PROJECT_ID":"{{depts[0].result[0].id}}"}}}'
);
```

**Execution:**
```typescript
await scriptable.executeFile('./workflow.txt');
```

This new approach provides better:
- **Readability** and maintainability
- **Version control** for workflows
- **Collaboration** between team members
- **Documentation** of complex processes

---

## Implementation Status

The scriptable system now includes these **implemented features**:

### ✅ **File-Based Command Execution**
- Parse commands from text files with declarative syntax
- Execute workflows from files using `scriptable.executeFile()`
- Support for complex command dependencies and templates

### ✅ **Command Naming System**
- Automatic unique ID generation with `#0`, `#1`, `#2` suffixes
- Named command mapping and dependency resolution
- Intelligent command storage and retrieval

### ✅ **Template Engine**
- Handlebars-like template interpolation (`{{variable}}`)
- Conditional logic support (`{{#if}}...{{else}}...{{/if}}`)
- Access to dependency results and nested properties

### ✅ **Dependency Management** 
- Chain commands with `-$deps:[dependency-name]` syntax
- PreAction template injection with `-$preaction` option
- Automatic dependency resolution and execution ordering

### ✅ **Enhanced Storage System**
- Extended `Map` with `findByBaseName()` method
- Command result caching and retrieval
- Execution context preservation across command sequences

---

## Future Enhancements **[Not Implemented]**

These features could be added to extend the system further:

### Proposed: Advanced dependency system

```typescript
// Extension of the current system
namespace scriptable {
  export interface DependentCommand extends ExecuteCommandFactory {
    dependencies?: string[]; // IDs of commands this command depends on
    condition?: (deps: Map<string, CommandFactory>) => boolean;
    transformCommand?: (deps: Map<string, CommandFactory>) => string;
  }
}

// Proposed usage
const createDependentCommand = (
  baseCommand: string, 
  dependencies: string[] = [],
  transformer?: (deps: Map<string, any>) => string
) => {
  const cmd = scriptable.prepare(baseCommand);
  return Object.assign(cmd, {
    dependencies,
    transformCommand: transformer || (() => baseCommand),
    [Symbol.toPrimitive]: (hint: string) => {
      switch (hint) {
        case 'string': return baseCommand;
        case 'number': return cmd.success ? 1 : 0;
        default: return baseCommand;
      }
    }
  });
};

// Advanced usage example
(async () => {
  const findProject = scriptable.prepare(`vnv-cli dal nodes search '{"type": "project", "token": "PR1001-001"}'`);
  
  const pullVpi = createDependentCommand(
    'vnv-cli ess vpi pull', // Base command
    [findProject.commandId], // Dependency
    (deps) => {
      const project = deps.get(findProject.commandId)?.result;
      return `vnv-cli ess vpi pull ${project.id}`;
    }
  );

  const addNodes = createDependentCommand(
    'vnv-cli ess vpi f/add-node',
    [pullVpi.commandId],
    (deps) => {
      const vpiData = deps.get(pullVpi.commandId)?.result;
      return `vnv-cli ess vpi f/add-node order ${vpiData.nextOrderId}`;
    }
  );

  // Execution with automatic dependency resolution
  let engine = await scriptable([findProject, pullVpi, addNodes]);
})();
```

### Proposed: Error handling and retry

```typescript
const withRetry = (command: string, maxRetries = 3) => {
  const cmd = scriptable.prepare(command);
  let retryCount = 0;
  
  const originalResolve = cmd.resolve;
  cmd.resolve = async function(this: ScriptableEngine) {
    while (retryCount < maxRetries) {
      try {
        const result = await originalResolve.call(this, cmd);
        if (result.success) return result;
        retryCount++;
      } catch (error) {
        retryCount++;
        if (retryCount >= maxRetries) throw error;
      }
    }
    throw new Error(`Command failed after ${maxRetries} retries`);
  };
  
  return cmd;
};

// Usage
const resilientCommand = withRetry(`vnv-cli dal projects list`, 3);
```

### Proposed: Structured interaction plans

```typescript
class ExecutionPlan {
  private commands: Map<string, scriptable.ExecuteCommandFactory> = new Map();
  private dependencies: Map<string, string[]> = new Map();
  
  addCommand(name: string, command: string, deps: string[] = []) {
    const cmd = scriptable.prepare(command);
    this.commands.set(name, cmd);
    this.dependencies.set(name, deps);
    return this;
  }
  
  async execute(): Promise<Map<string, any>> {
    const results = new Map();
    const executed = new Set<string>();
    
    const executeCommand = async (name: string): Promise<void> => {
      if (executed.has(name)) return;
      
      // Execute dependencies first
      const deps = this.dependencies.get(name) || [];
      for (const dep of deps) {
        await executeCommand(dep);
      }
      
      const cmd = this.commands.get(name)!;
      const engine = new ScriptableEngine();
      const result = await engine.resolve(cmd);
      
      results.set(name, result);
      executed.add(name);
    };
    
    // Execute all commands
    for (const name of this.commands.keys()) {
      await executeCommand(name);
    }
    
    return results;
  }
}

// Usage
const plan = new ExecutionPlan()
  .addCommand('findProject', `vnv-cli dal nodes search '{"type": "project", "token": "PR1001-001"}'`)
  .addCommand('pullVpi', `vnv-cli ess vpi pull {PROJECT_ID}`, ['findProject'])
  .addCommand('addOrder', `vnv-cli ess vpi f/add-node order main-order`, ['pullVpi'])
  .addCommand('addDeliverable', `vnv-cli ess vpi f/add-node deliverable main-deliverable`, ['addOrder']);

const results = await plan.execute();
```

These future enhancements would enable:
- **Creating explicit dependencies** between commands
- **Dynamically transforming** commands based on previous results  
- **Centralized error and retry management**
- **Structuring complex interaction plans** in a maintainable way
- **Reusing execution context** across sequences