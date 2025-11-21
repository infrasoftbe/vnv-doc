# 📊 VNV SDK - Complete Performance Report v1.0.2-3

## 🎯 Executive Summary

- **Execution date:** 8/21/2025, 10:35:27 AM
- **SDK version:** 1.0.2-3
- **Total test suites:** 47 (✅ 29 passed, ❌ 18 failed)
- **Total tests:** 305
- **Total execution time:** 44.49s (44490ms)
- **Average time per test:** 145.87ms
- **Memory used:** 26.23MB
- **Overall performance:** 🔴 Needs optimization

## 🐌 Slowest test suites (by average)

| Rank | Suite | Avg time/test | Total | Tests | Performance | Status |
|------|-------|---------------|-------|-------|-------------|--------|
| 1 | `set-node` | 373.00ms | 1865ms | 5 | 🔴 | ❌ |
| 2 | `flat-structure-v1` | 303.50ms | 607ms | 2 | 🔴 | ✅ |
| 3 | `get-relation-by-token` | 303.00ms | 606ms | 2 | 🔴 | ✅ |
| 4 | `projectEngine` | 264.71ms | 6353ms | 24 | 🔴 | ❌ |
| 5 | `add-list` | 179.60ms | 898ms | 5 | 🔴 | ✅ |
| 6 | `set-metadata` | 174.60ms | 873ms | 5 | 🔴 | ✅ |
| 7 | `create-available-token` | 170.75ms | 1366ms | 8 | 🔴 | ✅ |
| 8 | `delete-operation` | 166.25ms | 665ms | 4 | 🔴 | ❌ |
| 9 | `get-operation` | 166.00ms | 664ms | 4 | 🔴 | ✅ |
| 10 | `delete-node` | 164.83ms | 989ms | 6 | 🔴 | ✅ |

## ❌ Failed test suites

### 🔴 `set-node`
- **Status:** ❌ Failed (1 test(s) failed, 4 passed)
- **Duration:** 1865ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `projectEngine`
- **Status:** ❌ Failed (2 test(s) failed, 22 passed)
- **Duration:** 6353ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `delete-operation`
- **Status:** ❌ Failed (2 test(s) failed, 2 passed)
- **Duration:** 665ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `add-structure`
- **Status:** ❌ Failed (2 test(s) failed, 3 passed)
- **Duration:** 779ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-list`
- **Status:** ❌ Failed (1 test(s) failed, 4 passed)
- **Duration:** 756ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `query-all-lists`
- **Status:** ❌ Failed (5 test(s) failed, 3 passed)
- **Duration:** 1208ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-structure`
- **Status:** ❌ Failed (2 test(s) failed, 3 passed)
- **Duration:** 732ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `add-structure-node`
- **Status:** ❌ Failed (5 test(s) failed, 1 passed)
- **Duration:** 859ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `has-relation`
- **Status:** ❌ Failed (3 test(s) failed, 2 passed)
- **Duration:** 707ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `has-metadata`
- **Status:** ❌ Failed (1 test(s) failed, 4 passed)
- **Duration:** 700ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `has-structure`
- **Status:** ❌ Failed (2 test(s) failed, 3 passed)
- **Duration:** 693ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-structure-node`
- **Status:** ❌ Failed (2 test(s) failed, 4 passed)
- **Duration:** 791ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `get-structure-by-token`
- **Status:** ❌ Failed (4 test(s) failed, 3 passed)
- **Duration:** 895ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `delete-structure-node`
- **Status:** ❌ Failed (2 test(s) failed, 5 passed)
- **Duration:** 848ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `get-structure-node-by-token`
- **Status:** ❌ Failed (2 test(s) failed, 4 passed)
- **Duration:** 697ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `query-all-structures`
- **Status:** ❌ Failed (2 test(s) failed, 5 passed)
- **Duration:** 753ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `query-all-metadatas`
- **Status:** ❌ Failed (1 test(s) failed, 7 passed)
- **Duration:** 785ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

### 🔴 `set-node-metadata`
- **Status:** ❌ Failed (1 test(s) failed, 9 passed)
- **Duration:** 969ms
- **Action:** Fix TypeScript/Runtime errors to include in metrics

## ⚡ Slowest individual tests

| Test | Suite | Duration | Status | Action |
|------|-------|----------|--------|--------|
| `vpi:setMetadata should create new metadata when it does not exist` | `set-metadata` | 136ms | passed | ⚠️ Monitor |
| `vpi:getStructureByToken should return structure when found by token` | `get-structure-by-token` | 86ms | failed | ✅ Acceptable |
| `vpi:addList should create a new list with pre-configured existing relations` | `add-list` | 86ms | passed | ✅ Acceptable |
| `vpi:addList should initialize project instance` | `add-list` | 71ms | passed | ✅ Acceptable |
| `vpi:deleteNode should maintain other nodes when deleting one` | `delete-node` | 70ms | passed | ✅ Acceptable |
| `vpi:getStructureByToken should initialize project instance` | `get-structure-by-token` | 66ms | passed | ✅ Acceptable |
| `vpi:deleteNode should allow deletion of all nodes` | `delete-node` | 64ms | passed | ✅ Acceptable |
| `vpi:deleteNode should initialize project instance` | `delete-node` | 62ms | passed | ✅ Acceptable |
| `vpi:setNode should initialize project instance` | `set-node` | 59ms | passed | ✅ Acceptable |
| `vpi:deleteNode should delete a node by token` | `delete-node` | 58ms | passed | ✅ Acceptable |

## 📈 Detailed analysis by test suite

### 📋 `set-node`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 1865ms (1.86s)
- **Number of tests:** 5
- **Average time:** 373.00ms/test
- **Contribution to total time:** 4.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `flat-structure-v1`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 607ms (0.61s)
- **Number of tests:** 2
- **Average time:** 303.50ms/test
- **Contribution to total time:** 1.4%

### 📋 `get-relation-by-token`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 606ms (0.61s)
- **Number of tests:** 2
- **Average time:** 303.00ms/test
- **Contribution to total time:** 1.4%

### 📋 `projectEngine`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 6353ms (6.35s)
- **Number of tests:** 24
- **Average time:** 264.71ms/test
- **Contribution to total time:** 14.3%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `add-list`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 898ms (0.90s)
- **Number of tests:** 5
- **Average time:** 179.60ms/test
- **Contribution to total time:** 2.0%

### 📋 `set-metadata`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 873ms (0.87s)
- **Number of tests:** 5
- **Average time:** 174.60ms/test
- **Contribution to total time:** 2.0%

### 📋 `create-available-token`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 1366ms (1.37s)
- **Number of tests:** 8
- **Average time:** 170.75ms/test
- **Contribution to total time:** 3.1%

### 📋 `delete-operation`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 665ms (0.67s)
- **Number of tests:** 4
- **Average time:** 166.25ms/test
- **Contribution to total time:** 1.5%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `get-operation`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 664ms (0.66s)
- **Number of tests:** 4
- **Average time:** 166.00ms/test
- **Contribution to total time:** 1.5%

### 📋 `delete-node`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 989ms (0.99s)
- **Number of tests:** 6
- **Average time:** 164.83ms/test
- **Contribution to total time:** 2.2%

### 📋 `add-structure`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 779ms (0.78s)
- **Number of tests:** 5
- **Average time:** 155.80ms/test
- **Contribution to total time:** 1.8%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `delete-relation`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 765ms (0.77s)
- **Number of tests:** 5
- **Average time:** 153.00ms/test
- **Contribution to total time:** 1.7%

### 📋 `set-list`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 756ms (0.76s)
- **Number of tests:** 5
- **Average time:** 151.20ms/test
- **Contribution to total time:** 1.7%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `query-all-lists`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 1208ms (1.21s)
- **Number of tests:** 8
- **Average time:** 151.00ms/test
- **Contribution to total time:** 2.7%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `set-structure`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 732ms (0.73s)
- **Number of tests:** 5
- **Average time:** 146.40ms/test
- **Contribution to total time:** 1.6%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `ensure-project-instance`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 875ms (0.88s)
- **Number of tests:** 6
- **Average time:** 145.83ms/test
- **Contribution to total time:** 2.0%

### 📋 `add-metadata`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 723ms (0.72s)
- **Number of tests:** 5
- **Average time:** 144.60ms/test
- **Contribution to total time:** 1.6%

### 📋 `add-structure-node`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 859ms (0.86s)
- **Number of tests:** 6
- **Average time:** 143.17ms/test
- **Contribution to total time:** 1.9%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `delete-metadata`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 857ms (0.86s)
- **Number of tests:** 6
- **Average time:** 142.83ms/test
- **Contribution to total time:** 1.9%

### 📋 `query-all-structure-node`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 1142ms (1.14s)
- **Number of tests:** 8
- **Average time:** 142.75ms/test
- **Contribution to total time:** 2.6%

### 📋 `has-relation`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 707ms (0.71s)
- **Number of tests:** 5
- **Average time:** 141.40ms/test
- **Contribution to total time:** 1.6%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `add-operation`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 702ms (0.70s)
- **Number of tests:** 5
- **Average time:** 140.40ms/test
- **Contribution to total time:** 1.6%

### 📋 `has-metadata`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 700ms (0.70s)
- **Number of tests:** 5
- **Average time:** 140.00ms/test
- **Contribution to total time:** 1.6%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `has-structure`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 693ms (0.69s)
- **Number of tests:** 5
- **Average time:** 138.60ms/test
- **Contribution to total time:** 1.6%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `set-structure-node`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 791ms (0.79s)
- **Number of tests:** 6
- **Average time:** 131.83ms/test
- **Contribution to total time:** 1.8%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `find-node-by-token`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 1039ms (1.04s)
- **Number of tests:** 8
- **Average time:** 129.88ms/test
- **Contribution to total time:** 2.3%

### 📋 `set-relation`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 775ms (0.78s)
- **Number of tests:** 6
- **Average time:** 129.17ms/test
- **Contribution to total time:** 1.7%

### 📋 `get-structure-by-token`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 895ms (0.90s)
- **Number of tests:** 7
- **Average time:** 127.86ms/test
- **Contribution to total time:** 2.0%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `add-relation`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 762ms (0.76s)
- **Number of tests:** 6
- **Average time:** 127.00ms/test
- **Contribution to total time:** 1.7%

### 📋 `diff`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 504ms (0.50s)
- **Number of tests:** 4
- **Average time:** 126.00ms/test
- **Contribution to total time:** 1.1%

### 📋 `delete-structure-node`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 848ms (0.85s)
- **Number of tests:** 7
- **Average time:** 121.14ms/test
- **Contribution to total time:** 1.9%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `get-node-metadata`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 722ms (0.72s)
- **Number of tests:** 6
- **Average time:** 120.33ms/test
- **Contribution to total time:** 1.6%

### 📋 `add-node`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 815ms (0.81s)
- **Number of tests:** 7
- **Average time:** 116.43ms/test
- **Contribution to total time:** 1.8%

### 📋 `get-structure-node-by-token`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 697ms (0.70s)
- **Number of tests:** 6
- **Average time:** 116.17ms/test
- **Contribution to total time:** 1.6%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `has-structure-node`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 805ms (0.81s)
- **Number of tests:** 7
- **Average time:** 115.00ms/test
- **Contribution to total time:** 1.8%

### 📋 `update-operation`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 771ms (0.77s)
- **Number of tests:** 7
- **Average time:** 110.14ms/test
- **Contribution to total time:** 1.7%

### 📋 `get-metadata-by-token`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 763ms (0.76s)
- **Number of tests:** 7
- **Average time:** 109.00ms/test
- **Contribution to total time:** 1.7%

### 📋 `query-all-relations`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 754ms (0.75s)
- **Number of tests:** 7
- **Average time:** 107.71ms/test
- **Contribution to total time:** 1.7%

### 📋 `query-all-nodes`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 754ms (0.75s)
- **Number of tests:** 7
- **Average time:** 107.71ms/test
- **Contribution to total time:** 1.7%

### 📋 `query-all-structures`
- **Status:** ❌ Failed
- **Performance:** 🔴 Slow
- **Total duration:** 753ms (0.75s)
- **Number of tests:** 7
- **Average time:** 107.57ms/test
- **Contribution to total time:** 1.7%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `get-list-by-token`
- **Status:** ✅ Passed
- **Performance:** 🔴 Slow
- **Total duration:** 751ms (0.75s)
- **Number of tests:** 7
- **Average time:** 107.29ms/test
- **Contribution to total time:** 1.7%

### 📋 `query-all-metadatas`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 785ms (0.79s)
- **Number of tests:** 8
- **Average time:** 98.13ms/test
- **Contribution to total time:** 1.8%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `set-node-metadata`
- **Status:** ❌ Failed
- **Performance:** 🟡 Moderate
- **Total duration:** 969ms (0.97s)
- **Number of tests:** 10
- **Average time:** 96.90ms/test
- **Contribution to total time:** 2.2%
- **⚠️ Note:** Failed suite - Compilation time included in metrics

### 📋 `get-node-by-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 811ms (0.81s)
- **Number of tests:** 9
- **Average time:** 90.11ms/test
- **Contribution to total time:** 1.8%

### 📋 `has-node`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 829ms (0.83s)
- **Number of tests:** 10
- **Average time:** 82.90ms/test
- **Contribution to total time:** 1.9%

### 📋 `is-available-token`
- **Status:** ✅ Passed
- **Performance:** 🟡 Moderate
- **Total duration:** 927ms (0.93s)
- **Number of tests:** 12
- **Average time:** 77.25ms/test
- **Contribution to total time:** 2.1%

### 📋 `query-one-node`
- **Status:** ✅ Passed
- **Performance:** 🟢 Fast
- **Total duration:** 0ms (0.00s)
- **Number of tests:** 0
- **Average time:** 0.00ms/test
- **Contribution to total time:** 0.0%

## 🎯 Optimization recommendations

### 🔥 Priority actions
- **set-node**: 373.00ms/test - Critical optimization required
- **flat-structure-v1**: 303.50ms/test - Critical optimization required
- **get-relation-by-token**: 303.00ms/test - Critical optimization required
- **projectEngine**: 264.71ms/test - Critical optimization required

### ⚠️ Continuous monitoring
- **add-list**: 179.60ms/test
- **set-metadata**: 174.60ms/test
- **create-available-token**: 170.75ms/test
- **delete-operation**: 166.25ms/test
- **get-operation**: 166.00ms/test
- **delete-node**: 164.83ms/test

### 💡 General suggestions
1. **Mocking:** Consider more mocks for tests > 100ms
2. **Parallelization:** Check parallelization opportunities
3. **Setup/Teardown:** Optimize initialization phases
4. **Assertions:** Reduce complex assertions in slow tests

## 📊 Trend metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Average time/test | 145.87ms | < 50ms | ❌ |
| Tests > 100ms | 1 | 0 | ❌ |
| Memory usage | 26.23MB | < 100MB | ✅ |
| Total time | 44.49s | < 30s | ❌ |



## 📊 Complete test coverage

- **Total test files:** 45
- **Successfully executed tests:** 47
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
**📋 Report automatically generated on 8/21/2025, 10:35:27 AM**  
*SDK Version: 1.0.2-3 | Generator: VNV Performance Reporter*
