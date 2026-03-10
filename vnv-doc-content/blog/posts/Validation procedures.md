---
title: Validation procedures
contributors:
  - Houthoofd Guillaume
---

Dans un projet de grand eenvergure les transit de données doivent être validé.
Ainsi dans le projet vnv une multitude de processus de validation prennent place tant la donnée iunitiale doit être mise dans la bonne forme pour que le systeme puisse correctement interpréter et processer la data.

### Types de donnée
- Excel - Correspond au format de donnée le plus basique
- Zip - Correspond a un ESS. Un Ess continent un vpi ( donc un dump )
- JSON dataset - Il s'agit de la forme transitoire le de la donnée entre excel et json dump.
- JSON dump - il s'agit de la forme la plus conforme à ce que l'on retrouve dans la base de donnée sous format JSON.

### Transformation

La data entrante peut-être un dump , zip ou excel. Ceux-ci sont transformé en dataset lui même transformable en dump , zip ou excel.

```mermaid
```

#### Flows 

