---
sidebar_position: 3
---

# Système d'Opérations et Transactions

Le VPI utilise un système sophistiqué d'opérations pour tracer et gérer toutes les modifications apportées à un projet VNV.

## CRUD, Transactions et Opérations

Toutes les opérations sont stockées dans `vpi.operations`. Une opération représente une transaction entre deux états de données pour un élément donné, avec un calcul de différences sur les champs modifiés. Les valeurs sont stockées sous la forme `clé: [ancienneValeur, nouvelleValeur]`, permettant de conserver une trace de chaque modification.

## Structure d'une Opération

Une opération se structure de la manière suivante :

```typescript
interface Operation {
  _id: string;              // Identifiant interne de l'opération
  eventTime: number;        // Horodatage interne de l'opération
  method: string;           // Méthode CRUD associée (POST, UPDATE, DELETE)
  data: any;                // Données de l'opération
  operationtype: string;    // Type d'élément (node, relation, structure, etc.)
  operationId: string;      // Identifiant idempotent de l'opération
  ref: string;              // Référence interne à l'élément modifié
  delta: Record<string, [any, any]>; // Delta de la modification
}
```

### Exemple d'opération

```typescript
const operation = {
  _id: 'op_123456789',
  eventTime: 1698412800000,
  method: 'POST',
  data: {
    type: 'document',
    title: 'Nouveau document',
    content: 'Contenu du document'
  },
  operationtype: 'node',
  operationId: 'create_node_doc_2024_10_27_15_30',
  ref: 'node_abc123',
  delta: {
    title: [null, 'Nouveau document'],
    content: [null, 'Contenu du document'],
    createdAt: [null, '2024-10-27T15:30:00.000Z']
  }
};
```

## Types d'Opérations

### Opérations CRUD

#### CREATE (POST)
```typescript
// Exemple d'opération de création
const createOperation = {
  method: 'POST',
  operationtype: 'node',
  data: { /* nouvelles données */ },
  delta: {
    // Tous les champs passent de null aux nouvelles valeurs
    field1: [null, 'nouvelle_valeur'],
    field2: [null, 42]
  }
};
```

#### UPDATE
```typescript
// Exemple d'opération de mise à jour
const updateOperation = {
  method: 'UPDATE',
  operationtype: 'node',
  data: { /* données mises à jour */ },
  delta: {
    // Seuls les champs modifiés sont inclus
    title: ['ancien_titre', 'nouveau_titre'],
    lastModified: ['2024-10-26T10:00:00.000Z', '2024-10-27T15:30:00.000Z']
  }
};
```

#### DELETE
```typescript
// Exemple d'opération de suppression
const deleteOperation = {
  method: 'DELETE',
  operationtype: 'node',
  data: null,
  delta: {
    // Tous les champs passent de leur valeur à null
    title: ['titre_existant', null],
    content: ['contenu_existant', null]
  }
};
```

## Gestion des Opérations

### Accès aux opérations

```typescript
// Récupérer toutes les opérations
const allOperations = vpi.operations;

// Filtrer les opérations par type
const nodeOperations = vpi.operations.filter(op => op.operationtype === 'node');

// Filtrer par méthode
const createOperations = vpi.operations.filter(op => op.method === 'POST');

// Filtrer par période
const recentOperations = vpi.operations.filter(op =>
  op.eventTime > Date.now() - (24 * 60 * 60 * 1000) // dernières 24h
);
```

### Recherche d'opérations

```typescript
// Rechercher des opérations par référence
const nodeOperations = vpi.operations.filter(op => op.ref === 'node_abc123');

// Rechercher par operationId
const specificOp = vpi.operations.find(op => op.operationId === 'create_node_doc_2024_10_27_15_30');

// Rechercher des opérations sur un type spécifique
const relationOperations = vpi.operations.filter(op => op.operationtype === 'relation');
```

## Avantages du Système d'Opérations

### 1. Traçabilité Complète

Chaque modification est enregistrée avec son contexte complet :

```typescript
// Analyser l'historique d'un nœud
function getNodeHistory(nodeToken) {
  return vpi.operations
    .filter(op => op.ref === nodeToken)
    .sort((a, b) => a.eventTime - b.eventTime)
    .map(op => ({
      timestamp: new Date(op.eventTime),
      action: op.method,
      changes: op.delta
    }));
}

const history = getNodeHistory('node_abc123');
```

### 2. Synchronisation Efficace

Les deltas permettent de synchroniser uniquement les changements :

```typescript
// Générer un patch pour la synchronisation
function generateSyncPatch(lastSyncTime) {
  return vpi.operations
    .filter(op => op.eventTime > lastSyncTime)
    .map(op => ({
      id: op.operationId,
      type: op.operationtype,
      method: op.method,
      ref: op.ref,
      delta: op.delta,
      timestamp: op.eventTime
    }));
}
```

### 3. Annulation/Rétablissement (Undo/Redo)

Le système de deltas permet d'implémenter des fonctionnalités d'annulation :

```typescript
// Annuler la dernière opération
function undoLastOperation() {
  const lastOp = vpi.operations[vpi.operations.length - 1];

  if (lastOp.method === 'POST') {
    // Supprimer l'élément créé
    return vpi.deleteNode(lastOp.ref);
  } else if (lastOp.method === 'UPDATE') {
    // Restaurer les anciennes valeurs
    const oldValues = {};
    Object.keys(lastOp.delta).forEach(key => {
      oldValues[key] = lastOp.delta[key][0]; // ancienne valeur
    });
    return vpi.setNode(lastOp.ref, oldValues);
  } else if (lastOp.method === 'DELETE') {
    // Recréer l'élément avec les anciennes valeurs
    const restoredData = {};
    Object.keys(lastOp.delta).forEach(key => {
      restoredData[key] = lastOp.delta[key][0]; // ancienne valeur
    });
    return vpi.addNode(restoredData);
  }
}
```

### 4. Audit et Debugging

```typescript
// Générer un rapport d'audit
function generateAuditReport(startDate, endDate) {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const relevantOps = vpi.operations.filter(op =>
    op.eventTime >= startTime && op.eventTime <= endTime
  );

  return {
    period: { start: startDate, end: endDate },
    totalOperations: relevantOps.length,
    byType: relevantOps.reduce((acc, op) => {
      acc[op.operationtype] = (acc[op.operationtype] || 0) + 1;
      return acc;
    }, {}),
    byMethod: relevantOps.reduce((acc, op) => {
      acc[op.method] = (acc[op.method] || 0) + 1;
      return acc;
    }, {}),
    operations: relevantOps.map(op => ({
      id: op.operationId,
      time: new Date(op.eventTime),
      type: op.operationtype,
      method: op.method,
      ref: op.ref,
      changesCount: Object.keys(op.delta).length
    }))
  };
}
```

### 5. Performance Optimisée

Seules les différences sont transmises lors de la synchronisation :

```typescript
// Calculer la taille d'un delta
function calculateDeltaSize(operation) {
  const deltaKeys = Object.keys(operation.delta);
  const totalChanges = deltaKeys.length;
  const significantChanges = deltaKeys.filter(key => {
    const [oldVal, newVal] = operation.delta[key];
    return oldVal !== newVal;
  }).length;

  return { totalChanges, significantChanges };
}

// Optimiser la synchronisation
function optimizeSync(operations) {
  return operations.filter(op => {
    const { significantChanges } = calculateDeltaSize(op);
    return significantChanges > 0; // Ignorer les opérations sans changements réels
  });
}
```

## Gestion des Conflits

### Détection de conflits

```typescript
// Détecter les conflits potentiels
function detectConflicts(localOperations, remoteOperations) {
  const conflicts = [];

  localOperations.forEach(localOp => {
    const conflictingRemoteOps = remoteOperations.filter(remoteOp =>
      remoteOp.ref === localOp.ref &&
      remoteOp.eventTime > localOp.eventTime &&
      hasOverlappingChanges(localOp.delta, remoteOp.delta)
    );

    if (conflictingRemoteOps.length > 0) {
      conflicts.push({
        local: localOp,
        remote: conflictingRemoteOps,
        ref: localOp.ref
      });
    }
  });

  return conflicts;
}

function hasOverlappingChanges(delta1, delta2) {
  const keys1 = Object.keys(delta1);
  const keys2 = Object.keys(delta2);
  return keys1.some(key => keys2.includes(key));
}
```

### Résolution de conflits

```typescript
// Résoudre les conflits avec différentes stratégies
function resolveConflicts(conflicts, strategy = 'latest-wins') {
  return conflicts.map(conflict => {
    switch (strategy) {
      case 'latest-wins':
        return conflict.remote[conflict.remote.length - 1];
      case 'local-wins':
        return conflict.local;
      case 'merge':
        return mergeOperations(conflict.local, conflict.remote);
      default:
        throw new Error(`Unknown conflict resolution strategy: ${strategy}`);
    }
  });
}
```

## Bonnes Pratiques

### 1. Nettoyage périodique

```typescript
// Nettoyer les anciennes opérations
function cleanupOldOperations(retentionDays = 30) {
  const cutoffTime = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);
  const activeOperations = vpi.operations.filter(op => op.eventTime > cutoffTime);

  // Remplacer la liste d'opérations
  vpi.operations.length = 0;
  vpi.operations.push(...activeOperations);
}
```

### 2. Compression des opérations

```typescript
// Compresser plusieurs opérations sur le même élément
function compressOperations(operations) {
  const groupedByRef = operations.reduce((groups, op) => {
    if (!groups[op.ref]) groups[op.ref] = [];
    groups[op.ref].push(op);
    return groups;
  }, {});

  return Object.values(groupedByRef).map(ops => {
    if (ops.length === 1) return ops[0];

    // Fusionner les deltas
    const mergedDelta = {};
    ops.forEach(op => {
      Object.keys(op.delta).forEach(key => {
        if (!mergedDelta[key]) {
          mergedDelta[key] = [op.delta[key][0], op.delta[key][1]];
        } else {
          mergedDelta[key][1] = op.delta[key][1]; // Garder la dernière valeur
        }
      });
    });

    return {
      ...ops[ops.length - 1], // Garder les métadonnées de la dernière opération
      delta: mergedDelta
    };
  });
}
```

Le système d'opérations du VPI offre une traçabilité complète, une synchronisation efficace et des possibilités avancées de gestion des modifications, tout en maintenant des performances optimales.
