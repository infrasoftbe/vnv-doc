---
sidebar_position: 1
---

# Introduction au VPI (Virtual Project Interface)

Un **Project DUMP** provient directement de la base de données et contient toutes les données d'un projet VNV au format JSON.

Un **VPI** (Virtual Project Interface) est une interface virtuelle de projet, c'est-à-dire une représentation virtuelle d'un projet permettant d'interagir avec celui-ci de manière simplifiée et structurée.

:::tip
  Le package [@infrasoftbe/vnv-sdk](https://github.com/infrasoftbe/Infrasoft-vnv-ritual-project/pkgs/npm/vnv-sdk) est hébergé sur GitHub Packages. **Notez qu'il est nécessaire de disposer d'un token d'authentification distribué par l'administrateur pour pouvoir utiliser ce package.** Vous devez également être membre de l'organisation Infrasoft pour y avoir accès.
:::

## Installation

Pour installer ce package, utilisez npm :

```bash
npm install @infrasoftbe/vnv-sdk@latest
```

## Project DUMP et VPI : quelles différences ?

- Un **Project DUMP** est un fichier JSON brut, ce qui signifie qu'il faut effectuer des manipulations manuelles dans l'objet pour interagir avec le projet.
- Un **VPI** se construit à partir d'un DUMP et permet d'interagir avec celui-ci de manière unifiée et globale. Lorsqu'un élément est créé et qu'il implique la création d'un lien, celui-ci est automatiquement géré par le VPI, permettant de réduire les interactions et de les simplifier.

Le VPI offre également des fonctionnalités de recherche, d'ajout, de mise à jour et de suppression de données. Il utilise un système de calcul de différences (diff) entre les opérations qui s'exécutent dans le VPI, permettant une gestion de l'historique des modifications ainsi qu'un système possible d'annulation/rétablissement (undo/redo).

Ce sont ces différences qui sont utilisées pour appliquer les changements effectués dans un VPI vers le projet stocké dans la base de données.

## Architecture d'un projet VNV

Un projet VNV est constitué de plusieurs composants principaux :

### Types de données contenues dans le DUMP

Le dump est un objet clé-valeur contenant plusieurs champs principaux :

- **`self`** : Contient les informations du projet lui-même ainsi que ses métadonnées
- **`data.nodes`** : Contient les nœuds (nodes) du projet
- **`data.relations`** : Contient les relations entre les nœuds du projet
- **`data.metas`** : Contient les métadonnées des nœuds, structures et listes
- **`data.structures`** : Contient les structures du projet
- **`data.lists`** : Contient les listes du projet

### Types de données contenues dans le VPI

Le VPI contient les mêmes jeux de données que le JSON DUMP, à ceci près qu'il ajoute des utilitaires permettant de faciliter les interactions. Il modifie également certains types de données, comme les tableaux qui sont remplacés par des Map, permettant d'effectuer des accès directs plutôt que des recherches sur les jeux de données.

Cette optimisation améliore considérablement les performances lors de la manipulation de gros volumes de données.

## Avantages du VPI

1. **Interface unifiée** : Simplifie les interactions avec les données du projet
2. **Gestion automatique des liens** : Les relations sont créées automatiquement lors d'opérations
3. **Optimisation des performances** : Utilisation de Map au lieu d'arrays pour un accès direct
4. **Traçabilité** : Système d'opérations pour suivre tous les changements
5. **Synchronisation** : Calcul de différences pour une synchronisation efficace avec la base de données

