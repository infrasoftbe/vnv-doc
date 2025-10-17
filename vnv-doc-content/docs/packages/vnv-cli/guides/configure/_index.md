---
title: Configure vnv-cli guide
---

## Configure

### help

```shell
vnv-cli configure -h
```

### get

Retrieve the value of a specific key on **active** configuration profile

```shell
vnv-cli configure get <key>
```

### set

Set key-value pair on **active** configuration profile

```shell
vnv-cli configure set <key> <value>
```

### get inuse configuration

Retrieve the value of a specific key on **active** configuration profile

```shell
vnv-cli configure get
```

### claim token

Request and claim a new authentication token on **active** configuration profile

```shell
vnv-cli configure claim-token
```

## Profile

### help

```shell
vnv-cli configure profile -h
```

### add profile -- wizard

Create a specific profile configuration

```shell
vnv-cli configure profile <profile_name>
```

### add profile -- authenticate-flow

Create profile and use authenticate workflow

```shell
vnv-cli configure profile <profile_name> --authenticate-flow
```

### list profiles

List all available configuration profiles

```shell
vnv-cli configure profile list
```

### switch profile

Switch the **active** configuration profile

```shell
vnv-cli configure profile switch <profile_name>
```

### remove profile

Delete a profile

```shell
vnv-cli configure profile <profile_name> --delete
```

### freeze profile

Freeze the **active** configuration profile

```shell
vnv-cli configure profile freeze
```

### unfreeze profile

Unfreeze the **active** configuration profile

```shell
vnv-cli configure profile unfreeze
```
