---
title: Validation procedures
contributors:
  - Houthoofd Guillaume
date: 2026-03-10
---

Dans un projet de grande envergure, les transits de données doivent être validés.
Ainsi, dans le projet VNV, une multitude de processus de validation prennent place tant la donnée initiale doit être mise dans la bonne forme pour que le système puisse correctement interpréter et processer la data.

## Types de données

Notre système supporte quatre formats de données principaux, chacun ayant un rôle spécifique dans le cycle de vie des projets.

> **📖 Pour une description détaillée des formats Excel et ZIP (ESS), consultez le [Guide des formats ESS et VPI](../guide-ess-and-vpi-import-format).**

### Vue d'ensemble des formats

| Format | Description | Rôle |
|--------|-------------|------|
| **Excel (.xlsx)** | Format de base avec worksheets structurés | Import initial, export, archivage |
| **ZIP (ESS)** | Archive complète avec fichiers et arborescence | Session de travail, transfert, backup |
| **JSON Dataset** | Format pivot avec métadonnées inline (`@meta.*`) | Validation, transformation, debugging |
| **JSON VPI** | Format hiérarchique pour base de données | Stockage Neo4j, opérations métier |

### Hiérarchie des formats

```mermaid
graph LR
    EXCEL[Excel .xlsx<br/>Format utilisateur]
    DATASET[JSON Dataset<br/>Format pivot]
    VPI[JSON VPI<br/>Format DB]
    ZIP[ZIP ESS<br/>Archive complète]
    
    EXCEL -.->|"worksheets"| DATASET
    DATASET -.->|"transform"| VPI
    VPI -.->|"+ files"| ZIP
    
    style DATASET fill:#4a90e2,color:#fff
    style VPI fill:#50c878,color:#fff
```

**Caractéristiques clés :**

- **Excel** : Worksheets `#Project`, `#Itm#*`, `#Str#*`, `#Lst#*`, `#Rel` (voir [guide détaillé](../guide-ess-and-vpi-import-format#vpi---excel-format))
- **Dataset** : Même structure qu'Excel mais en JSON avec `@meta.*` flatten
- **VPI** : Structure `{ self, data: { nodes, meta, structures, lists, relations } }`
- **ZIP ESS** : Contient le projet (`.xlsx` ou `.json`) + arborescence de fichiers (voir [structure ZIP](../guide-ess-and-vpi-import-format/#ess---zip-format))

## Transformations

La data entrante peut être un Excel, ZIP ou JSON. Tous ces formats sont transformables entre eux via le **Dataset** qui agit comme format pivot central.

```mermaid
graph TB
    subgraph "Formats d'entrée"
        EXCEL[Excel .xlsx]
        ZIP[ZIP ESS]
        JSON_VPI[JSON VPI]
    end
    
    subgraph "Format Pivot"
        DATASET[JSON Dataset]
    end
    
    subgraph "Formats de sortie"
        EXCEL_OUT[Excel .xlsx]
        ZIP_OUT[ZIP ESS]
        VPI_OUT[JSON VPI]
    end
    
    EXCEL -->|XlsBufferToDataset| DATASET
    ZIP -->|ZipBufferToVpi<br/>puis VpiToDataset| DATASET
    JSON_VPI -->|VpiToDataset| DATASET
    
    DATASET -->|DatasetToXls| EXCEL_OUT
    DATASET -->|DatasetToVpi<br/>puis VpiToZip| ZIP_OUT
    DATASET -->|DatasetToVpi| VPI_OUT
    
    style DATASET fill:#4a90e2,color:#fff
    style EXCEL fill:#50c878
    style ZIP fill:#ff6b6b
    style JSON_VPI fill:#feca57
```

### Parsers disponibles

Le système fournit un ensemble complet de parsers bidirectionnels via la classe `ProjectEngineParsers` :

#### **Excel ↔ Dataset**
```typescript
// Excel → Dataset
ProjectEngineParsers.XlsBufferToDataset(buffer: Buffer): Promise<JSONDataset>

// Dataset → Excel
ProjectEngineParsers.DatasetToXls(dataset: JSONDataset): Promise<ExcelDocument>
```

#### **Dataset ↔ VPI**
```typescript
// Dataset → VPI
ProjectEngineParsers.DatasetToVpi(dataset: JSONDataset): Promise<ProxyProjectInstance>

// VPI → Dataset
ProjectEngineParsers.VpiToDataset(vpi: ProxyProjectInstance): Promise<JSONDataset>
```

#### **Excel ↔ VPI (Raccourcis)**
```typescript
// Excel → VPI (via Dataset)
ProjectEngineParsers.XlsBufferToVpi(buffer: Buffer): Promise<ProxyProjectInstance>

// VPI → Excel (via Dataset)
ProjectEngineParsers.VpiToXls(vpi: ProxyProjectInstance): Promise<ExcelDocument>
```

#### **ZIP ↔ VPI**
```typescript
// ZIP → VPI
ProjectEngineParsers.ZipBufferToVpi(buffer: Buffer): Promise<ProxyProjectInstance>

// VPI → ZIP
ProjectEngineParsers.VpiToZip(vpi: ProxyProjectInstance): Promise<Buffer>
```

### Pipeline de transformation

Voici les étapes détaillées pour chaque transformation :

#### 1. Excel → Dataset → VPI

```mermaid
sequenceDiagram
    participant Excel
    participant Parser as XlsBufferToDataset
    participant Validator as ValidateWorksheetData
    participant Engine as DatasetToVpi
    participant VPI

    Excel->>Parser: Buffer
    Parser->>Parser: Extraction des worksheets
    Parser->>Parser: Composition headers + values
    Parser-->>Validator: Dataset brut
    
    Validator->>Validator: ValidateWorkbookFormat
    Validator->>Validator: ValidateWorksheetData
    Validator->>Validator: Vérification tokens
    Validator->>Validator: Vérification relations
    
    Validator-->>Engine: Dataset validé
    
    Engine->>Engine: Extraction nodes/structures/lists
    Engine->>Engine: Génération tokens manquants
    Engine->>Engine: Unflatten @meta.*
    Engine->>Engine: Création relations
    Engine->>Engine: Mapping token transformations
    
    Engine-->>VPI: ProxyProjectInstance
```

**Étapes clés :**

1. **Extraction** : Lecture des worksheets Excel et conversion en objets JSON
2. **Composition** : Alignement des headers avec les valeurs
3. **Validation format** : Vérification des noms de worksheets
4. **Validation données** : Vérification de la structure des données
5. **Unflatten** : Conversion `@meta.prop` → `meta: { prop: value }`
6. **Génération tokens** : Création de tokens valides si absents ou invalides
7. **Création VPI** : Construction de l'instance avec nœuds, métadonnées et relations

#### 2. VPI → Dataset → Excel

```mermaid
sequenceDiagram
    participant VPI
    participant Engine as VpiToDataset
    participant Parser as DatasetToXls
    participant Excel

    VPI->>Engine: ProxyProjectInstance
    Engine->>Engine: Extraction self (projet)
    Engine->>Engine: Extraction nodes par type
    Engine->>Engine: Extraction structures/lists
    Engine->>Engine: Flatten meta -> @meta.*
    Engine->>Engine: Formatage relations
    
    Engine-->>Parser: Dataset
    
    Parser->>Parser: Création workbook
    Parser->>Parser: Création worksheets
    Parser->>Parser: Écriture données
    
    Parser-->>Excel: Buffer
```

**Étapes clés :**

1. **Extraction** : Récupération des nœuds, structures, listes depuis le VPI
2. **Flatten** : Conversion `meta: { prop }` → `@meta.prop`
3. **Groupement** : Organisation par type dans des worksheets
4. **Formatage relations** : Ajout des types from/to
5. **Génération Excel** : Création du fichier avec en-têtes et données

#### 3. ZIP → VPI

```mermaid
sequenceDiagram
    participant ZIP
    participant Validator as isValidZIPESS
    participant Parser as ZipBufferToVpi
    participant VPI

    ZIP->>Validator: Buffer + originalname
    Validator->>Validator: Extraction archive
    Validator->>Validator: Vérification projet (.xlsx/.json)
    Validator->>Validator: Validation contenu projet
    Validator->>Validator: Calcul checksums (sha256)
    Validator->>Validator: Vérification structure dossiers
    Validator->>Validator: Match files avec metadata
    
    alt Validation réussie
        Validator-->>Parser: Archive validée
        Parser->>Parser: Extraction projet
        Parser->>Parser: Parsing Excel ou JSON
        Parser->>Parser: Création nodes files
        Parser->>Parser: Ajout metadata (url, digest)
        Parser->>Parser: Reconstruction arborescence
        Parser->>Parser: Création relations
        Parser-->>VPI: ProxyProjectInstance complet
    else Validation échouée
        Validator-->>ZIP: Erreurs de validation
    end
```

**Étapes clés :**

1. **Extraction** : Décompression du ZIP
2. **Validation structure** : Vérification présence du fichier projet
3. **Validation checksums** : Calcul SHA256 et comparaison avec métadonnées
4. **Parsing projet** : Conversion Excel/JSON → VPI
5. **Enrichissement files** : Ajout des métadonnées de fichiers (digest, url)
6. **Reconstruction arborescence** : Création des structures et enfants
7. **Création relations** : Linking files avec structures

#### 4. VPI → ZIP

```mermaid
sequenceDiagram
    participant VPI
    participant Parser as VpiToZip
    participant ZIP

    VPI->>Parser: ProxyProjectInstance
    Parser->>Parser: Conversion VPI → Excel
    Parser->>Parser: Récupération nodes type=file
    Parser->>Parser: Query relations file→structure
    Parser->>Parser: Construction arborescence
    
    loop Pour chaque structure
        Parser->>Parser: Création dossiers nested
        Parser->>Parser: Ajout fichiers dans paths
    end
    
    Parser->>Parser: Gestion orphan files
    Parser->>Parser: Archivage avec Archiver
    
    Parser-->>ZIP: Buffer
```

**Étapes clés :**

1. **Export Excel** : Conversion VPI → Dataset → Excel
2. **Query files** : Récupération de tous les nœuds de type `file`
3. **Résolution paths** : Détermination du path de chaque fichier via relations
4. **Construction arborescence** : Création récursive des dossiers
5. **Archivage** : Compression avec archiver (jszip)

## Validations

Le système implémente plusieurs couches de validation pour garantir l'intégrité des données à chaque étape.

### Architecture de validation

```mermaid
graph TB
    subgraph "Point d'entrée"
        INPUT[Fichier entrant]
    end
    
    subgraph "Validation Format"
        V_FORMAT{Type de fichier?}
        V_EXCEL[isValidExcel]
        V_JSON_DATASET[isValidJSONDataset]
        V_JSON_VPI[isValidJSONVPI]
        V_ZIP[isValidZIPESS]
    end
    
    subgraph "Validation Structure"
        V_WORKBOOK[ValidateWorkbookFormat]
        V_WORKSHEET[ValidateWorksheetData]
        V_VPI_SCHEMA[ProjectDefinitionSchema]
        V_ZIP_CONTENT[Archive Content Check]
    end
    
    subgraph "Validation Métier"
        V_TOKENS[Token Reconciliation]
        V_RELATIONS[Unlinked Nodes Check]
        V_METADATA[Missing Metadata Check]
        V_CHECKSUMS[File Checksums Match]
    end
    
    subgraph "Résultat"
        SUCCESS[Validation Success]
        ERROR[Validation Errors]
    end
    
    INPUT --> V_FORMAT
    
    V_FORMAT -->|.xlsx| V_EXCEL
    V_FORMAT -->|.json dataset| V_JSON_DATASET
    V_FORMAT -->|.json vpi| V_JSON_VPI
    V_FORMAT -->|.zip| V_ZIP
    
    V_EXCEL --> V_WORKBOOK
    V_EXCEL --> V_WORKSHEET
    V_JSON_DATASET --> V_WORKBOOK
    V_JSON_DATASET --> V_WORKSHEET
    V_JSON_VPI --> V_VPI_SCHEMA
    V_ZIP --> V_ZIP_CONTENT
    
    V_WORKBOOK --> V_TOKENS
    V_WORKSHEET --> V_TOKENS
    V_VPI_SCHEMA --> V_TOKENS
    V_ZIP_CONTENT --> V_CHECKSUMS
    
    V_TOKENS --> V_RELATIONS
    V_RELATIONS --> V_METADATA
    V_CHECKSUMS --> V_METADATA
    
    V_METADATA --> SUCCESS
    V_METADATA --> ERROR
    
    style SUCCESS fill:#50c878
    style ERROR fill:#ff6b6b
    style V_FORMAT fill:#4a90e2,color:#fff
```

### 1. Validation Excel

**Fonction :**
```typescript
isValidExcel(excel: Buffer, collect: boolean): Promise<ValidationResult | boolean>
```

**Processus :**

1. **Conversion** : Excel Buffer → Dataset via `XlsBufferToDataset`
2. **Validation Dataset** : Appel de `isValidJSONDataset`

**Retourne :**
- `collect = false` : `boolean` (valide ou non)
- `collect = true` : `ValidationResult` détaillé avec erreurs

### 2. Validation JSON Dataset

**Fonction :**
```typescript
isValidJSONDataset(jsonData: Record<string, any>, collect: boolean): ValidationResult | boolean
```

**Validations effectuées :**

#### a. Format du Workbook (`ValidateWorkbookFormat`)
```typescript
refiners.isProjectTabName(data, context)
// ✓ Présence obligatoire du worksheet "#Project"

refiners.isValidTabsNames(data, context)
// ✓ Noms de worksheets conformes aux patterns
// ✓ #Itm#[Type]s pour les items
// ✓ #Str#[Nom] pour les structures
// ✓ #Lst#[Nom] pour les listes
// ✓ #Rel pour les relations
```

#### b. Données du Worksheet (`ValidateWorksheetData`)
```typescript
refiners.isValidNodeList(nodes, context)
// ✓ Validation schéma Zod pour chaque node
// ✓ Propriétés obligatoires : token, type, name

refiners.isValidStructureStack(structures, context)
// ✓ Validation schéma structures
// ✓ Propriétés : token, type, name

refiners.isValidListStack(lists, context)
// ✓ Validation schéma lists

refiners.isValidRelationList(relations, context)
// ✓ Validation schéma relations
// ✓ Propriétés : from_token, to_token, r_type, from_type, to_type

refiners.isValidChildsList(childs, context)
// ✓ Validation enfants de structures/lists
```

#### c. Cohérence Métier
```typescript
refiners.checkForTokenReconcilationValidity(data, context)
// ✓ Si token valide fourni → external_token obligatoire
// ✓ Si external_token fourni → token doit être valide
// ✓ Détecte les incohérences de synchronisation

refiners.checkForUnlinkedNodes(data, context)
// ✓ Tous les tokens référencés dans relations existent
// ✓ from_token doit matcher un node existant
// ✓ to_token doit matcher un node existant

refiners.checkForRelationsKinds(data, context)
// ✓ Types de relations valides (CONTAINS, HAS_LINK, HAS_CHILD, etc.)

refiners.checkForMissingMetadata(data, context)
// ✓ Métadonnées obligatoires présentes selon le type
```

**Structure de ValidationResult :**
```typescript
{
  success: boolean,
  msg?: string,
  errors?: ZodError[] // Détails des erreurs par path
}
```

### 3. Validation JSON VPI

**Fonction :**
```typescript
isValidJSONVPI(jsonData: Record<string, any>, collect: boolean): Promise<ValidationResult | boolean>
```

**Validations effectuées :**

#### a. Schéma VPI
```typescript
refiners.isValidVPI(jsonData, context)
// ✓ Structure conforme au ProjectDefinitionSchema
// ✓ Présence de self
// ✓ Présence de data { nodes, meta, relations, structures, lists }
```

#### b. Cohérence des tokens
```typescript
refiners.checkForTokenReconcilationValidity(jsonData, context)
// ✓ Mapping token ↔ external_token dans metadata
// ✓ Tokens valides pour nodes synchronisés
```

#### c. Réconciliation et validation finale
```typescript
// Conversion VPI → Dataset → VPI pour test de cohérence
let reconciliationResult = await reconciliateDumpTokens(jsonData)
return reconciliationResult.isValid()
```

**La fonction `reconciliateDumpTokens` :**
- Reconstruit un VPI complet depuis le dump
- Applique les métadonnées
- Reconstruit les structures et listes avec enfants
- Reformate les relations
- Retourne un `ProxyProjectInstance` validé

### 4. Validation ZIP ESS

**Fonction :**
```typescript
isValidZIPESS(file: { buffer: Buffer, originalname: string }): Promise<ValidationResult>
```

**Validations effectuées :**

#### a. Structure de l'archive
```typescript
archiveSchema.refine((files) => {
  // ✓ Présence de {token}/{token}.xlsx OU {token}/{token}.json
})
```

#### b. Validation du fichier projet
```typescript
if (ext == '.xlsx') {
  projectDefValidation = await isValidExcel(fileContentBuffer, true)
} else if (ext == '.json') {
  projectDefValidation = await isValidJSONVPI(JSON.parse(jsonString), true)
}
// ✓ Le fichier projet doit être valide
```

#### c. Calcul des checksums
```typescript
for (const filekey of Object.keys(files)) {
  files[filekey]['digest'] = `sha256-${toHex(sha256(compressedContent))}`
}
// ✓ Calcul SHA256 pour chaque fichier
```

#### d. Vérification de l'arborescence
```typescript
// Construction des paths attendus depuis les structures de type 'file'
let deductedDirPathsLists = await (async () => {
  let vpi = await ProjectEngine.DatasetToVpi(projectDefValidation.data)
  
  // Récupération des structures de type 'file'
  const document_structures = structures.filter(str => 
    str.meta.type == "file"
  )
  
  // Construction récursive des paths
  let composeDirPaths = (strNodes, basePath) => {
    // Retourne tous les paths possibles
  }
  
  return dirs
})()
```

#### e. Validation des paths
```typescript
directoriesAndStructuresValidator
  .superRefine((data, ctx) => {
    // ✓ Tous les paths attendus existent dans l'archive
    pathPatterns.forEach((pattern) => {
      const hasMatch = fsPaths.some(fsPath => pattern.test(fsPath))
      if (!hasMatch) {
        ctx.addIssue({ message: `Missing dir path: ${path}` })
      }
    })
  })
  .superRefine((data, ctx) => {
    // ✓ Pas de fichiers/dossiers en trop
    fsPaths.forEach((fsPath) => {
      const isMatched = pathPatterns.some(pattern => pattern.test(fsPath))
      if (!isMatched) {
        ctx.addIssue({ message: `Extra dir: ${fsPath}` })
      }
    })
  })
```

#### f. Matching files avec metadata
```typescript
const x_files = vpi_files.filter((file_node) => {
  const correspondance = Object.values(files).find(
    filekey => file_node.meta['contentDigest'] == filekey['digest']
  )
  if (correspondance) return true
})

if (x_files.length < Object.values(files).length) {
  console.warn('Not all files in archive are referenced in project definition')
}
// ✓ Tous les fichiers ont un contentDigest matchant
```

**Résultat de validation ZIP :**
```typescript
{
  success: boolean,
  msg?: string,
  errors?: {
    code: string,
    message: string,
    path: string[]
  }[]
}
```

## Validation steps

### Fonctionnalités

```mermaid
graph LR
    VALIDATOR{Type?}
    
    subgraph "Validations"
        V_EXCEL[BER.isValidExcel]
        V_DATASET[BER.isValidJSONDataset]
        V_VPI[BER.isValidJSONVPI]
        V_ZIP[BER.isValidZIPESS]
    end
    
    RESULT[Résultats JSON]
    
    VALIDATOR -->|.xlsx/.xls| V_EXCEL
    VALIDATOR -->|.json| V_DATASET
    VALIDATOR -->|.json| V_VPI
    VALIDATOR -->|.zip| V_ZIP
    
    V_EXCEL --> RESULT
    V_DATASET --> RESULT
    V_VPI --> RESULT
    V_ZIP --> RESULT
    
    style RESULT fill:#50c878,color:#fff
```

## Import et utilisation dans les contrôleurs

### Contrôleur d'import ESS

Ce contrôleur orchestre l'import de projets depuis différents formats.

#### Méthodes principales

##### 1. `createProjectFromDataset`

Crée un projet depuis un Dataset JSON ou Excel.

**Workflow :**
```mermaid
sequenceDiagram
    participant Client
    participant Controller as ImportController
    participant Validator
    participant Engine as ProjectEngine
    participant Neo4j
    participant Minio

    Client->>Controller: POST /import/dataset
    Controller->>Controller: Détection MIME type
    
    alt Format Excel
        Controller->>Engine: XlsBufferToDataset
        Engine-->>Controller: Dataset
    else Format JSON
        Controller->>Controller: Parse JSON
    end
    
    Controller->>Validator: isValidJSONDataset
    
    alt Validation échouée
        Validator-->>Client: 400 Bad Request
    else Validation réussie
        Validator-->>Controller: Dataset validé
        
        Controller->>Engine: DatasetToVpi
        Engine-->>Controller: VPI
        
        Controller->>Controller: Création node file
        Controller->>Controller: Ajout metadata
        Controller->>Neo4j: Sauvegarde projet
        Controller->>Minio: Upload fichier
        Controller->>Controller: Création ZIP ESS
        
        Controller-->>Client: 200 Success + projectDump
    end
```

**Opérations effectuées :**
- Validation du format et des données
- Conversion en VPI
- Création d'un nœud `file` pour le fichier source
- Ajout des métadonnées (digest, URL, timestamps)
- Création d'une relation `CONTAINS` projet→file
- Sauvegarde dans Neo4j
- Upload du fichier dans Minio
- Génération d'un ZIP ESS

##### 2. `createProjectFromZipArchive`

Crée un projet depuis une archive ZIP ESS.

**Workflow :**
```mermaid
sequenceDiagram
    participant Client
    participant Controller as ImportController
    participant Validator as isValidZIPESS
    participant Parser as ZipBufferToVpi
    participant Neo4j
    participant Minio

    Client->>Controller: POST /import/zip
    
    Controller->>Validator: Validation archive
    Validator->>Validator: Vérification structure
    Validator->>Validator: Validation projet
    Validator->>Validator: Checksums
    Validator->>Validator: Paths matching
    
    alt Validation échouée
        Validator-->>Client: 400 Bad Request + détails erreurs
    else Validation réussie
        Validator-->>Controller: Archive validée
        
        Controller->>Parser: ZipBufferToVpi
        Parser->>Parser: Extraction projet
        Parser->>Parser: Parsing Excel/JSON
        Parser->>Parser: Enrichissement files
        Parser->>Parser: Reconstruction arbo
        Parser-->>Controller: VPI complet
        
        Controller->>Neo4j: Sauvegarde projet
        Controller->>Minio: Upload fichiers
        
        Controller-->>Client: 200 Success + projectDump
    end
```

**Opérations effectuées :**
- Validation complète de l'archive (structure, checksums, paths)
- Extraction et parsing du fichier projet
- Reconstruction du VPI avec tous les fichiers
- Matching des fichiers avec leurs métadonnées
- Sauvegarde dans Neo4j
- Upload des fichiers dans Minio avec préservation de l'arborescence

##### 3. Fonction `mergeProjects`

Fusionne un projet source dans un projet cible (update).

**Workflow :**
```mermaid
sequenceDiagram
    participant Source as Source VPI
    participant Merge as mergeProjects
    participant Target as Target VPI
    participant Neo4j

    Source->>Merge: ProxyProjectInstance source
    Target->>Merge: ProxyProjectInstance target
    
    loop Pour chaque opération
        Merge->>Merge: Analyse type (create/update/delete)
        
        alt CREATE
            Merge->>Target: addNode / addRelation / addStructure / addList
        else UPDATE
            Merge->>Merge: Comparaison timestamps
            alt Source plus récent
                Merge->>Target: Update node/relation/structure/list
            end
        else DELETE
            Merge->>Target: removeNode / removeRelation
        end
    end
    
    Merge->>Merge: Reconstruction children
    Merge->>Target: Mise à jour structures/lists
    
    Merge-->>Neo4j: Target VPI mis à jour
```

**Logique de merge :**

```typescript
// Pour chaque nœud
if (operationType === 'create') {
  target_projectInstance.addNode(data)
} else if (operationType === 'update') {
  let source_node = source_projectInstance.getNodeByToken(data.token)
  
  // Comparaison timestamps
  if (sourceCDT > targetCDT || sourceUDT > targetUDT) {
    target_projectInstance.updateNode(data)
  }
} else if (operationType === 'delete') {
  target_projectInstance.removeNode(data.token)
}
```

**Gestion des enfants de structures/lists :**
- Récupération des opérations sur les enfants
- Reconstruction complète des children
- Mise à jour des métadonnées structures/lists
- Préservation de l'ordre et de la hiérarchie

## Résumé des flux de données

### Import initial

```mermaid
graph LR
    USER[Utilisateur]
    EXCEL[Excel File]
    VALIDATOR[Validation]
    PARSER[Parser]
    VPI[VPI Instance]
    NEO4J[(Neo4j)]
    MINIO[(Minio)]
    ZIP[ZIP ESS]
    
    USER -->|Upload| EXCEL
    EXCEL --> VALIDATOR
    VALIDATOR -->|Valid| PARSER
    PARSER --> VPI
    VPI --> NEO4J
    VPI --> MINIO
    VPI --> ZIP
    
    VALIDATOR -.->|Invalid| USER
    
    style VALIDATOR fill:#feca57
    style VPI fill:#4a90e2,color:#fff
    style NEO4J fill:#3498db
    style MINIO fill:#27ae60
```

### Update depuis ZIP

```mermaid
graph LR
    USER[Utilisateur]
    ZIP[ZIP ESS]
    VALIDATOR[Validation ZIP]
    PARSER[ZipBufferToVpi]
    SOURCE[Source VPI]
    TARGET[Target VPI]
    MERGE[mergeProjects]
    NEO4J[(Neo4j)]
    
    USER -->|Upload| ZIP
    ZIP --> VALIDATOR
    VALIDATOR -->|Valid| PARSER
    PARSER --> SOURCE
    NEO4J -.->|Load existing| TARGET
    SOURCE --> MERGE
    TARGET --> MERGE
    MERGE --> NEO4J
    
    style MERGE fill:#9b59b6,color:#fff
    style SOURCE fill:#ff6b6b
    style TARGET fill:#50c878
```

## Bonnes pratiques

### Pour les développeurs

1. **Toujours valider avant transformation**
   ```typescript
   const validation = await BER.isValidExcel(buffer, true)
   if (!validation.success) {
     throw new Error(validation.msg)
   }
   const vpi = await ProjectEngineParsers.XlsBufferToVpi(buffer)
   ```

2. **Utiliser le mode `collect` pour le debugging**
   ```typescript
   // En production : retour boolean rapide
   const isValid = await BER.isValidExcel(buffer, false)
   
   // En dev : détails complets
   const result = await BER.isValidExcel(buffer, true)
   console.log(result.errors)
   ```

3. **Préférer le Dataset comme pivot**
   ```typescript
   // ✓ Bon : Excel → Dataset → VPI
   const dataset = await ProjectEngineParsers.XlsBufferToDataset(buffer)
   const vpi = await ProjectEngineParsers.DatasetToVpi(dataset)
   
   // ✗ Éviter : Excel → VPI direct sans contrôle
   ```

4. **Vérifier les checksums pour les ZIP**
   ```typescript
   const validation = await BER.isValidZIPESS({
     buffer,
     originalname: file.name
   })
   // Contient la validation des checksums et paths
   ```

### Pour les utilisateurs

1. **Format Excel** : Respecter la nomenclature des worksheets
   - `#Project` : obligatoire
   - `#Itm#[Type]s` : pour les items
   - `#Str#[Nom]` : pour les enfants de structures
   - `#Lst#[Nom]` : pour les enfants de listes
   - `#Rel` : pour les relations

2. **Format ZIP** : Structure attendue
   ```
   {token}.zip
   └── {token}/
       ├── {token}.xlsx
       └── Files/
           └── [structures]/
   ```

3. **Tokens** : Laisser vides pour génération automatique
   - Le système génère des tokens valides
   - Utiliser `external_token` pour la traçabilité

4. **Relations** : Toujours référencer des tokens existants
   - `from_token` et `to_token` doivent exister dans les nœuds

## Conclusion

Le système de validation et transformation VNV offre :

**Flexibilité** : Multiples formats supportés (Excel, JSON, ZIP)  
**Robustesse** : Validations multi-niveaux (format, structure, métier)  
**Traçabilité** : External tokens et timestamps  
**Intégrité** : Checksums et vérifications de cohérence  
**Debugging** : Application de validation dédiée  
**Performance** : Transformations optimisées avec mapping de tokens  

Le format **Dataset** agit comme pivot central, permettant des conversions bidirectionnelles entre tous les formats tout en garantissant la cohérence et la validité des données à chaque étape.
