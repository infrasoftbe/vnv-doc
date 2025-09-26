---
title : Release Notes - vnv-sdk - Version 1.0.2-1
---

**Date de release** : 15 juillet 2025  
**Commit** : 89dfbaee2de7a74833dc200b51dac03fba297c43

## 📋 Résumé
Cette release est une correction technique qui améliore la gestion des URL dans le SDK en migrant vers la bibliothèque 'url-js' et en améliorant les déclarations TypeScript. Il s'agit d'une mise à jour de patch qui corrige des problèmes de dépendances et améliore la compatibilité.

## 🔧 Corrections techniques

### 📦 Migration des dépendances URL
- **Changement d'import URL** (commit fdd3d5c)
  - Migration de `'url'` vers `'url-js'` dans `src/depts.ts`
  - Ajout de déclarations TypeScript pour le module 'url-js'
  - **7 lignes ajoutées, 1 ligne supprimée** dans 2 fichiers

- **Mise à jour des imports internes** (commit b40ca4b)
  - Changement de l'import URL vers `@depts` dans `packages/api-layer/layer/fatory.ts`
  - Amélioration de la signature du constructeur URL avec paramètre `baseUrl` optionnel
  - **2 lignes modifiées** dans 2 fichiers

### 🏗️ Améliorations TypeScript
- **Nouvelles déclarations de types**
  - Ajout du module `'url-js'` dans `src/Globals.d.ts`
  - Amélioration de la signature du constructeur URL
  - Support TypeScript complet pour la nouvelle dépendance

### 🔧 Mise à jour de version
- **Numérotation de patch** : Passage de 1.0.2-0 vers 1.0.2-1
  - Mise à jour du `package.json`
  - Mise à jour du `package-lock.json`

## 📝 Détails techniques

### Fichiers modifiés
- `src/depts.ts` - Migration de l'import URL vers 'url-js'
- `src/Globals.d.ts` - Ajout des déclarations TypeScript et amélioration du constructeur URL
- `packages/api-layer/layer/fatory.ts` - Mise à jour de l'import URL vers @depts
- `package.json` - Mise à jour de version
- `package-lock.json` - Mise à jour correspondante

### Changements d'API
- **Import URL** : Migration de `'url'` vers `'url-js'`
- **Constructeur URL** : Ajout du paramètre optionnel `baseUrl`
- **Import interne** : Utilisation de `@depts` pour l'import URL dans les couches API

## 🏷️ Informations de version
- **Version précédente** : 1.0.2-0
- **Version actuelle** : 1.0.2-1
- **Type de release** : Correction technique (patch)
- **Compatibilité** : ✅ Rétrocompatible
- **Breaking changes** : ❌ Aucun

## 🎯 Impact
- **Développeurs** : Amélioration de la gestion des URL avec une bibliothèque plus moderne
- **TypeScript** : Meilleur support de types pour les opérations URL
- **Maintenance** : Dépendances plus cohérentes et mieux typées

## 🐛 Problèmes résolus
- Correction des problèmes d'import URL
- Amélioration de la compatibilité TypeScript
- Standardisation de l'utilisation des URL dans le SDK

## 📦 Migration
Aucune migration nécessaire pour les utilisateurs finaux. Les changements sont internes au SDK et n'affectent pas l'API publique.

---
*Cette release améliore la robustesse technique du SDK avec une meilleure gestion des URL et un support TypeScript amélioré.*
