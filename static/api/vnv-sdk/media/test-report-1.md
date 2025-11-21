# @infrasoftbe/vnv-sdk Test Results

> **Started**: Tue, 12 Aug 2025 08:39:36 GMT

<center>

|Suites (45)|Tests (279)|
|:-:|:-:|
|![](https://img.shields.io/badge/Passed-30-green) | ![](https://img.shields.io/badge/Passed-247-green)|
|![](https://img.shields.io/badge/Failed-15-red) | ![](https://img.shields.io/badge/Failed-32-red)|
|![](https://img.shields.io/badge/Pending-0-lightgrey) | ![](https://img.shields.io/badge/Pending-0-lightgrey)|

---

<table>
<thead>
<tr>
<th>set-node-metadata.test.ts</th>
<th></th>
<th></th>
<th>9.817</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.059</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should emit &#34;set-meta&#34; event when metadata is set</i></td>
<td>passed</td>
<td>0.038</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should create new metadata when none exists</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should update existing metadata</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should handle _meta instance properly</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should use MetadataConstructor for node type</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should set proper timestamps</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should handle node without project reference gracefully</i></td>
<td>failed</td>
<td>0.062</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should work with different node types</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNodeMetadata</strong></td>
<td><i>should preserve existing metadata properties when updating</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-structure-node.test.ts</th>
<th></th>
<th></th>
<th>1.474</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.062</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should delete existing structure child node</i></td>
<td>failed</td>
<td>0.054</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should emit &#34;delete-node&#34; event</i></td>
<td>passed</td>
<td>0.041</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should return null for non-existing child</i></td>
<td>passed</td>
<td>0.043</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should return null when no metadata exists</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should handle empty token gracefully</i></td>
<td>passed</td>
<td>0.049</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:deleteStructureChildNode</strong></td>
<td><i>should only delete if node exists</i></td>
<td>failed</td>
<td>0.035</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-structure-by-token.test.ts</th>
<th></th>
<th></th>
<th>1.049</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.087</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should return structure when found by token</i></td>
<td>failed</td>
<td>0.05</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should return null when structure not found</i></td>
<td>passed</td>
<td>0.051</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should handle token case conversion (uppercase)</i></td>
<td>failed</td>
<td>0.035</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should handle different structure tokens</i></td>
<td>failed</td>
<td>0.034</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should handle string conversion of token parameter</i></td>
<td>failed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureByToken</strong></td>
<td><i>should return null for empty or invalid tokens</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>has-relation.test.ts</th>
<th></th>
<th></th>
<th>0.861</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.046</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:hasRelation</strong></td>
<td><i>should return true for existing relation</i></td>
<td>failed</td>
<td>0.038</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasRelation</strong></td>
<td><i>should return false for non-existent relation</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:hasRelation</strong></td>
<td><i>should handle token case conversion</i></td>
<td>failed</td>
<td>0.035</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:hasRelation</strong></td>
<td><i>should handle multiple relations</i></td>
<td>failed</td>
<td>0.035</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-structure-node.test.ts</th>
<th></th>
<th></th>
<th>0.931</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>vpi:addStructureChildNode</strong></td>
<td><i>should create a new structure child node</i></td>
<td>failed</td>
<td>0.046</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:addStructureChildNode</strong></td>
<td><i>should emit &#34;add-node&#34; event</i></td>
<td>failed</td>
<td>0.039</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:addStructureChildNode</strong></td>
<td><i>should return existing structure child if already exists</i></td>
<td>failed</td>
<td>0.046</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:addStructureChildNode</strong></td>
<td><i>should create parent-child relationship</i></td>
<td>failed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addStructureChildNode</strong></td>
<td><i>should handle invalid input gracefully</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:addStructureChildNode</strong></td>
<td><i>should handle multiple child nodes</i></td>
<td>failed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-node.test.ts</th>
<th></th>
<th></th>
<th>0.843</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.048</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNode</strong></td>
<td><i>should update existing node properties</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNode</strong></td>
<td><i>should emit set event when node is updated</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:setNode</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>failed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setNode</strong></td>
<td><i>should handle setting node with new token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-metadatas.test.ts</th>
<th></th>
<th></th>
<th>0.924</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.051</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should return all metadata when empty query provided</i></td>
<td>failed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should filter metadata by description</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should return empty array when no matches found</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should handle partial matching in metadata properties</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should handle multiple filter criteria</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should use DeepObjectComparaison for matching</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryMetadataAll</strong></td>
<td><i>should handle queries with undefined or null values</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-structure-node-by-token.test.ts</th>
<th></th>
<th></th>
<th>0.881</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureChildNodeByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.049</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:getStructureChildNodeByToken</strong></td>
<td><i>should return null when structure has no metadata</i></td>
<td>failed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureChildNodeByToken</strong></td>
<td><i>should return undefined when node not found in children</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:getStructureChildNodeByToken</strong></td>
<td><i>should return structure child when found</i></td>
<td>failed</td>
<td>0.037</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureChildNodeByToken</strong></td>
<td><i>should handle structure without proper metadata setup</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getStructureChildNodeByToken</strong></td>
<td><i>should handle different node IDs</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-list.test.ts</th>
<th></th>
<th></th>
<th>0.916</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setList</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.066</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setList</strong></td>
<td><i>should update existing list properties</i></td>
<td>passed</td>
<td>0.037</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setList</strong></td>
<td><i>should emit set event when list is updated</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setList</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setList</strong></td>
<td><i>should handle multiple list updates</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-lists.test.ts</th>
<th></th>
<th></th>
<th>1.24</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.049</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should return all lists when no query provided</i></td>
<td>failed</td>
<td>0.036</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should filter lists by name</i></td>
<td>failed</td>
<td>0.038</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should filter lists by token</i></td>
<td>failed</td>
<td>0.033</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should filter lists by type</i></td>
<td>failed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should return empty array when no matches found</i></td>
<td>passed</td>
<td>0.046</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should handle multiple filter criteria</i></td>
<td>passed</td>
<td>0.119</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:queryListAll</strong></td>
<td><i>should handle partial name matching in query object comparison</i></td>
<td>failed</td>
<td>0.203</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>has-metadata.test.ts</th>
<th></th>
<th></th>
<th>1.634</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.045</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasMetadata</strong></td>
<td><i>should return true for existing metadata</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasMetadata</strong></td>
<td><i>should return false for non-existent metadata</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:hasMetadata</strong></td>
<td><i>should handle token case conversion</i></td>
<td>failed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasMetadata</strong></td>
<td><i>should handle multiple metadata tokens</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-structure-node.test.ts</th>
<th></th>
<th></th>
<th>1.422</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>vpi:setStructureChildNode</strong></td>
<td><i>should create new structure child node if it does not exist</i></td>
<td>failed</td>
<td>0.113</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructureChildNode</strong></td>
<td><i>should update existing structure child node</i></td>
<td>passed</td>
<td>0.04</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructureChildNode</strong></td>
<td><i>should emit appropriate events</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:setStructureChildNode</strong></td>
<td><i>should handle invalid input gracefully</i></td>
<td>failed</td>
<td>0.04</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructureChildNode</strong></td>
<td><i>should return null when no metadata exists</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructureChildNode</strong></td>
<td><i>should create parent-child relationship for new nodes</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-operation.test.ts</th>
<th></th>
<th></th>
<th>0.793</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteOperation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.054</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:deleteOperation</strong></td>
<td><i>should delete existing operation</i></td>
<td>failed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteOperation</strong></td>
<td><i>should return null when trying to delete non-existent operation</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:deleteOperation</strong></td>
<td><i>should handle multiple operation deletions</i></td>
<td>failed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-structure.test.ts</th>
<th></th>
<th></th>
<th>0.798</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructure</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.044</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructure</strong></td>
<td><i>should update existing structure properties</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructure</strong></td>
<td><i>should emit set event when structure is updated</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:setStructure</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>failed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setStructure</strong></td>
<td><i>should handle multiple structure updates</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>has-structure.test.ts</th>
<th></th>
<th></th>
<th>0.704</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructure</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.045</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructure</strong></td>
<td><i>should return true for existing structure</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructure</strong></td>
<td><i>should return false for non-existent structure</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:hasStructure</strong></td>
<td><i>should handle token case conversion</i></td>
<td>failed</td>
<td>0.029</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>vpi:hasStructure</strong></td>
<td><i>should handle multiple structure tokens</i></td>
<td>failed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-one-node.test.ts</th>
<th></th>
<th></th>
<th>0</th>
</tr>
</thead>
<tbody>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-node.test.ts</th>
<th></th>
<th></th>
<th>0.833</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.045</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should emit &#34;add-node&#34; event</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should create a new node when it does not exist</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should return existing node when it already exists</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should create nodes of different types</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should reject structure child nodes</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addNode</strong></td>
<td><i>should reject list child nodes</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-relation.test.ts</th>
<th></th>
<th></th>
<th>0.816</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setRelation</strong></td>
<td><i>should update existing relation properties</i></td>
<td>passed</td>
<td>0.037</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setRelation</strong></td>
<td><i>should emit set event when relation is updated</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setRelation</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setRelation</strong></td>
<td><i>should handle setting relation with new key</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setRelation</strong></td>
<td><i>should maintain other relations when updating one</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>has-structure-node.test.ts</th>
<th></th>
<th></th>
<th>0.775</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.048</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should return false when structure has no metadata</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should return false when node token not found in children</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should return true when node token found in children</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should handle structure without metadata gracefully</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should handle different token formats</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasStructureChildNode</strong></td>
<td><i>should handle empty or invalid tokens</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-metadata-by-token.test.ts</th>
<th></th>
<th></th>
<th>0.788</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should return existing metadata by token</i></td>
<td>passed</td>
<td>0.048</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should return undefined for non-existing token</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should handle empty token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should handle null token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should return correct metadata when multiple exist</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should return the same instance for repeated calls</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getMetadataByToken</strong></td>
<td><i>should handle case-sensitive tokens</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>is-available-token.test.ts</th>
<th></th>
<th></th>
<th>0.991</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for existing node token</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for existing list token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for existing structure token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for project token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return true for non-existent token</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for random unique token</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for empty token</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for null token</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return false for undefined token</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should handle not case-sensitive token checking</i></td>
<td>passed</td>
<td>0.038</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:isAvailableToken</strong></td>
<td><i>should return true after token becomes available</i></td>
<td>passed</td>
<td>0.04</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-operation.test.ts</th>
<th></th>
<th></th>
<th>0.688</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getOperation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.045</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getOperation</strong></td>
<td><i>should get existing operation</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getOperation</strong></td>
<td><i>should return null when trying to get non-existent operation</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getOperation</strong></td>
<td><i>should handle multiple operations retrieval</i></td>
<td>passed</td>
<td>0.027</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-structure-node.test.ts</th>
<th></th>
<th></th>
<th>1.146</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.06</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should return empty array when structure has no metadata</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should return empty array when no children exist</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should return matching children when found</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should filter children by specific properties</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should use DeepObjectComparaison for matching</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should handle structure without metadata gracefully</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureChildNodeAll</strong></td>
<td><i>should return empty array when no matches found</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>find-node-by-token.test.ts</th>
<th></th>
<th></th>
<th>1.642</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.057</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should find existing node by token</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should find second node by token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should return null for non-existent token</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should return undefined for empty token</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should return undefined for null token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should handle case-sensitive token matching</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:findNodeByToken</strong></td>
<td><i>should find node after adding more nodes</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>update-operation.test.ts</th>
<th></th>
<th></th>
<th>1.09</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should update operation with same ID</i></td>
<td>passed</td>
<td>0.128</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should update existing operation</i></td>
<td>passed</td>
<td>0.088</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should return null for non-existent operation</i></td>
<td>passed</td>
<td>0.064</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should perform partial update of operation</i></td>
<td>passed</td>
<td>0.061</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should handle empty update data</i></td>
<td>passed</td>
<td>0.079</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should preserve operation id when updating</i></td>
<td>passed</td>
<td>0.09</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:updateOperation</strong></td>
<td><i>should update operation method and type</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-node-metadata.test.ts</th>
<th></th>
<th></th>
<th>0.859</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeMeta</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.088</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeMeta</strong></td>
<td><i>should return default metadata when no metadata exists</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeMeta</strong></td>
<td><i>should return node metadata when it exists</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeMeta</strong></td>
<td><i>should handle missing project reference gracefully</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeMeta</strong></td>
<td><i>should convert non-_meta objects to proper metadata</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeMeta</strong></td>
<td><i>should handle different node types</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>has-node.test.ts</th>
<th></th>
<th></th>
<th>1.057</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return true for existing node</i></td>
<td>passed</td>
<td>0.037</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return true for another existing node</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return false for non-existent node</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return false for empty token</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return false for null token</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return false for undefined token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should handle case-sensitive token checking</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return true after adding new node</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:hasNode</strong></td>
<td><i>should return false after deleting node</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-structures.test.ts</th>
<th></th>
<th></th>
<th>0.799</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.044</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should query all structures</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should query structures by type</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should query structures by token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should query structures by name</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should return empty array when no structures match query</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryStructureAll</strong></td>
<td><i>should query structures with multiple criteria</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-node-by-token.test.ts</th>
<th></th>
<th></th>
<th>0.833</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.048</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should get existing node by token</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should get different node by token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should return undefined for non-existent token</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should return undefined for empty token</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should return undefined for null token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should handle case-sensitive token matching</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should get node with all properties intact</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getNodeByToken</strong></td>
<td><i>should get node consistently across multiple calls</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-relation.test.ts</th>
<th></th>
<th></th>
<th>0.823</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addRelation</strong></td>
<td><i>should add nodes to the project instance</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addRelation</strong></td>
<td><i>should have relations initialized</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addRelation</strong></td>
<td><i>sould emit &#34;add-relation&#34; event</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addRelation</strong></td>
<td><i>should create a new relation when it does not exist</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addRelation</strong></td>
<td><i>should return existing relation when it already exists</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-relations.test.ts</th>
<th></th>
<th></th>
<th>0.817</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.057</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should query all relations by type</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should query relations by from token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should query relations by to token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should return empty array when no relations match query</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should query relations with multiple criteria</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryRelationAll</strong></td>
<td><i>should return all relations when query is empty</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>create-available-token.test.ts</th>
<th></th>
<th></th>
<th>0.939</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.045</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should create available token for node type</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should create available token for structure type</i></td>
<td>passed</td>
<td>0.027</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should create available token for list type</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should create available token for relation type</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should create different tokens for same type</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should create tokens that are actually available</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:createAvailableToken</strong></td>
<td><i>should handle multiple token generations without conflicts</i></td>
<td>passed</td>
<td>0.039</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-relation.test.ts</th>
<th></th>
<th></th>
<th>0.796</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.058</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteRelation</strong></td>
<td><i>should delete a relation by key</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteRelation</strong></td>
<td><i>should emit delete event when relation is deleted</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteRelation</strong></td>
<td><i>should handle deletion of non-existent relation gracefully</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteRelation</strong></td>
<td><i>should maintain other relations when deleting one</i></td>
<td>passed</td>
<td>0.041</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-metadata.test.ts</th>
<th></th>
<th></th>
<th>0.824</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.053</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addMetadata</strong></td>
<td><i>should emit &#34;add-meta&#34; event</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addMetadata</strong></td>
<td><i>should create new metadata when it does not exist</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addMetadata</strong></td>
<td><i>should return existing metadata when it already exists</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addMetadata</strong></td>
<td><i>should handle different metadata types</i></td>
<td>passed</td>
<td>0.04</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-list.test.ts</th>
<th></th>
<th></th>
<th>0.787</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addList</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addList</strong></td>
<td><i>should emit &#34;add-list&#34; event</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addList</strong></td>
<td><i>should create new list when token doesn&#39;t exist</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addList</strong></td>
<td><i>should return existing list when token already exists</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addList</strong></td>
<td><i>should create a new list with pre-configured existing relations</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-metadata.test.ts</th>
<th></th>
<th></th>
<th>1.794</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.051</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteMetadata</strong></td>
<td><i>should delete metadata by token</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteMetadata</strong></td>
<td><i>should emit delete event when metadata is deleted</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteMetadata</strong></td>
<td><i>should handle deletion of non-existent metadata gracefully</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteMetadata</strong></td>
<td><i>should maintain other metadata when deleting one</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteMetadata</strong></td>
<td><i>should allow deletion of all metadata</i></td>
<td>passed</td>
<td>0.027</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>ensure-project-instance.test.ts</th>
<th></th>
<th></th>
<th>0.772</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:ensureInstance</strong></td>
<td><i>should return existing project instance when valid</i></td>
<td>passed</td>
<td>0.052</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:ensureInstance</strong></td>
<td><i>should validate project instance structure</i></td>
<td>passed</td>
<td>0.038</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:ensureInstance</strong></td>
<td><i>should handle invalid context gracefully</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:ensureInstance</strong></td>
<td><i>should validate project instance properties</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:ensureInstance</strong></td>
<td><i>should return the same instance when called multiple times</i></td>
<td>passed</td>
<td>0.043</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:ensureInstance</strong></td>
<td><i>should preserve all project methods and properties</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-nodes.test.ts</th>
<th></th>
<th></th>
<th>1.035</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.052</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should query all nodes</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should query nodes by type</i></td>
<td>passed</td>
<td>0.035</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should query nodes by token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should query nodes by name</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should return empty array when no nodes match query</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:queryNodeAll</strong></td>
<td><i>should query nodes with multiple criteria</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-list-by-token.test.ts</th>
<th></th>
<th></th>
<th>0.784</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should return existing list by token</i></td>
<td>passed</td>
<td>0.045</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should return undefined for non-existing token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should handle empty token</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should handle null token</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should return correct list when multiple lists exist</i></td>
<td>passed</td>
<td>0.029</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should return the same instance for repeated calls</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getListByToken</strong></td>
<td><i>should handle case-sensitive tokens</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-metadata.test.ts</th>
<th></th>
<th></th>
<th>0.76</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.043</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setMetadata</strong></td>
<td><i>should emit &#34;set-meta&#34; event</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setMetadata</strong></td>
<td><i>should create new metadata when it does not exist</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setMetadata</strong></td>
<td><i>should update existing metadata</i></td>
<td>passed</td>
<td>0.028</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:setMetadata</strong></td>
<td><i>should handle metadata with different token formats</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-node.test.ts</th>
<th></th>
<th></th>
<th>0.792</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteNode</strong></td>
<td><i>should delete a node by token</i></td>
<td>passed</td>
<td>0.034</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteNode</strong></td>
<td><i>should emit delete event when node is deleted</i></td>
<td>passed</td>
<td>0.036</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteNode</strong></td>
<td><i>should handle deletion of non-existent node gracefully</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteNode</strong></td>
<td><i>should maintain other nodes when deleting one</i></td>
<td>passed</td>
<td>0.03</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:deleteNode</strong></td>
<td><i>should allow deletion of all nodes</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-operation.test.ts</th>
<th></th>
<th></th>
<th>0.767</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addOperation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.043</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addOperation</strong></td>
<td><i>should add operation to project instance</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addOperation</strong></td>
<td><i>should handle different operation types</i></td>
<td>passed</td>
<td>0.033</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addOperation</strong></td>
<td><i>should handle different HTTP methods</i></td>
<td>passed</td>
<td>0.027</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addOperation</strong></td>
<td><i>should store operation with timestamp</i></td>
<td>passed</td>
<td>0.031</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-structure.test.ts</th>
<th></th>
<th></th>
<th>0.895</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addStructure</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.061</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addStructure</strong></td>
<td><i>should emit &#34;add-node&#34; event</i></td>
<td>passed</td>
<td>0.056</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addStructure</strong></td>
<td><i>should create a new structure when it does not exist</i></td>
<td>passed</td>
<td>0.058</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addStructure</strong></td>
<td><i>should return existing structure when it already exists</i></td>
<td>passed</td>
<td>0.058</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:addStructure</strong></td>
<td><i>should generate token if not provided</i></td>
<td>passed</td>
<td>0.054</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-relation-by-token.test.ts</th>
<th></th>
<th></th>
<th>0.698</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getRelationByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.046</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:getRelationByToken</strong></td>
<td><i>should handle empty implementation</i></td>
<td>passed</td>
<td>0.032</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>diff.test.ts</th>
<th></th>
<th></th>
<th>0.291</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:Diff</strong></td>
<td><i>should return delta for different objects</i></td>
<td>passed</td>
<td>0.002</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:Diff</strong></td>
<td><i>should return delta for different arrays</i></td>
<td>passed</td>
<td>0.002</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:Diff</strong></td>
<td><i>should return undefined for identical objects</i></td>
<td>passed</td>
<td>0</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>vpi:Diff</strong></td>
<td><i>should handle nested structures</i></td>
<td>passed</td>
<td>0.001</td>
</tr>
</tbody>
</table>
</center>