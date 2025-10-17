---
title : Data Access Layer
---

## Database

### help
```shell
vnv-cli dal -h
```

### help
```shell
vnv-cli dal -h
```

### Projects - list
```shell
vnv-cli dal projects || 
vnv-cli dal projects list
```

### Nodes - list
```shell
vnv-cli dal nodes || 
vnv-cli dal nodes list
```

### Relations - list
```shell
vnv-cli dal relations || 
vnv-cli dal relations list
```

## Project

### Nodes - list

```shell
vnv-cli dal project <project-id> nodes || 
vnv-cli dal project <project-id> nodes list
```

### Relations - list

```shell
vnv-cli dal project <project-id> relations || 
vnv-cli dal project <project-id> relations list
```

### Metadatas - list

```shell
vnv-cli dal project <project-id> metadatas || 
vnv-cli dal project <project-id> metadatas list
```

### Structures - list

```shell
vnv-cli dal project <project-id> structures || 
vnv-cli dal project <project-id> structures list
```

### Lists - list

```shell
vnv-cli dal project <project-id> lists || 
vnv-cli dal project <project-id> lists list
```

## Functions

### f/add-node
```shell
vnv-cli dal f/add-node <node-data>
```

### f/update-node
```shell
vnv-cli dal f/update-node <node-id> <node-data>
```

### f/delete-node
```shell
vnv-cli dal f/delete-node <node-id>
```

### f/add-relation
```shell
vnv-cli dal f/add-relation <relation-data>
```

### f/update-relation
```shell
vnv-cli dal f/update-relation <relation-id> <relation-data>
```

### f/delete-relation
```shell
vnv-cli dal f/update-relation <relation-id>
```