---
title : Release Notes - vnv-sdk - Version 1.0.0
---

**Date de release** : 16 juin 2025
**Commit** : 197fbf3147ddd0044f67bc9e7ee34d3b095d70c9

## ⚠️ Note importante

**Cette version contient une erreur de numérotation. Elle aurait dû porter le numéro 1.0.0 au lieu de 1.1.0-0.**

## 📋 Résumé

Cette release contient des améliorations significatives de l'architecture du vnv-sdk, incluant une refactorisation majeure des clients ESS, des corrections de bugs importantes dans les structures VPI, et des mises à jour complètes des couches distribuées.

## 🔧 Changements fonctionnels

### 🏗️ Améliorations de l'architecture

- **Mise à jour complète des couches distribuées** (commit 7fb984e)
  - Refactorisation de tous les clients ADM, DAL, ESS, MS Graph et SharePoint
  - Amélioration de la distribution des types pour le client ESS
  - Mise à jour de 47 fichiers dans les couches client

### 🐛 Corrections de bugs

- **Correction des structures complètes** (commit a88762f)

  - Amélioration de la gestion des structures VPI
  - Corrections dans les modèles de nœuds de structure
  - Mise à jour des couches ESS pour les listes et structures
- **Correction des liens de structure** (commit 2730469)

  - Ajout des liens de structure lors de la création d'enfants de structure
  - Amélioration des contrôleurs `add-structure-node` et `set-structure-node`
- **Correction des types de distribution ESS** (commit 5a67a07)

  - Refactorisation majeure du client ESS (232 lignes ajoutées)
  - Simplification des couches de projet
  - Amélioration de la gestion des documents, métadonnées, nœuds et relations

### 🔄 Autres corrections

- **Mise à jour VPI** (commit adb6182)
  - Corrections des liens de chargement VPI

### ⚠️ Erreur de versioning

- **Numérotation incorrecte** : Passage de 1.0.0 vers 1.1.0-0 (aurait dû être 1.0.0)
  - Mise à jour du `package.json`
  - Mise à jour du `package-lock.json`

## 📝 Détails techniques

- **47 fichiers modifiés** dans la mise à jour des couches distribuées
- **Refactorisation majeure** du client ESS avec 232 lignes ajoutées
- **Améliorations de performance** dans les structures VPI
- **Correction des types** et de la distribution des modules
- **Erreur de numérotation** corrigée dans la version suivante (1.0.1-0)

## 🏷️ Informations de version

- **Version précédente** : 1.0.0
- **Version actuelle** : 1.1.0-0 (incorrect, aurait dû être 1.0.0)
- **Version corrective** : 1.0.1-0
- **Type de release** : Erreur de versioning
- **Compatibilité** : Aucun impact sur la compatibilité

## 📂 Fichiers modifiés

### Clients et couches

- `src/clients/adm/` - Mise à jour complète de tous les fichiers
- `src/clients/dal/` - Refactorisation des couches de base de données
- `src/clients/ess/` - Refactorisation majeure (12 fichiers, 253 ajouts, 151 suppressions)
- `src/clients/ms/graph/` - Mise à jour des clients Microsoft Graph
- `src/clients/ms/sp/` - Mise à jour des clients SharePoint
- `src/clients/claim/index.ts`
- `src/utilities/capitalize.ts`

### Modèles VPI

- `packages/vpi/models/nodes/structure.ts` - Améliorations des structures
- `packages/vpi/controllers/add-structure-node.ts` - Nouvelles fonctionnalités
- `packages/vpi/controllers/set-structure-node.ts` - Corrections des liens

### Configuration

- `package.json` - Mise à jour de version (erreur de numérotation)
- `package-lock.json` - Mise à jour correspondante

## 🔄 Action corrective

Cette erreur a été identifiée et corrigée dans la release 1.0.1-0 qui rétablit la numérotation de version appropriée selon le schéma de versioning sémantique du projet.

---

*⚠️ Cette release ne devrait pas être utilisée en production. Utilisez la version 1.0.1-0 ou ultérieure qui corrige l'erreur de numérotation.*
