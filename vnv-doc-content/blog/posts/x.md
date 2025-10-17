---
title: "TUTORIEL BER"
description: "Génération d’excel avec BER.ExcelDocument"
summary: "Voyons comment générer son propre fichier excel à l'aide de typescript et de vnv-sdk."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: false
weight: 50
categories: ["Tutorial", "SDK-Tutorial"]
tags: ["Tutorial", "SDK", "BER", "Buisness Excel Reports", "Excel"]
contributors: ["Houthoofd Guillaume"]
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
## 🎯 Objectif

Utiliser le module ExcelDocument (une extension de exceljs.Workbook) pour générer facilement des rapports Excel multi-feuilles à partir d’objets métier.

## 🧱 1. Pré-requis

### 📦 Installation des dépendances :

Assurez-vous que les packages suivants sont installés :

```shell
npm install @infrasoftbe/vnv-sdk
```

Le module ExcelDocument est un wrapper interne basé sur exceljs, donc toute la documentation ExcelJS est applicable pour les personnalisations avancées (mise en forme, styles, fusions, etc.).

## ✨ 2. Génération rapide d’un document Excel

Voici comment composer un document Excel avec plusieurs onglets (worksheets) à partir de simples tableaux d’objets.

#### 🧩 Exemple basique :

```typescript
import { ExcelDocument } from '@infrasoftbe/vnv-sdk';

// Exemple de données
const clients = [
  { name: "ACME Corp", country: "Belgium", revenue: 120000 },
  { name: "Globex", country: "France", revenue: 98000 }
];

const commandes = [
  { id: 1001, product: "Laptop", quantity: 5 },
  { id: 1002, product: "Mouse", quantity: 15 }
];

// Création du document
const myDocument = ExcelDocument.createNewDocument({
  Clients: clients,
  Commandes: commandes,
});
```

##  📤 3. Export : Buffer ou Stream

Deux méthodes de sortie sont disponibles :

### 🧵 a. Écriture dans un flux (stream)

Idéal pour un serveur HTTP (par exemple dans une route Express) :

await myDocument.xlsx.write(response); // `response` = objet HTTP (ex: Express.js)

⚠️ Assurez-vous de définir les bons headers.

### 💾 b. Récupération d’un buffer

Utile pour sauvegarde, tests ou manipulation :

```typescript
const buffer = await myDocument.xlsx.writeBuffer();
// -> Peut être retourné via une API ou sauvegardé via fs
```

### 🎛️ 4. Structure attendue

La méthode createNewDocument() attend un objet dont chaque clé correspond à un nom de feuille Excel :

```typescript
ExcelDocument.createNewDocument({
  Feuille1: [ { col1: val, col2: val }, ... ],
  Feuille2: [ { col1: val, col2: val }, ... ],
});
```

🧠 Chaque ligne est automatiquement convertie en une ligne Excel, avec les clés comme en-têtes de colonnes.

### 🎨 5. Personnalisation avancée (via ExcelJS)

Comme ExcelDocument hérite de Workbook (ExcelJS), vous pouvez accéder à toutes les méthodes natives pour personnaliser :

#### ✅ Exemples de personnalisations :

```typescript
const sheet = myDocument.getWorksheet("Clients");

// Fusionner des cellules
sheet.mergeCells('A1:C1');

// Modifier la largeur des colonnes
sheet.columns = [
  { header: 'Nom', key: 'name', width: 30 },
  { header: 'Pays', key: 'country', width: 15 },
  { header: 'CA (€)', key: 'revenue', width: 20 }
];

// Ajouter du style à une cellule
sheet.getCell('A2').font = { bold: true, color: { argb: 'FF0000' } };
```

👉 Voir la doc officielle [ExcelJs 📘](https://www.npmjs.com/package/exceljs#writing-xlsx).
