# @infrasoftbe/vnv-sdk Test Results

> **Started**: Fri, 25 Jul 2025 14:21:38 GMT

<center>

|Suites (29)|Tests (197)|
|:-:|:-:|
|![](https://img.shields.io/badge/Passed-2-green) | ![](https://img.shields.io/badge/Passed-89-green)|
|![](https://img.shields.io/badge/Failed-27-red) | ![](https://img.shields.io/badge/Failed-108-red)|
|![](https://img.shields.io/badge/Pending-0-lightgrey) | ![](https://img.shields.io/badge/Pending-0-lightgrey)|

---

<table>
<thead>
<tr>
<th>add-structure.test.ts</th>
<th></th>
<th></th>
<th>10.7</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>addStructure</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.181</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addStructure</strong></td>
<td><i>should emit &#34;add-node&#34; event</i></td>
<td>failed</td>
<td>0.128</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addStructure</strong></td>
<td><i>should create a new structure when it does not exist</i></td>
<td>passed</td>
<td>0.18</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addStructure</strong></td>
<td><i>should return existing structure when it already exists</i></td>
<td>passed</td>
<td>0.088</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addStructure</strong></td>
<td><i>should generate token if not provided</i></td>
<td>passed</td>
<td>0.076</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-metadata.test.ts</th>
<th></th>
<th></th>
<th>10.665</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>addMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.185</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addMetadata</strong></td>
<td><i>should emit &#34;add-meta&#34; event</i></td>
<td>failed</td>
<td>0.1</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addMetadata</strong></td>
<td><i>should create new metadata when it does not exist</i></td>
<td>passed</td>
<td>0.117</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addMetadata</strong></td>
<td><i>should return existing metadata when it already exists</i></td>
<td>failed</td>
<td>0.191</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addMetadata</strong></td>
<td><i>should handle different metadata types</i></td>
<td>passed</td>
<td>0.071</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-relations.test.ts</th>
<th></th>
<th></th>
<th>10.679</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.148</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should query all relations by type</i></td>
<td>failed</td>
<td>0.152</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should query relations by from token</i></td>
<td>passed</td>
<td>0.095</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should query relations by to token</i></td>
<td>failed</td>
<td>0.14</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should return empty array when no relations match query</i></td>
<td>passed</td>
<td>0.186</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should query relations with multiple criteria</i></td>
<td>failed</td>
<td>0.071</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryRelationAll</strong></td>
<td><i>should return all relations when query is empty</i></td>
<td>failed</td>
<td>0.052</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-node.test.ts</th>
<th></th>
<th></th>
<th>10.898</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>setNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>failed</td>
<td>0.179</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setNode</strong></td>
<td><i>should update existing node properties</i></td>
<td>passed</td>
<td>0.178</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setNode</strong></td>
<td><i>should emit set event when node is updated</i></td>
<td>failed</td>
<td>0.058</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setNode</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>failed</td>
<td>0.067</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setNode</strong></td>
<td><i>should handle setting node with new token</i></td>
<td>failed</td>
<td>0.11</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setNode</strong></td>
<td><i>should update node type when changed</i></td>
<td>passed</td>
<td>0.114</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-structures.test.ts</th>
<th></th>
<th></th>
<th>10.929</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.148</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should query all structures</i></td>
<td>passed</td>
<td>0.203</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should query structures by type</i></td>
<td>failed</td>
<td>0.083</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should query structures by token</i></td>
<td>passed</td>
<td>0.082</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should query structures by name</i></td>
<td>passed</td>
<td>0.07</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should return empty array when no structures match query</i></td>
<td>passed</td>
<td>0.089</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryStructureAll</strong></td>
<td><i>should query structures with multiple criteria</i></td>
<td>failed</td>
<td>0.081</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>query-all-nodes.test.ts</th>
<th></th>
<th></th>
<th>11.105</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.19</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should query all nodes</i></td>
<td>failed</td>
<td>0.236</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should query nodes by type</i></td>
<td>failed</td>
<td>0.057</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should query nodes by token</i></td>
<td>failed</td>
<td>0.107</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should query nodes by name</i></td>
<td>failed</td>
<td>0.09</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should return empty array when no nodes match query</i></td>
<td>passed</td>
<td>0.124</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>queryNodeAll</strong></td>
<td><i>should query nodes with multiple criteria</i></td>
<td>failed</td>
<td>0.097</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-relation.test.ts</th>
<th></th>
<th></th>
<th>0.917</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>setRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.122</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setRelation</strong></td>
<td><i>should update existing relation properties</i></td>
<td>failed</td>
<td>0.061</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setRelation</strong></td>
<td><i>should emit set event when relation is updated</i></td>
<td>failed</td>
<td>0.051</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setRelation</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>failed</td>
<td>0.068</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setRelation</strong></td>
<td><i>should handle setting relation with new key</i></td>
<td>passed</td>
<td>0.057</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setRelation</strong></td>
<td><i>should maintain other relations when updating one</i></td>
<td>passed</td>
<td>0.042</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-structure-node.test.ts</th>
<th></th>
<th></th>
<th>1.025</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>deleteStructureChildNode</strong></td>
<td><i>should delete existing structure child node</i></td>
<td>failed</td>
<td>0.119</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteStructureChildNode</strong></td>
<td><i>should emit &#34;delete-node&#34; event</i></td>
<td>passed</td>
<td>0.074</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteStructureChildNode</strong></td>
<td><i>should return null for non-existing child</i></td>
<td>passed</td>
<td>0.075</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteStructureChildNode</strong></td>
<td><i>should return null when no metadata exists</i></td>
<td>passed</td>
<td>0.095</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteStructureChildNode</strong></td>
<td><i>should handle empty token gracefully</i></td>
<td>passed</td>
<td>0.07</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteStructureChildNode</strong></td>
<td><i>should only delete if node exists</i></td>
<td>failed</td>
<td>0.061</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-structure-node.test.ts</th>
<th></th>
<th></th>
<th>0.761</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>addStructureChildNode</strong></td>
<td><i>should create a new structure child node</i></td>
<td>failed</td>
<td>0.114</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addStructureChildNode</strong></td>
<td><i>should emit &#34;add-node&#34; event</i></td>
<td>failed</td>
<td>0.069</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addStructureChildNode</strong></td>
<td><i>should return existing structure child if already exists</i></td>
<td>failed</td>
<td>0.052</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addStructureChildNode</strong></td>
<td><i>should create parent-child relationship</i></td>
<td>failed</td>
<td>0.053</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addStructureChildNode</strong></td>
<td><i>should handle invalid input gracefully</i></td>
<td>passed</td>
<td>0.061</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>create-proxy.test.ts</th>
<th></th>
<th></th>
<th>0.826</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>createProxy</strong></td>
<td><i>should create a proxy with all required methods</i></td>
<td>failed</td>
<td>0.107</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>createProxy</strong></td>
<td><i>should preserve project instance context</i></td>
<td>failed</td>
<td>0.059</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>createProxy</strong></td>
<td><i>should handle method calls through proxy</i></td>
<td>failed</td>
<td>0.072</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>createProxy</strong></td>
<td><i>should maintain event emission capabilities</i></td>
<td>failed</td>
<td>0.063</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>createProxy</strong></td>
<td><i>should preserve data manager functionality</i></td>
<td>failed</td>
<td>0.071</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-structure.test.ts</th>
<th></th>
<th></th>
<th>1.128</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructure</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.104</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructure</strong></td>
<td><i>should update existing structure properties</i></td>
<td>passed</td>
<td>0.078</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setStructure</strong></td>
<td><i>should emit set event when structure is updated</i></td>
<td>failed</td>
<td>0.098</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setStructure</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>failed</td>
<td>0.123</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructure</strong></td>
<td><i>should handle setting structure with new token</i></td>
<td>passed</td>
<td>0.11</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setStructure</strong></td>
<td><i>should update structure type when changed</i></td>
<td>failed</td>
<td>0.073</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructure</strong></td>
<td><i>should handle multiple structure updates</i></td>
<td>passed</td>
<td>0.057</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-structure-node.test.ts</th>
<th></th>
<th></th>
<th>0.767</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>setStructureChildNode</strong></td>
<td><i>should create new structure child node if it does not exist</i></td>
<td>failed</td>
<td>0.079</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructureChildNode</strong></td>
<td><i>should update existing structure child node</i></td>
<td>passed</td>
<td>0.068</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructureChildNode</strong></td>
<td><i>should emit appropriate events</i></td>
<td>passed</td>
<td>0.056</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setStructureChildNode</strong></td>
<td><i>should handle invalid input gracefully</i></td>
<td>failed</td>
<td>0.075</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructureChildNode</strong></td>
<td><i>should return null when no metadata exists</i></td>
<td>passed</td>
<td>0.092</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setStructureChildNode</strong></td>
<td><i>should create parent-child relationship for new nodes</i></td>
<td>passed</td>
<td>0.052</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-node.test.ts</th>
<th></th>
<th></th>
<th>12.111</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>addNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.14</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addNode</strong></td>
<td><i>should emit &#34;add-node&#34; event</i></td>
<td>failed</td>
<td>0.076</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addNode</strong></td>
<td><i>should create a new node when it does not exist</i></td>
<td>failed</td>
<td>0.058</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addNode</strong></td>
<td><i>should return existing node when it already exists</i></td>
<td>failed</td>
<td>0.077</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addNode</strong></td>
<td><i>should create nodes of different types</i></td>
<td>failed</td>
<td>0.046</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>create-available-token.test.ts</th>
<th></th>
<th></th>
<th>0.907</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.125</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should create available token for node type</i></td>
<td>passed</td>
<td>0.08</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should create available token for structure type</i></td>
<td>passed</td>
<td>0.067</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should create available token for list type</i></td>
<td>passed</td>
<td>0.059</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should create available token for relation type</i></td>
<td>passed</td>
<td>0.057</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should create different tokens for same type</i></td>
<td>failed</td>
<td>0.04</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should create tokens that are actually available</i></td>
<td>passed</td>
<td>0.052</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>createAvailableToken</strong></td>
<td><i>should handle multiple token generations without conflicts</i></td>
<td>failed</td>
<td>0.072</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>update-operation.test.ts</th>
<th></th>
<th></th>
<th>1.181</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should update operation with same ID</i></td>
<td>failed</td>
<td>0.103</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should update existing operation</i></td>
<td>failed</td>
<td>0.091</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should handle non-existing operation gracefully</i></td>
<td>failed</td>
<td>0.079</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should return null for non-existent operation</i></td>
<td>failed</td>
<td>0.072</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should perform partial update of operation</i></td>
<td>failed</td>
<td>0.063</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should emit operation-updated event</i></td>
<td>failed</td>
<td>0.054</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should handle empty update data</i></td>
<td>passed</td>
<td>0.051</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should preserve operation id when updating</i></td>
<td>failed</td>
<td>0.059</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should update operation method and type</i></td>
<td>failed</td>
<td>0.065</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should perform partial update of operation</i></td>
<td>failed</td>
<td>0.056</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should emit operation-updated event</i></td>
<td>failed</td>
<td>0.057</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>updateOperation</strong></td>
<td><i>should handle empty update data</i></td>
<td>failed</td>
<td>0.042</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>is-available-token.test.ts</th>
<th></th>
<th></th>
<th>1.149</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.114</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for existing node token</i></td>
<td>passed</td>
<td>0.064</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for existing list token</i></td>
<td>passed</td>
<td>0.086</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for existing structure token</i></td>
<td>passed</td>
<td>0.071</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for project token</i></td>
<td>passed</td>
<td>0.061</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return true for non-existent token</i></td>
<td>failed</td>
<td>0.06</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return true for random unique token</i></td>
<td>failed</td>
<td>0.047</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for empty token</i></td>
<td>passed</td>
<td>0.058</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for null token</i></td>
<td>passed</td>
<td>0.067</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return false for undefined token</i></td>
<td>passed</td>
<td>0.047</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should handle case-sensitive token checking</i></td>
<td>failed</td>
<td>0.038</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>isAvailableToken</strong></td>
<td><i>should return true after token becomes available</i></td>
<td>failed</td>
<td>0.065</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-node-by-token.test.ts</th>
<th></th>
<th></th>
<th>0.966</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>failed</td>
<td>0.101</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should get existing node by token</i></td>
<td>failed</td>
<td>0.073</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should get different node by token</i></td>
<td>passed</td>
<td>0.069</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should return undefined for non-existent token</i></td>
<td>failed</td>
<td>0.057</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should return undefined for empty token</i></td>
<td>failed</td>
<td>0.059</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should return undefined for null token</i></td>
<td>failed</td>
<td>0.07</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should handle case-sensitive token matching</i></td>
<td>failed</td>
<td>0.045</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should get node with all properties intact</i></td>
<td>failed</td>
<td>0.057</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getNodeByToken</strong></td>
<td><i>should get node consistently across multiple calls</i></td>
<td>failed</td>
<td>0.045</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>ensure-project-instance.test.ts</th>
<th></th>
<th></th>
<th>1.188</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>ensureInstance</strong></td>
<td><i>should return existing project instance when valid</i></td>
<td>failed</td>
<td>0.334</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>ensureInstance</strong></td>
<td><i>should validate project instance structure</i></td>
<td>failed</td>
<td>0.077</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>ensureInstance</strong></td>
<td><i>should handle invalid context gracefully</i></td>
<td>passed</td>
<td>0.072</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>ensureInstance</strong></td>
<td><i>should validate project instance properties</i></td>
<td>passed</td>
<td>0.048</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>ensureInstance</strong></td>
<td><i>should return the same instance when called multiple times</i></td>
<td>failed</td>
<td>0.219</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>ensureInstance</strong></td>
<td><i>should preserve all project methods and properties</i></td>
<td>failed</td>
<td>0.097</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>has-node.test.ts</th>
<th></th>
<th></th>
<th>1.281</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>hasNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>failed</td>
<td>0.09</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return true for existing node</i></td>
<td>failed</td>
<td>0.069</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return true for another existing node</i></td>
<td>passed</td>
<td>0.077</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return false for non-existent node</i></td>
<td>passed</td>
<td>0.062</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return false for empty token</i></td>
<td>passed</td>
<td>0.058</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return false for null token</i></td>
<td>passed</td>
<td>0.057</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return false for undefined token</i></td>
<td>passed</td>
<td>0.058</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should handle case-sensitive token checking</i></td>
<td>passed</td>
<td>0.121</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return true after adding new node</i></td>
<td>passed</td>
<td>0.213</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>hasNode</strong></td>
<td><i>should return false after deleting node</i></td>
<td>failed</td>
<td>0.085</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>set-list.test.ts</th>
<th></th>
<th></th>
<th>1.163</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>setList</strong></td>
<td><i>should initialize project instance</i></td>
<td>failed</td>
<td>0.085</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setList</strong></td>
<td><i>should update existing list properties</i></td>
<td>passed</td>
<td>0.064</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setList</strong></td>
<td><i>should emit set event when list is updated</i></td>
<td>failed</td>
<td>0.066</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setList</strong></td>
<td><i>should preserve original create_dt when updating</i></td>
<td>failed</td>
<td>0.062</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setList</strong></td>
<td><i>should handle setting list with new token</i></td>
<td>failed</td>
<td>0.092</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>setList</strong></td>
<td><i>should update list type when changed</i></td>
<td>failed</td>
<td>0.162</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>setList</strong></td>
<td><i>should handle multiple list updates</i></td>
<td>passed</td>
<td>0.205</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-node.test.ts</th>
<th></th>
<th></th>
<th>2.064</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>deleteNode</strong></td>
<td><i>should initialize project instance</i></td>
<td>failed</td>
<td>0.346</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteNode</strong></td>
<td><i>should delete a node by token</i></td>
<td>failed</td>
<td>0.261</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteNode</strong></td>
<td><i>should emit delete event when node is deleted</i></td>
<td>failed</td>
<td>0.16</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteNode</strong></td>
<td><i>should handle deletion of non-existent node gracefully</i></td>
<td>passed</td>
<td>0.187</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteNode</strong></td>
<td><i>should maintain other nodes when deleting one</i></td>
<td>passed</td>
<td>0.178</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteNode</strong></td>
<td><i>should allow deletion of all nodes</i></td>
<td>passed</td>
<td>0.102</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-operation.test.ts</th>
<th></th>
<th></th>
<th>2.085</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>addOperation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.462</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addOperation</strong></td>
<td><i>should add operation to project instance</i></td>
<td>failed</td>
<td>0.08</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addOperation</strong></td>
<td><i>should emit add-operation event</i></td>
<td>failed</td>
<td>0.072</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addOperation</strong></td>
<td><i>should handle different operation types</i></td>
<td>failed</td>
<td>0.243</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addOperation</strong></td>
<td><i>should handle different HTTP methods</i></td>
<td>failed</td>
<td>0.191</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>addOperation</strong></td>
<td><i>should store operation with timestamp</i></td>
<td>failed</td>
<td>0.149</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>find-node-by-token.test.ts</th>
<th></th>
<th></th>
<th>2.147</th>
</tr>
</thead>
<tbody>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should initialize project instance</i></td>
<td>failed</td>
<td>0.354</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should find existing node by token</i></td>
<td>failed</td>
<td>0.271</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should find second node by token</i></td>
<td>failed</td>
<td>0.115</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should return null for non-existent token</i></td>
<td>failed</td>
<td>0.303</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should return null for empty token</i></td>
<td>failed</td>
<td>0.186</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should return null for undefined token</i></td>
<td>failed</td>
<td>0.083</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should handle case-sensitive token matching</i></td>
<td>failed</td>
<td>0.211</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>findNodeByToken</strong></td>
<td><i>should find node after adding more nodes</i></td>
<td>failed</td>
<td>0.247</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-metadata-by-token.test.ts</th>
<th></th>
<th></th>
<th>2.751</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should return existing metadata by token</i></td>
<td>passed</td>
<td>0.358</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should return undefined for non-existing token</i></td>
<td>failed</td>
<td>0.251</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should handle empty token</i></td>
<td>failed</td>
<td>0.292</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should handle null token</i></td>
<td>failed</td>
<td>0.102</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should return correct metadata when multiple exist</i></td>
<td>passed</td>
<td>0.316</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should return the same instance for repeated calls</i></td>
<td>passed</td>
<td>0.165</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getMetadataByToken</strong></td>
<td><i>should handle case-sensitive tokens</i></td>
<td>failed</td>
<td>0.197</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-metadata.test.ts</th>
<th></th>
<th></th>
<th>3.393</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteMetadata</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.321</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteMetadata</strong></td>
<td><i>should delete metadata by token</i></td>
<td>failed</td>
<td>0.126</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteMetadata</strong></td>
<td><i>should emit delete event when metadata is deleted</i></td>
<td>failed</td>
<td>0.163</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteMetadata</strong></td>
<td><i>should handle deletion of non-existent metadata gracefully</i></td>
<td>passed</td>
<td>0.392</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteMetadata</strong></td>
<td><i>should maintain other metadata when deleting one</i></td>
<td>failed</td>
<td>0.255</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteMetadata</strong></td>
<td><i>should allow deletion of all metadata</i></td>
<td>failed</td>
<td>0.269</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>delete-relation.test.ts</th>
<th></th>
<th></th>
<th>3.787</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.554</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteRelation</strong></td>
<td><i>should delete a relation by key</i></td>
<td>failed</td>
<td>0.359</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>deleteRelation</strong></td>
<td><i>should emit delete event when relation is deleted</i></td>
<td>failed</td>
<td>0.437</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteRelation</strong></td>
<td><i>should handle deletion of non-existent relation gracefully</i></td>
<td>passed</td>
<td>0.343</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>deleteRelation</strong></td>
<td><i>should maintain other relations when deleting one</i></td>
<td>passed</td>
<td>0.378</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>get-list-by-token.test.ts</th>
<th></th>
<th></th>
<th>4.219</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should return existing list by token</i></td>
<td>passed</td>
<td>0.583</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should return undefined for non-existing token</i></td>
<td>failed</td>
<td>0.217</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should handle empty token</i></td>
<td>failed</td>
<td>0.373</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should handle null token</i></td>
<td>failed</td>
<td>0.367</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should return correct list when multiple lists exist</i></td>
<td>passed</td>
<td>0.366</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should return the same instance for repeated calls</i></td>
<td>passed</td>
<td>0.429</td>
</tr>
<tr style="background-color: pink; color: black">
<td><strong>getListByToken</strong></td>
<td><i>should handle case-sensitive tokens</i></td>
<td>failed</td>
<td>0.168</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-list.test.ts</th>
<th></th>
<th></th>
<th>3.545</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>addList</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.441</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addList</strong></td>
<td><i>should emit &#34;add-list&#34; event</i></td>
<td>passed</td>
<td>0.086</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addList</strong></td>
<td><i>should create new list when token doesn&#39;t exist</i></td>
<td>passed</td>
<td>0.269</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addList</strong></td>
<td><i>should return existing list when token already exists</i></td>
<td>passed</td>
<td>0.406</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addList</strong></td>
<td><i>should create a new list with pre-configured existing relations</i></td>
<td>passed</td>
<td>0.254</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>add-relation.test.ts</th>
<th></th>
<th></th>
<th>4.43</th>
</tr>
</thead>
<tbody>
<tr style="background-color: lightgreen; color: black">
<td><strong>addRelation</strong></td>
<td><i>should initialize project instance</i></td>
<td>passed</td>
<td>0.333</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addRelation</strong></td>
<td><i>should add nodes to the project instance</i></td>
<td>passed</td>
<td>0.294</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addRelation</strong></td>
<td><i>should have relations initialized</i></td>
<td>passed</td>
<td>0.442</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addRelation</strong></td>
<td><i>sould emit &#34;add-relation&#34; event</i></td>
<td>passed</td>
<td>0.403</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addRelation</strong></td>
<td><i>should create a new relation when it does not exist</i></td>
<td>passed</td>
<td>0.269</td>
</tr>
<tr style="background-color: lightgreen; color: black">
<td><strong>addRelation</strong></td>
<td><i>should return existing relation when it already exists</i></td>
<td>passed</td>
<td>0.372</td>
</tr>
</tbody>
</table>
</center>