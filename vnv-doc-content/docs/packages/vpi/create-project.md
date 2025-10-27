---
title: "Utilisation d'un VPI"
weight: 2302
---
# Utilisation d'un VPI

Ce guide montre comment créer et utiliser un VPI (Virtual Project Interface) en utilisant le package @infrasoftbe/infrasoft-project.

{{< callout context="tip" title="Note sur l'instanciation" icon="outline/lightbulb" >}}
Le VPI s'instancie avec le package `VPI` du SDK `@infrasoftbe/vnv-sdk`. Dans les exemples suivants, nous utilisons `@infrasoftbe/infrasoft-project` qui fournit les mêmes fonctionnalités dans un contexte réel avec interaction avec des bases de données.
{{< /callout >}}

## Initialisation d'un VPI

Le VPI s'instancie avec le package `VPI` du SDK :

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

const JSONDump = /* votre dump JSON */;

const vpi = vnv.VPI.ProjectInstance.init(JSONDump);
```

Une fois instancié, le VPI est prêt à être utilisé pour toutes les opérations sur le projet.

### Exemple d'initialisation minimaliste

Voici comment vous pouvez initialiser un projet VNV avec un token de projet :

```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

// Initialisation d'un projet minimaliste
let project = vnv.VPI.ProjectInstance.init({
  self: { token: 'my-project-token' },
  data : {
    nodes : [],
    metas : [],
    relations : [],
    structures: [],
    lists: []
  }
});
```

## Pourquoi utiliser init() ?

La méthode `ProjectInstance.init()` est utilisée pour initialiser un projet VNV en retournant un `ProxyProjectInstance`. Ce proxy permet un accès direct à toutes les couches et sous-couches du projet, ce qui facilite les manipulations et interactions avec le projet.

Si vous utilisez simplement `new ProjectInstance(...)`, cela retournera une instance de `ProjectInstance`, qui n'expose pas les couches et sous-couches de manière aussi pratique. Le [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) généré par `init` encapsule l'instance du projet et étend ses fonctionnalités, rendant chaque aspect du projet plus accessible et manipulable.

### Avantages du ProxyProjectInstance

1. **Accès simplifié** : Interaction directe avec les données du projet
2. **Fonctionnalités étendues** : Méthodes supplémentaires pour la manipulation des données
3. **Performance optimisée** : Accès direct aux couches de données
4. **Gestion automatique** : Liens et relations gérés automatiquement

## Structure du VPI une fois initialisé

Une fois initialisé, le VPI expose plusieurs propriétés et méthodes pour interagir avec le projet :

- **Données** : Accès aux nodes, relations, métadonnées, structures et listes
- **Opérations** : Traçage et gestion des modifications
- **Utilitaires** : Méthodes pour la recherche, validation et manipulation
- **Tokens** : Gestion des identifiants uniques

L'interface fournie par le VPI simplifie considérablement le travail avec les projets VNV en encapsulant la complexité du format JSON brut dans une API intuitive et puissante.
