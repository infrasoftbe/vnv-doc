---
title : Elastic Session System
---
### help

```shell
vnv-cli ess -h
```

## Documents

### help

```shell
vnv-cli ess documents -h
```

### list

```shell
vnv-cli ess documents list
```

```shell
vnv-cli ess documents list --output tree || 
vnv-cli ess documents list -o tree
```

### document details

```shell
vnv-cli ess documents details <document-path>
```

### delete one or multiples documents

```shell
vnv-cli ess documents delete <document-path...>
```

### download one or multiples documents

```shell
vnv-cli ess documents download <document-path...>
```

## VPI - Virtual project interface

### help

```shell
vnv-cli ess vpi -h
```

### Functions

#### function - add node

```shell
vnv-cli ess vpi f/add-node <node-type> <node-name>
```

#### function - set node

```shell
vnv-cli ess vpi f/set-node <node-token> <node-data>
```

#### function - delete node

```shell
vnv-cli ess vpi f/delete-node <node-token>
```

#### function - add relation

```shell
vnv-cli ess vpi f/add-relation <f_node-token> <relation-type> <t_node-token>
```

#### function - set relation

```shell
vnv-cli ess vpi f/set-relation <relation-token> <relation-data>
```

#### function - delete relation

```shell
vnv-cli ess vpi f/delete-relation <relation-token>
```

#### function - add metadata

```shell
vnv-cli ess vpi f/add-metadata <metadata-token> <metadata-data>
```

#### function - set metadata

```shell
vnv-cli ess vpi f/set-metadata <metadata-token> <metadata-data>
```

#### function - delete metadata

```shell
vnv-cli ess vpi f/delete-metadata <metadata-token>
```

#### function - add list

```shell
vnv-cli ess vpi f/add-list <list-type> <list-name>
```

#### function - set list

```shell
vnv-cli ess vpi f/set-list <list-token> <list-data>
```

#### function - delete list

```shell
vnv-cli ess vpi f/delete-list <list-token>
```

#### function - add list child

```shell
vnv-cli ess vpi list <list-token> f/add-child <child-name> <child-notation>
```

#### function - update list child

```shell
vnv-cli ess vpi list <list-token> f/update-child <child-token> <child-data>
```

#### function - delete list child

```shell
vnv-cli ess vpi list <list-token> f/delete-child <child-token>
```

#### function - add structure

```shell
vnv-cli ess vpi f/add-structure <structure-type> <structure-name>
```

#### function - set structure

```shell
vnv-cli ess vpi f/set-structure <structure-token> <structure-data>
```

#### function - delete structure

```shell
vnv-cli ess vpi f/delete-structure <structure-token>
```

#### function - add structure child

```shell
vnv-cli ess vpi structure <structure-token> f/add-child <child-name> <child-notation>
```

#### function - update structure child

```shell
vnv-cli ess vpi structure <structure-token> f/update-child <child-token> <child-data>
```

#### function - delete structure child

```shell
vnv-cli ess vpi structure <structure-token> f/delete-child <child-token>
```

### Nodes

#### Nodes - help

```shell
vnv-cli ess vpi nodes -h
```

#### Nodes list

```shell
vnv-cli ess vpi nodes || 
vnv-cli ess vpi nodes list
```

#### Node - help

```shell
vnv-cli ess vpi node -h || 
vnv-cli ess vpi node <node-token> -h
```

#### Node - details

```shell
vnv-cli ess vpi node <node-token> || 
vnv-cli ess vpi node <node-token> details 
```

#### Node - metadata

```shell
vnv-cli ess vpi node <node-token> metadata
```

### Relations

#### Relations - help

```shell
vnv-cli ess vpi relations -h
```

#### Relations list

```shell
vnv-cli ess vpi relations || 
vnv-cli ess vpi relations list
```

### Structures

#### Structures - help

```shell
vnv-cli ess vpi structures -h
```

#### Structures list

```shell
vnv-cli ess vpi structures || 
vnv-cli ess vpi structures list
```

#### Structure - help

```shell
vnv-cli ess vpi structure -h || 
vnv-cli ess vpi structure <structure-token> -h
```

#### Structure - details

```shell
vnv-cli ess vpi structure <structure-token> || 
vnv-cli ess vpi structure <structure-token> details 
```

#### Structure childs - help

```shell
vnv-cli ess vpi structure <structure-token> childs -h
```

#### Structure childs - list

```shell
vnv-cli ess vpi structure <structure-token> childs || 
vnv-cli ess vpi structure <structure-token> childs list
```

#### Structure child - help

```shell
vnv-cli ess vpi structure <structure-token> child -h || 
vnv-cli ess vpi structure <structure-token> child <child-token> -h
```

#### Structure child - details

```shell
vnv-cli ess vpi structure <structure-token> child <child-token> || 
vnv-cli ess vpi structure <structure-token> child <child-token> details
```

### Lists

#### Lists - help

```shell
vnv-cli ess vpi lists -h
```

#### Lists list

```shell
vnv-cli ess vpi lists || 
vnv-cli ess vpi lists list
```

#### Lists - help

```shell
vnv-cli ess vpi list -h || 
vnv-cli ess vpi list <list-token> -h
```

#### Lists - details

```shell
vnv-cli ess vpi list <list-token> || 
vnv-cli ess vpi list <list-token> details 
```

#### Lists childs - help

```shell
vnv-cli ess vpi list <list-token> childs -h
```

#### Lists childs - list

```shell
vnv-cli ess vpi list <list-token> childs || 
vnv-cli ess vpi list <list-token> childs list
```

#### Lists child - help

```shell
vnv-cli ess vpi list <list-token> child -h || 
vnv-cli ess vpi list <list-token> child <child-token> -h
```

#### Lists child - details

```shell
vnv-cli ess vpi list <list-token> child <child-token> || 
vnv-cli ess vpi list <list-token> child <child-token> details
```
