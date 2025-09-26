---
title: "Buisness Access Layer"
---

### Azure - help

```shell
vnv-cli bal azure -h
```

### Azure users - list

```shell
vnv-cli bal azure users ||
vnv-cli bal azure users list
```

### Azure users - create-user

```shell
vnv-cli bal azure users f/create-user <username>
```

### Azure users - delete-user

```shell
vnv-cli bal azure users f/delete-user <user-id>
```

## Sharepoint

### Sharepoint - help

```shell
vnv-cli bal sharepoint -h
```

### Sharepoint - function

#### Sharepoint - create-site

```shell
vnv-cli bal sharepoint f/create-site <site-url> <site-name>
```

#### Sharepoint - update-site

```shell
vnv-cli bal sharepoint f/update-site <site-id> <site-data>
```

#### Sharepoint - delete-site

```shell
vnv-cli bal sharepoint f/delete-site <site-id>
```

### Sites - list

```shell
vnv-cli bal sharepoint sites ||
vnv-cli bal sharepoint sites list
```

## Sharepoint - Site

### Sites/lists - list

```shell
vnv-cli bal sharepoint <site-id> lists ||
vnv-cli bal sharepoint <site-id> lists list
```

### Sites/list - details

```shell
vnv-cli bal sharepoint <site-id> list <list-id> ||
vnv-cli bal sharepoint <site-id> list <list-id> details
```

### Sites/list - fields

```shell
vnv-cli bal sharepoint <site-id> list <list-id> fields ||
vnv-cli bal sharepoint <site-id> list <list-id> fields list
```

### Sites/list - items

```shell
vnv-cli bal sharepoint <site-id> list <list-id> items ||
vnv-cli bal sharepoint <site-id> list <list-id> items list
```

### Sites/list - functions

#### Sites/list - add-item

```shell
vnv-cli bal sharepoint list <list-id> f/add-item <item-data>
```

#### Sites/list - update-item

```shell
vnv-cli bal sharepoint list <list-id> f/update-item <item-id> <item-data>
```

#### Sites/list - delete-item

```shell
vnv-cli bal sharepoint list <list-id> f/delete-item <item-id>
```

#### Sites/list - add-field

```shell
vnv-cli bal sharepoint list <list-id> f/add-field <field-data>
```

#### Sites/list - update-field

```shell
vnv-cli bal sharepoint list <list-id> f/update-field <field-id> <field-data>
```

#### Sites/list - delete-field

```shell
vnv-cli bal sharepoint list <list-id> f/delete-field <field-id>
```

### Sites/sub-sites - list

```shell
vnv-cli bal sharepoint site <site-id> webs ||
vnv-cli bal sharepoint site <site-id> webs list
```

## Sharepoint Site - Subsite

### Subsites - help

```shell
vnv-cli bal sharepoint site <site-id> web -h
```

### Subsites/lists - list

```shell
vnv-cli bal sharepoint site <site-id> web <web-id> lists ||
vnv-cli bal sharepoint site <site-id> web <web-id> lists list
```
