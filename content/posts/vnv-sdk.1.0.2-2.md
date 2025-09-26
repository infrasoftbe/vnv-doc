---
title : Release Notes - vnv-sdk - Version 1.0.2-2
---

**Date de release** : 4 août 2025  
**Commit** : e034461a215f46c9d9f0b9892a0983d39316047a

## 📋 Résumé
Cette release améliore significativement la compatibilité du SDK avec les systèmes de modules ES et CommonJS, introduit un système de tests Jest complet, et ajoute des définitions de types de nœuds exhaustives. Il s'agit d'une mise à jour importante qui modernise l'infrastructure du projet sans casser la compatibilité API.

## ✨ Nouvelles fonctionnalités

### 📦 Support dual ES/CommonJS
- **Build système hybride** (commit b7516bf)
  - Support complet des modules ES et CommonJS
  - Configuration de build dual avec sorties séparées
  - Points d'entrée multiples dans `package.json`
  - Structure de distribution : `dist/esm/` et `dist/cjs/`
  - Génération automatique des `package.json` de type

### 🧪 Infrastructure de tests Jest
- **Configuration Jest complète** (commit 5ba1c39)
  - Ajout de Jest avec préset TypeScript
  - Support des path mappings complets (@vpi, @ber, @ApiLayer, etc.)
  - Couverture de code configurée (text, lcov, html)
  - Reporter markdown automatique avec `@thesheps/jest-md-reporter`
  - **59 lignes** de configuration Jest

### 📋 Définitions exhaustives des types de nœuds
- **Schémas JSON complets** (commit b95168a)
  - Fichier `node_types.json` avec 14 types de nœuds définis
  - Métadonnées complètes pour chaque type (1058 lignes)
  - Support des références externes (Excel, Jira, Relatics, TestLink, SharePoint, Graph365)
  - Structure standardisée avec timestamps et tokens

## 🔧 Améliorations techniques

### 🏗️ Refactoring du système de build
- **Scripts de build modulaires**
  - `build:esm` - Build ES modules avec résolution d'extensions .js
  - `build:cjs` - Build CommonJS avec alias TypeScript
  - `build:package-jsons` - Génération automatique des package.json de type
  - Watch mode séparé pour développement (`dev:esm`, `dev:cjs`)

### 📊 Rapports de tests automatisés
- **Test reporting** (commit 033026e)
  - Génération du rapport `test-report.v1.0.2-2.md`
  - 32 suites de tests, 201 tests individuels
  - Statistiques détaillées (83 passed, 118 failed)
  - Format markdown avec badges visuels

### 🔄 Améliorations BER
- **Refactoring des fonctions BER** (commit b6b9794)
  - Renommage `ProjectDefinitionToVPI` → `ProjectDatasetToVPI`
  - Nettoyage du code et suppression des commentaires obsolètes
  - Amélioration de la gestion des relations (`relations["#Rel"]`)
  - Optimisation de la détection des types de nœuds

### 🌐 Améliorations API Layer
- **Gestion URL améliorée** (commit a0893bc)
  - Logging de debug pour la configuration SDK
  - Construction d'URL robuste avec gestion des origins
  - Binding correct des fonctions dans les proxies
  - Export URL alternatif commenté pour référence future

## 🧹 Maintenance

### 📝 Tests des contrôleurs VPI
- **Tests des métadonnées** (commit d5f9030)
  - Tests complets pour `add-metadata.test.ts`
  - Vérification des émissions d'événements
  - Tests de création et récupération des métadonnées
  - Gestion de différents types de métadonnées

- **Tests des structures** (commit 250a45d)
  - Tests pour `add-structure-node.test.ts`
  - Vérification des relations parent-enfant
  - Tests de gestion des nœuds de structure existants
  - Validation des émissions d'événements

- **Tests des nœuds** (commit d445f61)
  - Refactoring complet des tests `add-node.test.ts`
  - Simplification des options de nœuds
  - Amélioration des assertions de relations
  - Tests de types de nœuds multiples

### 🗑️ Nettoyage
- **Suppression des artefacts temporaires** (commit e034461)
  - Suppression du fichier `changes/1.1.0-0.md` vide
  - Nettoyage des fichiers de release temporaires

## 📝 Détails techniques

### Nouveaux fichiers créés
- `jest.config.js` - Configuration Jest complète (59 lignes)
- `node_types.json` - Définitions exhaustives des types de nœuds (1058 lignes)
- `test-reports/test-report.v1.0.2-2.md` - Rapport de tests automatisé
- `packages/vpi/controllers/*.test.ts` - Suite de tests des contrôleurs VPI

### Fichiers modifiés majeurs
- `package.json` - Configuration dual module et scripts de build
- `packages/api-layer/layer/fatory.ts` - Améliorations URL et logging
- `packages/ber/functions/` - Refactoring des fonctions de transformation
- `packages/fetch-factory/config.ts` - Amélioration de la configuration
- `src/client.ts` - Ajout de logging de configuration
- `src/depts.ts` - Export URL alternatif documenté

### Configuration des modules
```json
{
  "main": "./dist/cjs/src/index.js",
  "module": "./dist/esm/src/index.js",
  "types": "./dist/types/src/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/src/index.js",
      "require": "./dist/cjs/src/index.js",
      "types": "./dist/types/src/index.d.ts"
    }
  }
}
```

### Couverture de tests
- **Modules testés** : VPI controllers, métadonnées, structures, nœuds
- **Path mappings** : Support complet des alias TypeScript dans Jest
- **Formats de rapport** : Console, LCOV, HTML, Markdown

## 🏷️ Informations de version
- **Version précédente** : 1.0.2-1
- **Version actuelle** : 1.0.2-2
- **Type de release** : Amélioration infrastructure (patch majeur)
- **Compatibilité** : Compatible avec les versions précédentes
- **Migration** : Aucune action requise, amélioration transparente

## 🔍 Notes de développement
Cette release pose les fondations pour un développement plus robuste avec :
- Support dual module pour une meilleure compatibilité d'écosystème
- Infrastructure de tests automatisée pour la qualité du code
- Définitions de types exhaustives pour une meilleure documentation
- Logging amélioré pour le debugging en développement
