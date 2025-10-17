---
title : Release Notes - vnv-sdk - Version 1.0.2-0
---

**Date de release** : 27 juin 2025  
**Commit** : 7c41d7e8fbf327b4ab8c23c37d95250cca955d10

## 📋 Résumé
Cette release introduit le support complet des nœuds et métadonnées de type "report" dans le package VPI, ainsi que l'ajout d'un workflow de release automatisé. Il s'agit d'une mise à jour mineure qui étend les fonctionnalités du SDK sans casser la compatibilité.

## ✨ Nouvelles fonctionnalités

### 📊 Support des rapports VPI
- **Nouveau type de nœud "report"** (commit 465186f)
  - Ajout du modèle `_report` avec schémas Zod complets
  - Ajout des métadonnées associées `_reportMetadata`
  - Intégration complète dans le système VPI existant
  - **115 lignes ajoutées** dans 9 fichiers

### 🔄 Automatisation CI/CD
- **Workflow de release nocturne** (commit 1daf403)
  - Ajout du fichier `.github/workflows/nightly-release.yml`
  - Automatisation des releases avec GitHub Actions
  - **59 lignes** de configuration de workflow

### 🔧 Mise à jour de version
- **Numérotation correcte** : Passage de 1.0.1-0 vers 1.0.2-0
  - Mise à jour du `package.json`
  - Mise à jour du `package-lock.json`

## 📝 Détails techniques

### Nouveaux fichiers créés
- `packages/vpi/models/nodes/report.ts` - Modèle du nœud report
- `packages/vpi/models/metadatas/report.ts` - Métadonnées du report
- `packages/vpi/schemas/node.report.ts` - Schéma Zod pour le nœud report (39 lignes)
- `packages/vpi/schemas/metadata.report.ts` - Schéma Zod pour les métadonnées
- `.github/workflows/nightly-release.yml` - Workflow de release automatisé

### Fichiers modifiés
- `packages/vpi/index.ts` - Ajout des exports pour les nouveaux types
- `packages/vpi/models/metadatas/index.ts` - Export des métadonnées report
- `packages/vpi/models/nodes/index.ts` - Export du nœud report
- `packages/vpi/schemas/index.ts` - Export des nouveaux schémas
- `packages/vpi/schemas/node.ts` - Intégration du type report
- `package.json` - Mise à jour de version
- `package-lock.json` - Mise à jour correspondante

## 🏷️ Informations de version
- **Version précédente** : 1.0.1-0
- **Version actuelle** : 1.0.2-0
- **Type de release** : Fonctionnalité mineure
- **Compatibilité** : ✅ Rétrocompatible
- **Breaking changes** : ❌ Aucun

## 🎯 Impact
- **Développeurs** : Nouveau type de nœud "report" disponible pour les applications VPI
- **CI/CD** : Automatisation des releases nocturnes
- **Maintenance** : Amélioration du processus de release

## 📦 Migration
Aucune migration nécessaire. Les nouvelles fonctionnalités sont additives et n'affectent pas le code existant.

---
*Cette release étend les capacités du SDK avec le support des rapports VPI et améliore le processus de développement avec l'automatisation CI/CD.*
