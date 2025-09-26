---
title : Release Notes - vnv-sdk - Version 1.0.2-3
---

**Date de release** : 5 septembre 2025  
**Commit** : 2efbe6b895e3d3d255205a336ca38b7cd0854d62

## 📋 Résumé
Cette release introduit des améliorations majeures au système de gestion des projets avec le nouveau **ProjectEngine**, des optimisations significatives de l'API layer, et une couverture de tests étendue. Il s'agit d'une mise à jour importante qui modernise le traitement des données Excel et améliore la robustesse du SDK avec des outils de benchmarking et de reporting avancés.

## ✨ Nouvelles fonctionnalités

### 🏗️ ProjectEngine - Transformation XLS/JSON/VPI
- **Nouveau module ProjectEngine** (commits dd0fbca, 5ae898c)
  - Parseurs avancés pour transformation Excel → JSON → VPI
  - Support complet des fichiers Excel de projet (PR1001-001, PR1001-002)
  - Module `projectEngine/parsers.ts` avec **793 lignes** de logique de transformation
  - Intégration avec `ExcelDocument` renommé en `BaseXlsDocument`
  - Gestion des datasets avec mapping automatique des structures

### 📦 Package Archiver
- **Nouveau package archiver** (commit 14668b5)
  - Module `packages/archiver/index.ts` avec **90 lignes**
  - Gestion des archives ZIP et extraction de données
  - Remplacement de la dépendance jszip par une solution interne

### 📊 Système de benchmarking et reporting
- **Infrastructure de performance** (commit a1f0f97)
  - Configuration Jest dédiée pour benchmarks (`jest.benchmark.config.js`)
  - Reporter personnalisé `jest-performance-reporter.js` (**387 lignes**)
  - Scripts de benchmarking automatisés dans `/scripts/`
  - Rapports markdown automatiques avec métriques de performance

### 🔄 Layer de rapports DAL
- **Nouveaux clients de rapports** (commits 55758f7, b851c74)
  - `ReportClient`, `ReportConfigClient`, `ReportTemplateClient`
  - Intégration complète dans le DAL avec **175 lignes** ajoutées
  - Gestion des configurations et templates de rapports

### 🎯 Méthodes ESS étendues
- **Nouvelles méthodes documents** (commit 2efbe6b)
  - Méthodes `add` et `update` pour les couches documents (POST/PUT)
  - Méthode `clearSession` pour nettoyage des sessions ESS
  - Support des headers `content-type: application/json`

## 🔧 Améliorations techniques

### 🚀 Optimisations API Layer
- **Headers et types améliorés** (commit b4fa146)
  - Ajout systématique du header `content-type: application/json`
  - Refactorisation des signatures d'interfaces avec tuples de retour
  - Correction des inconsistances d'endpoints
  - **21 fichiers modifiés**, **242 insertions, 176 suppressions**

### 🔗 Gestion des tokens optimisée
- **Format de tokens amélioré** (commits 7d01c90, 472c913)
  - Migration vers notation dot pour structure et list child tokens
  - Logique de validation et analytics renforcée
  - Tests unitaires complets pour parsing et validation (**81 lignes** de tests)
  - Association automatique des nœuds enfants avec métadonnées parentes

### 🧪 Couverture de tests étendue
- **Tests VPI controllers** (commit 231aa35)
  - **866 lignes** de tests ajoutées pour 7 controllers
  - Tests pour : `get-node-metadata`, `get-relation-by-token`, `has-structure-node`
  - Tests pour : `query-all-metadatas`, `query-all-structure-node`, `set-node-metadata`

- **Tests formatage et structures** (commit 10d7161)
  - Tests `flattenFormaterNode` avec **47 lignes**
  - Support du flattening des instances de classes
  - Tests de conversion VPI et gestion des structures imbriquées

### 🔧 Refactorisation et debugging
- **Logging et URL handling** (commit a0893bc)
  - Logging console pour debugging dans Layer factory
  - Amélioration de la construction d'URL dans Layer factory
  - Binding correct des fonctions proxy

- **Configuration VS Code** (commit 472c913)
  - Ajout de `.vscode/launch.json` pour debugging (**145 lignes**)
  - Fichiers de debug dédiés pour tests et métadonnées

## 📈 Améliorations de performance

### ⚡ Optimisations du DataManager
- **Association nœuds-métadonnées** (commit 7d01c90)
  - Logique d'association optimisée avec nouveaux formats de tokens
  - **24 lignes** ajoutées au `data-manager.model.ts`

### 🔄 Refactorisation ProjectEngine
- **Parseurs optimisés** (commits b4fa146, 10d7161)
  - Logique de parsing améliorée pour datasets
  - Gestion robuste des mappings de fichiers
  - Debugging output pour traçabilité

## 🧪 Tests et validation

### 📊 Rapports de tests mis à jour
- **Rapport v1.0.2-3** : Suites complètes avec métriques détaillées
- **Tests d'intégration** : Données PR1001-001 et PR1001-002
- **Tests unitaires** : Couverture étendue des controllers VPI

### 🔄 Tests de régression
- **Consistency tokens** : Tests case-insensitive et génération dynamique
- **Structure handling** : Tests pour structures imbriquées et flat
- **Controller logic** : Validation des opérations CRUD

## 🛠️ Corrections et optimisations

### 🔧 Corrections techniques
- **Export DAL ReportClient** : Clarification des boundaries de modules
- **Token handling** : Standardisation case-insensitive
- **Event emission** : Arguments corrects pour opérations delete
- **URL construction** : Logique améliorée dans Layer factory

### 📦 Gestion des dépendances
- **Suppression jszip** : Remplacement par solution archiver interne
- **Mise à jour dépendances** : Nettoyage du `package-lock.json`

## 🚀 Workflows et automatisation

### 🔄 Workflows GitHub améliorés
- **Auto-release workflow** : Builds de développement automatisés
- **Nightly builds** : Publication intelligente sur nouveaux commits seulement
- **Release officielle** : Tests intégrés et gestion de version améliorée

## 🔍 Impact développeur

Cette release apporte des améliorations substantielles pour les développeurs :
- **Debugging facilité** avec logging et configuration VS Code
- **Performance tracking** avec outils de benchmarking
- **Robustesse accrue** avec couverture de tests étendue
- **API plus cohérente** avec headers standardisés
- **Transformation de données** simplifiée avec ProjectEngine

Les changements sont rétrocompatibles et n'affectent pas l'API publique existante.

---

**Commits principaux inclus :**
- `2efbe6b` - Add document methods and session clearing to ESS client
- `b4fa146` - Add content-type headers and update interfaces  
- `10d7161` - Add flattenFormaterNode tests and refactor logic
- `7d01c90` - Refactor token format and improve analytics
- `14668b5` - Add archiver package and update integration data
- `dd0fbca` - Refactor ExcelDocument and add ProjectEngine integration
- `a1f0f97` - Add benchmarking and performance reporting tools
- `231aa35` - Add unit tests for VPI controller functions
- `472c913` - Refactor token handling and update tests
- `46aa052` - Add auto-release workflow and improve automation
