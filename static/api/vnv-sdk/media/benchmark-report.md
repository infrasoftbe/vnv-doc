# 📊 VNV SDK - Complete Performance Report v1.0.2-2

## 🎯 Executive Summary

- **Execution date:** 8/8/2025, 9:21:33 AM
- **SDK version:** 1.0.2-2
- **Total test suites:** 45 (✅ 32 passed, ❌ 13 failed)
- **Total tests:** 276
- **Total execution time:** 25.66s (25658ms)
- **Average time per test:** 92.96ms
- **Memory used:** 20.11MB
- **Overall performance:** 🟡 Good

## 🐌 Slowest test suites (by average)

| Rank | Suite | Avg time/test | Total | Tests | Performance | Status |
|------|-------|---------------|-------|-------|-------------|--------|
| 1 | `add-structure-node` | 1220.40ms | 6102ms | 5 | 🔴 | ✅ |
| 2 | `query-all-lists` | 433.38ms | 3467ms | 8 | 🔴 | ❌ |
| 3 | `get-relation-by-token` | 111.00ms | 222ms | 2 | 🔴 | ✅ |
| 4 | `add-metadata` | 98.20ms | 491ms | 5 | 🟡 | ✅ |
| 5 | `get-operation` | 95.25ms | 381ms | 4 | 🟡 | ✅ |
| 6 | `delete-node` | 91.33ms | 548ms | 6 | 🟡 | ✅ |
| 7 | `has-node` | 73.60ms | 736ms | 10 | 🟡 | ✅ |
| 8 | `delete-operation` | 69.00ms | 276ms | 4 | 🟡 | ❌ |
| 9 | `add-list` | 66.40ms | 332ms | 5 | 🟡 | ✅ |
| 10 | `delete-relation` | 64.40ms | 322ms | 5 | 🟡 | ✅ |

## ❌ Failed test suites

### 🔴 `query-all-lists`
- **Status:** ❌ Failed (5 test(s) failed, 3 passed)
- **Duration:** 3467ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `delete-operation`
- **Status:** ❌ Failed (2 test(s) failed, 2 passed)
- **Duration:** 276ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-node`
- **Status:** ❌ Failed (1 test(s) failed, 4 passed)
- **Duration:** 318ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `has-structure`
- **Status:** ❌ Failed (2 test(s) failed, 3 passed)
- **Duration:** 313ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-structure`
- **Status:** ❌ Failed (1 test(s) failed, 4 passed)
- **Duration:** 313ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `has-metadata`
- **Status:** ❌ Failed (1 test(s) failed, 4 passed)
- **Duration:** 309ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `has-relation`
- **Status:** ❌ Failed (3 test(s) failed, 2 passed)
- **Duration:** 307ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `delete-structure-node`
- **Status:** ❌ Failed (2 test(s) failed, 5 passed)
- **Duration:** 412ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-structure-node`
- **Status:** ❌ Failed (2 test(s) failed, 4 passed)
- **Duration:** 349ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-node-metadata`
- **Status:** ❌ Failed (1 test(s) failed, 9 passed)
- **Duration:** 576ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `get-structure-node-by-token`
- **Status:** ❌ Failed (2 test(s) failed, 4 passed)
- **Duration:** 341ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `get-structure-by-token`
- **Status:** ❌ Failed (4 test(s) failed, 3 passed)
- **Duration:** 369ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `query-all-metadatas`
- **Status:** ❌ Failed (1 test(s) failed, 7 passed)
- **Duration:** 397ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

## ⚡ Slowest individual tests

| Test | Suite | Duration | Status | Action |
|------|-------|----------|--------|--------|
| `vpi:addStructureChildNode should return existing structure child if already exists` | `add-structure-node` | 2939ms | passed | 🔥 Critical optimization |
| `vpi:addStructureChildNode should create a new structure child node` | `add-structure-node` | 2930ms | passed | 🔥 Critical optimization |
| `vpi:isAvailableToken should initialize project instance` | `is-available-token` | 99ms | passed | ✅ Acceptable |
| `vpi:deleteNode should initialize project instance` | `delete-node` | 95ms | passed | ✅ Acceptable |
| `vpi:addMetadata should handle different metadata types` | `add-metadata` | 73ms | passed | ✅ Acceptable |
| `vpi:addMetadata should initialize project instance` | `add-metadata` | 71ms | passed | ✅ Acceptable |
| `vpi:hasNode should initialize project instance` | `has-node` | 69ms | passed | ✅ Acceptable |
| `vpi:setNodeMetadata should initialize project instance` | `set-node-metadata` | 67ms | passed | ✅ Acceptable |
| `vpi:getOperation should initialize project instance` | `get-operation` | 66ms | passed | ✅ Acceptable |
| `vpi:setNodeMetadata should create new metadata when none exists` | `set-node-metadata` | 62ms | passed | ✅ Acceptable |

## 📈 Detailed analysis by test suite

### 📋 `add-structure-node`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 6102ms (6.10s)
- **Number of tests:** 5
- **Average time:** 1220.40ms/test
- **Contribution to total time:** 23.8%

### 📋 `query-all-lists`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 3467ms (3.47s)
- **Number of tests:** 8
- **Average time:** 433.38ms/test
- **Contribution to total time:** 13.5%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `get-relation-by-token`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 222ms (0.22s)
- **Number of tests:** 2
- **Average time:** 111.00ms/test
- **Contribution to total time:** 0.9%

### 📋 `add-metadata`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 491ms (0.49s)
- **Number of tests:** 5
- **Average time:** 98.20ms/test
- **Contribution to total time:** 1.9%

### 📋 `get-operation`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 381ms (0.38s)
- **Number of tests:** 4
- **Average time:** 95.25ms/test
- **Contribution to total time:** 1.5%

### 📋 `delete-node`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 548ms (0.55s)
- **Number of tests:** 6
- **Average time:** 91.33ms/test
- **Contribution to total time:** 2.1%

### 📋 `has-node`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 736ms (0.74s)
- **Number of tests:** 10
- **Average time:** 73.60ms/test
- **Contribution to total time:** 2.9%

### 📋 `delete-operation`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 276ms (0.28s)
- **Number of tests:** 4
- **Average time:** 69.00ms/test
- **Contribution to total time:** 1.1%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `add-list`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 332ms (0.33s)
- **Number of tests:** 5
- **Average time:** 66.40ms/test
- **Contribution to total time:** 1.3%

### 📋 `delete-relation`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 322ms (0.32s)
- **Number of tests:** 5
- **Average time:** 64.40ms/test
- **Contribution to total time:** 1.3%

### 📋 `set-node`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 318ms (0.32s)
- **Number of tests:** 5
- **Average time:** 63.60ms/test
- **Contribution to total time:** 1.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `set-list`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 313ms (0.31s)
- **Number of tests:** 5
- **Average time:** 62.60ms/test
- **Contribution to total time:** 1.2%

### 📋 `has-structure`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 313ms (0.31s)
- **Number of tests:** 5
- **Average time:** 62.60ms/test
- **Contribution to total time:** 1.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `set-structure`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 313ms (0.31s)
- **Number of tests:** 5
- **Average time:** 62.60ms/test
- **Contribution to total time:** 1.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `has-metadata`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 309ms (0.31s)
- **Number of tests:** 5
- **Average time:** 61.80ms/test
- **Contribution to total time:** 1.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `ensure-project-instance`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 369ms (0.37s)
- **Number of tests:** 6
- **Average time:** 61.50ms/test
- **Contribution to total time:** 1.4%

### 📋 `has-relation`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 307ms (0.31s)
- **Number of tests:** 5
- **Average time:** 61.40ms/test
- **Contribution to total time:** 1.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `add-node`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 307ms (0.31s)
- **Number of tests:** 5
- **Average time:** 61.40ms/test
- **Contribution to total time:** 1.2%

### 📋 `add-structure`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 304ms (0.30s)
- **Number of tests:** 5
- **Average time:** 60.80ms/test
- **Contribution to total time:** 1.2%

### 📋 `set-metadata`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 302ms (0.30s)
- **Number of tests:** 5
- **Average time:** 60.40ms/test
- **Contribution to total time:** 1.2%

### 📋 `add-operation`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 301ms (0.30s)
- **Number of tests:** 5
- **Average time:** 60.20ms/test
- **Contribution to total time:** 1.2%

### 📋 `query-all-structures`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 419ms (0.42s)
- **Number of tests:** 7
- **Average time:** 59.86ms/test
- **Contribution to total time:** 1.6%

### 📋 `add-relation`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 356ms (0.36s)
- **Number of tests:** 6
- **Average time:** 59.33ms/test
- **Contribution to total time:** 1.4%

### 📋 `set-relation`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 354ms (0.35s)
- **Number of tests:** 6
- **Average time:** 59.00ms/test
- **Contribution to total time:** 1.4%

### 📋 `delete-structure-node`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 412ms (0.41s)
- **Number of tests:** 7
- **Average time:** 58.86ms/test
- **Contribution to total time:** 1.6%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `set-structure-node`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 349ms (0.35s)
- **Number of tests:** 6
- **Average time:** 58.17ms/test
- **Contribution to total time:** 1.4%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `get-node-metadata`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 349ms (0.35s)
- **Number of tests:** 6
- **Average time:** 58.17ms/test
- **Contribution to total time:** 1.4%

### 📋 `get-metadata-by-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 406ms (0.41s)
- **Number of tests:** 7
- **Average time:** 58.00ms/test
- **Contribution to total time:** 1.6%

### 📋 `set-node-metadata`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 576ms (0.58s)
- **Number of tests:** 10
- **Average time:** 57.60ms/test
- **Contribution to total time:** 2.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `delete-metadata`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 342ms (0.34s)
- **Number of tests:** 6
- **Average time:** 57.00ms/test
- **Contribution to total time:** 1.3%

### 📋 `get-structure-node-by-token`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 341ms (0.34s)
- **Number of tests:** 6
- **Average time:** 56.83ms/test
- **Contribution to total time:** 1.3%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `query-all-relations`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 395ms (0.40s)
- **Number of tests:** 7
- **Average time:** 56.43ms/test
- **Contribution to total time:** 1.5%

### 📋 `is-available-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 674ms (0.67s)
- **Number of tests:** 12
- **Average time:** 56.17ms/test
- **Contribution to total time:** 2.6%

### 📋 `query-all-nodes`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 390ms (0.39s)
- **Number of tests:** 7
- **Average time:** 55.71ms/test
- **Contribution to total time:** 1.5%

### 📋 `update-operation`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 373ms (0.37s)
- **Number of tests:** 7
- **Average time:** 53.29ms/test
- **Contribution to total time:** 1.5%

### 📋 `has-structure-node`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 370ms (0.37s)
- **Number of tests:** 7
- **Average time:** 52.86ms/test
- **Contribution to total time:** 1.4%

### 📋 `get-structure-by-token`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 369ms (0.37s)
- **Number of tests:** 7
- **Average time:** 52.71ms/test
- **Contribution to total time:** 1.4%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `find-node-by-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 415ms (0.41s)
- **Number of tests:** 8
- **Average time:** 51.88ms/test
- **Contribution to total time:** 1.6%

### 📋 `get-list-by-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 363ms (0.36s)
- **Number of tests:** 7
- **Average time:** 51.86ms/test
- **Contribution to total time:** 1.4%

### 📋 `create-available-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 408ms (0.41s)
- **Number of tests:** 8
- **Average time:** 51.00ms/test
- **Contribution to total time:** 1.6%

### 📋 `query-all-metadatas`
- **Status:** ❌ Failed
- **Performance:** 🟢 Fast
- **Total duration:** 397ms (0.40s)
- **Number of tests:** 8
- **Average time:** 49.63ms/test
- **Contribution to total time:** 1.5%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `query-all-structure-node`
- **Status:** ✅ Passed
- **Performance:** 🟢 Fast
- **Total duration:** 397ms (0.40s)
- **Number of tests:** 8
- **Average time:** 49.63ms/test
- **Contribution to total time:** 1.5%

### 📋 `get-node-by-token`
- **Status:** ✅ Passed
- **Performance:** 🟢 Fast
- **Total duration:** 432ms (0.43s)
- **Number of tests:** 9
- **Average time:** 48.00ms/test
- **Contribution to total time:** 1.7%

### 📋 `diff`
- **Status:** ✅ Passed
- **Performance:** 🟢 Fast
- **Total duration:** 39ms (0.04s)
- **Number of tests:** 4
- **Average time:** 9.75ms/test
- **Contribution to total time:** 0.2%

### 📋 `query-one-node`
- **Status:** ✅ Passed
- **Performance:** 🟢 Fast
- **Total duration:** 0ms (0.00s)
- **Number of tests:** 0
- **Average time:** 0.00ms/test
- **Contribution to total time:** 0.0%

## 🎯 Optimization recommendations

### 🔥 Priority actions
- **add-structure-node**: 1220.40ms/test - Critical optimization required
- **query-all-lists**: 433.38ms/test - Critical optimization required

### ⚠️ Continuous monitoring
- **get-relation-by-token**: 111.00ms/test

### 💡 General suggestions
1. **Mocking:** Consider more mocks for tests > 100ms
2. **Parallelization:** Check parallelization opportunities
3. **Setup/Teardown:** Optimize initialization phases
4. **Assertions:** Reduce complex assertions in slow tests

## 📊 Trend metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Average time/test | 92.96ms | < 50ms | ❌ |
| Tests > 100ms | 2 | 0 | ❌ |
| Memory usage | 20.11MB | < 100MB | ✅ |
| Total time | 25.66s | < 30s | ✅ |



## 📊 Complete test coverage

- **Total test files:** 44
- **Successfully executed tests:** 45
- **Tests with errors (not executed):** 0

### ❌ Non-executed tests (TypeScript/Runtime errors)

✅ All tests could be executed!

### 🎯 Actions for a complete benchmark

1. **Fix TypeScript errors** in the 0 failed tests
2. **Re-run the benchmark** to get complete metrics
3. **Optimize** tests identified as slow

---
*For a truly complete benchmark, all tests must compile and execute without error.*

---
**📋 Report automatically generated on 8/8/2025, 9:21:33 AM**  
*SDK Version: 1.0.2-2 | Generator: VNV Performance Reporter*
