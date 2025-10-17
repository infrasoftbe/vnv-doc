---
title: How to get service versions
draft: false
contributors:
  - Houthoofd Guillaume
---
## How to get service versions and what they return

Available endpoint

```shell
GET /version
```

### How it works

1. **Current proxy-server version**:

   - Reads the server's `package.json`
   - Extracts [name](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html), `version`, `description`, `dependencies`, `devDependencies`
   - Filters packages starting with `@infrasoftbe`
2. **External services versions**:

   - Calls each service's `/version` endpoint via `requester.Get()`
   - **PNP API**: `PNPAPIURL('version')`
   - **Neo4j API**: `Neo4jAPIURL('version')`
   - **Webhook Bridge**: `WebhookBridgeIURL('version')`

Response structure returned

```json
{
	"proxy-server": {
		"name": "proxy-server-name",
		"version": "x.y.z",
		"description": "package description",
		"packages": {
			"@infrasoftbe/package1": "^1.0.0",
			"@infrasoftbe/package2": "^2.1.0"
		}
	},

	// PNP service response (if available)
	"pnp-service": { ... },

	// Neo4j service response (if available)
	"neo4j-service": { ... },

	// Webhook Bridge service response (if available)
	"webhook-service": { ... }
}
```

Usage

```shell
curl http://<vnv-remote-service-url-target>/version
```

This endpoint centralizes version information from all ecosystem services, enabling unified monitoring of deployed versions.
