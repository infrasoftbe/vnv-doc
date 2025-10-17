---
title: dump
---

````markdown
# Update CI/CD Workflow VNV
This document describes a propopsal to add a test environment to the CI/CD pipeline for the VNV project.

## Requirements
- An analyst must be able to choose and deploy a semantic version of the VNV-tool.
- Immutable versions: version tags are permanent, auditable and can be rolled back.
- Build one, promote principle: the exact same image / artifact goes to dev and then prod (no "works on my machine" problems)
- Each version of the tool is also tied to a consistent Neo4j dataset.

## Current setup

We use github actions and terraform to build and deploy. A merge and push to one of three branches release/dev, release/test or release/prod triggers a build for dev, test or prod respectively.

### Current Architecture on AWS ECS

Our production architecture consists of multiple containerized services deployed on AWS ECS Fargate:

- **infrasoft-vnv-proxy-server** (port 8080) - Main application server
- **infrasoft-vnv-event-bridge** (port 8082) - Event handling service  
- **infrasoft-vnv-pnp-server** (port 8081) - PnP REST API
- **infrasoft-vnv-neo-server** (port 3000) - Neo4j interface server
- **redis** (port 6379) - Caching layer

These services are defined in ECS Task Definitions that reference Docker images with **fixed tags** (`test`, `prod`):

```json
{
  "containerDefinitions": [
    {
      "image": "ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:test",
      "name": "vnv-proxy-server"
    },
    {
      "image": "ghcr.io/infrasoftbe/infrasoft-vnv-event-bridge:test", 
      "name": "vnv-event-bridge"
    }
  ]
}
```

### Why Fixed Tags Are Required for ECS

**ECS services cannot automatically detect new image versions** - they only know about the image tag referenced in their Task Definition. When we push a new image with the same tag (e.g., `:test`), ECS continues running the old cached version until explicitly told to redeploy.

This is why our current workflow uses **fixed environment tags** and **force deployment**:

1. **Build & Push**: New image overwrites the existing `:test` tag
2. **Force Redeploy**: `aws ecs update-service --force-new-deployment` pulls the updated image
3. **Service Update**: ECS downloads the new image with the same tag and restarts containers

### Current Deployment Flow

For each service:

- When the branch release/dev is pushed, the github actions defined in release.dev.yml are triggered. This results in a docker image tagged 'dev' being built and pushed to ghcr.
- When the branch release/test is pushed, the github actions defined in release.test.yml are triggered. This results in:
    - A docker image tagged 'test' being built and pushed to ghcr (overwriting any existing :test image).
    - A terraform script that forces ECS service redeployment to pull the updated image.
- When the branch release/prod is pushed, the github actions defined in release.prod.yml are triggered. This results in:
    - A docker image tagged 'prod' being built and pushed to ghcr (overwriting any existing :prod image).
    - A terraform script that forces ECS service redeployment to pull the updated image.

### Current Setup Limitations

While our current approach ensures reliable deployments, it has several limitations:

- **No Version Traceability**: Impossible to know which exact code version is running in production
- **No Rollback Capability**: Cannot easily revert to a previous working version
- **No Audit Trail**: No proof of which version was deployed when for compliance
- **Race Conditions**: If deployment happens during build, unclear which version gets deployed
- **Testing Guarantees**: No guarantee that the exact same artifact tested goes to production

### Proposal

## Git organization

We use a clean, trunk-based setup:
- Main branch is protected, merge requests only.
- We make semantic versioning tags in the form vMAJOR.MINOR.PATCH-RCx for test releases of a certain version vMAJOR.MINOR.PATCH
- When a release candidate is tested and approved, we use semantic versioning tags: vMAJOR.MINOR.PATCH for production releases to promote the test version to the production version.
  - On release to production, we don't create a new build, but we tag the docker images vMAJOR.MINOR.PATCH-RCx to vMAJOR.MINOR.PATCH. This guarantees we are releasing the exact same version as the tested version.

## Hybrid Approach: Double Tagging Strategy

To maintain **ECS compatibility** while gaining **version traceability**, we propose a **double tagging approach**:

### The Challenge
- **ECS Requirement**: Task Definitions need fixed tags (`:test`, `:prod`) for automatic redeployment
- **Versioning Need**: We need semantic tags (`:v1.2.3-rc.1`) for traceability and rollbacks

### The Solution: Build Once, Tag Twice
Each build creates **two tags pointing to the same image**:

```bash
# Build once
docker build -t ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:v1.2.3-rc.1 .

# Create environment alias (same image, different tag)
docker tag ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:v1.2.3-rc.1 \
           ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:test

# Push both tags
docker push ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:v1.2.3-rc.1
docker push ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:test
```

### Benefits of Double Tagging

1. **ECS Compatibility**: Task Definitions continue using `:test` and `:prod` tags
2. **Version Traceability**: Semantic tags provide exact version information
3. **Easy Rollback**: Re-tag any previous version to environment tag
4. **Zero Infrastructure Changes**: Existing ECS setup remains unchanged
5. **Audit Trail**: Complete history of what was deployed when

### Rollback Example
```bash
# Rollback test environment to previous version
docker buildx imagetools create \
  --tag ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:test \
  ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:v1.2.2

# Force ECS redeployment
aws ecs update-service --cluster infrasoft-test-services-2 \
                       --service infrasoft-vnv-srv-test \
                       --force-new-deployment
```



## Build

- We use Github and Github actions to build the different services and publish them as docker images with the double tagging strategy
    - A git tag is used to mark the version of a release. Release candidates are tagged as vMAJOR.MINOR.PATCH-RCx, production builds are tagged as vMAJOR.MINOR.PATCH.
    - When a RC tag is added to the git tree, this triggers the build of the docker image for that service. The git RC tag is used as a semantic docker image tag, plus an environment tag for ECS compatibility.
    - When a production tag is added to the git tree, the docker images of the corresponding RC-version are re-tagged with the production environment tag (no rebuild).
```yaml
# .github/workflows/release-to-ghcr.yml
name: Release to GHCR (RC builds + prod retag)

on:
  push:
    tags:
      - "v*.*.*"        # catches both vX.Y.Z and vX.Y.Z-rc.N

permissions:
  contents: read
  packages: write   # needed to push to GHCR

env:
  ORG: your-org                                  # <-- set your org
  SERVICES: "service-api service-web service-worker"  # <-- list all images
  REGISTRY: ghcr.io

jobs:
  # -------------------- Detect tag kind --------------------
  classify:
    runs-on: ubuntu-latest
    outputs:
      is_rc: ${{ steps.k.outputs.is_rc }}
      base:  ${{ steps.k.outputs.base }}
      tag:   ${{ steps.k.outputs.tag }}
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }   # we'll need tags later
      - id: k
        shell: bash
        run: |
          TAG="${GITHUB_REF_NAME}"          # e.g. v1.8.0-rc.3 or v1.8.0
          if [[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+-rc\.[0-9]+$ ]]; then
            echo "is_rc=true"  >> "$GITHUB_OUTPUT"
            BASE="${TAG%%-rc.*}"            # v1.8.0
          elif [[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "is_rc=false" >> "$GITHUB_OUTPUT"
            BASE="$TAG"
          else
            echo "::error::Unsupported tag format: $TAG"
            exit 1
          fi
          echo "base=$BASE" >> "$GITHUB_OUTPUT"
          echo "tag=$TAG"   >> "$GITHUB_OUTPUT"

  # -------------------- Build & push RC --------------------
  build_rc:
    needs: classify
    if: needs.classify.outputs.is_rc == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build & push images for RC tag (Double Tagging)
        env:
          TAG: ${{ needs.classify.outputs.tag }}                 # vX.Y.Z-rc.N
          SHA_TAG: sha-${{ github.sha }}                        # optional extra tag
          ENV_TAG: test                                         # Fixed tag for ECS
          ORG: ${{ env.ORG }}
          REG: ${{ env.REGISTRY }}
        shell: bash
        run: |
          set -euo pipefail
          for svc in $SERVICES; do
            img="$REG/$ORG/$svc"
            echo "Building $img with double tagging: $TAG + $ENV_TAG"
            
            # Build with semantic tag
            docker build -t "$img:$TAG" "services/$svc"
            
            # Create environment alias (same image, different tag)
            docker tag "$img:$TAG" "$img:$ENV_TAG"
            docker tag "$img:$TAG" "$img:$SHA_TAG"   # optional
            
            # Push all tags
            docker push "$img:$TAG"      # Semantic version (v1.2.3-rc.1)
            docker push "$img:$ENV_TAG"  # Environment tag (test) for ECS
            docker push "$img:$SHA_TAG"  # Optional SHA tag
            
            echo "✅ Pushed: $img:$TAG (semantic) and $img:$ENV_TAG (ECS)"
          done

  # -------------------- Retag PROD from latest RC --------------------
  retag_prod:
    needs: classify
    if: needs.classify.outputs.is_rc == 'false'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Find latest RC for this base version
        id: rc
        shell: bash
        run: |
          BASE="${{ needs.classify.outputs.base }}"             # vX.Y.Z
          # list tags like vX.Y.Z-rc.* and pick the highest by version
          LATEST_RC="$(git tag -l "${BASE}-rc.*" --sort=-v:refname | head -n1)"
          if [[ -z "$LATEST_RC" ]]; then
            echo "::error::No RC tag found for $BASE (expected ${BASE}-rc.N)."
            exit 1
          fi
          echo "rc_tag=$LATEST_RC" >> "$GITHUB_OUTPUT"
          echo "Using RC: $LATEST_RC"

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Buildx (for manifest copy without pulling)
        uses: docker/setup-buildx-action@v3

      - name: Retag all services (RC -> PROD) with double tagging
        env:
          ORG: ${{ env.ORG }}
          REG: ${{ env.REGISTRY }}
          PROD_TAG: ${{ needs.classify.outputs.base }}          # vX.Y.Z
          RC_TAG:   ${{ steps.rc.outputs.rc_tag }}              # vX.Y.Z-rc.N
          ENV_TAG: prod                                         # Fixed tag for ECS
        shell: bash
        run: |
          set -euo pipefail
          for svc in $SERVICES; do
            src="$REG/$ORG/$svc:$RC_TAG"
            semantic_dst="$REG/$ORG/$svc:$PROD_TAG"
            env_dst="$REG/$ORG/$svc:$ENV_TAG"
            
            echo "Promoting RC to Production with double tagging:"
            echo "  Source: $src"
            echo "  Semantic: $semantic_dst" 
            echo "  Environment: $env_dst"
            
            # Create semantic production tag (same image as RC)
            docker buildx imagetools create --tag "$semantic_dst" "$src"
            
            # Update environment tag for ECS (points to same image)
            docker buildx imagetools create --tag "$env_dst" "$src"
            
            echo "✅ Promoted: $semantic_dst (semantic) and $env_dst (ECS)"
          done
          echo "🎉 Production promotion complete - same tested image now in prod!"

```
## Deployment

- The dev environment is deployed to a local server. A local github runner is used for the deployment.
- The production environment is deployed to aws ecs. A terraform script is used for the deployment.
- We add an "Orchestration repo" to the project, with a single deploy workflow that takes an environment and a version. 

### Deployment Strategy with Double Tagging

The deployment process leverages our double tagging approach:

1. **ECS Task Definitions** continue using fixed environment tags (`:test`, `:prod`)
2. **Version Selection** allows deploying any semantic version by re-tagging
3. **Force Redeployment** ensures ECS pulls the updated image

#### Dev Environment
- **Deployment Method**: Docker Compose on local server via self-hosted runner
- **Image Selection**: Uses semantic tags directly in compose file
- **Dependencies**: Includes Neo4j and MinIO containers for complete local stack

#### Test/Production Environment  
- **Deployment Method**: ECS Fargate via Terraform
- **Image Selection**: Re-tag semantic version to environment tag, then force ECS redeploy
- **Task Definitions**: Remain unchanged (still reference `:test` or `:prod`)

### Deployment Workflow Features

- **Manual Version Selection**: Analyst can choose any semantic version to deploy
- **Environment Isolation**: Same MSAL authentication across all environments
- **Image Validation**: Verify semantic version exists before deployment
- **Atomic Updates**: All services updated together to maintain consistency

#### **Frontend Application Deployment Process**

The deployment process extends to include React application versioning:

1. **Build Process**: React app build includes `release.json` with version metadata
2. **S3 Provisioning**: Create both fixed and versioned buckets via Terraform
3. **Azure AD Registration**: Automatically register redirect URLs for new versions
4. **Proxy Configuration**: ECS services read `release.json` to determine target bucket
5. **Rollback Process**: Update `release.json` and restart services to switch versions

#### For dev environment:
The deploy workflow:
1. Validates all Docker images exist for the given semantic version tag
2. Updates docker-compose.yml with the specific version
3. **Creates versioned S3 bucket** and uploads React build
4. **Generates release.json** with version and bucket information
5. Executes `compose pull && compose up -d` using the local github runner

#### For production environment: 
The deploy workflow:
1. Validates all Docker images exist for the given semantic version tag
2. Re-tags the semantic version to the environment tag (`:test` or `:prod`)
3. **Creates/updates versioned S3 bucket** for React application
4. **Registers Azure AD redirect URLs** for the new bucket via Terraform
5. **Updates release.json** in the ECS deployment with new version information
6. Executes the terraform script to force ECS service redeployment

Example workflow:
```yaml
name: Deploy (dev=Compose, prod=ECS via Terraform)

on:
  workflow_dispatch:
    inputs:
      environment:
        description: "Target environment"
        type: choice
        required: true
        options: [dev, production]
      version:
        description: "Release tag (e.g., v1.4.2)"
        required: true

permissions:
  contents: read
  id-token: write      # <-- needed for AWS OIDC
  deployments: write

concurrency:
  group: deploy-${{ inputs.environment }}-stack
  cancel-in-progress: false

jobs:
  # ---------- DEV: Docker Compose on your self-hosted server ----------
  dev:
    if: ${{ inputs.environment == 'dev' }}
    runs-on: [self-hosted, vnv-server]
    environment: dev
    steps:
      - name: Show selection
        run: |
          echo "ENV=${{ inputs.environment }}"
          echo "VER=${{ inputs.version }}"

      - name: Prepare runtime env
        working-directory: deploy
        run: |
          cat > .env.runtime <<EOF
          APP_ENV=dev
          IMAGE_TAG=${{ inputs.version }}
          S3_ENDPOINT=${{ secrets.S3_ENDPOINT }}
          S3_ACCESS_KEY_ID=${{ secrets.S3_ACCESS_KEY_ID }}
          S3_SECRET_ACCESS_KEY=${{ secrets.S3_SECRET_ACCESS_KEY }}
          NEO4J_AUTH=${{ secrets.NEO4J_AUTH }}
          MINIO_ROOT_USER=${{ secrets.MINIO_ROOT_USER }}
          MINIO_ROOT_PASSWORD=${{ secrets.MINIO_ROOT_PASSWORD }}
          EOF

      - name: Login to GHCR
        if: ${{ secrets.GHCR_PAT != '' }}
        run: echo "${{ secrets.GHCR_PAT }}" | docker login ghcr.io -u "${{ secrets.GHCR_USER }}" --password-stdin

      - name: Pull + up dev stack with selected version (app + MinIO + Neo4j)
        working-directory: deploy
        run: |
          VERSION=${{ inputs.version }}
          
          # Update docker-compose with specific semantic version
          sed -i "s|:latest|:${VERSION}|g" compose.dev.yml
          sed -i "s|:dev|:${VERSION}|g" compose.dev.yml
          
          echo "🚀 Deploying version ${VERSION} to dev environment"
          docker compose -f compose.yml -f compose.dev.yml pull
          docker compose -f compose.yml -f compose.dev.yml --env-file .env.runtime up -d

      - name: Health checks
        run: |
          curl -fsS http://localhost:8080/health

  # ---------- PROD: Terraform to ECS ----------
  prod:
    if: ${{ inputs.environment == 'production' }}
    runs-on: ubuntu-latest
    environment:
      name:
    env:
      TF_VAR_release_tag: ${{ inputs.version }}      
    steps:
     - name: � Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: 1.5.0

      - name: 🏷️ Retag semantic version to environment tag
        run: |
          VERSION=${{ inputs.version }}
          ENV=${{ inputs.environment }}  # 'production' maps to 'prod' tag
          ENV_TAG=$([ "$ENV" = "production" ] && echo "prod" || echo "$ENV")
          
          echo "� Re-tagging version ${VERSION} to environment tag :${ENV_TAG}"
          
          # Services in our ECS stack
          SERVICES="infrasoft-vnv-proxy-server infrasoft-vnv-event-bridge infrasoft-vnv-pnp-server infrasoft-vnv-neo-server"
          
          for service in $SERVICES; do
            IMAGE_BASE="ghcr.io/infrasoftbe/${service}"
            
            echo "  Retagging: ${IMAGE_BASE}:${VERSION} → ${IMAGE_BASE}:${ENV_TAG}"
            
            # Retag the semantic version to environment tag (same image, new tag)
            docker buildx imagetools create \
              --tag "${IMAGE_BASE}:${ENV_TAG}" \
              "${IMAGE_BASE}:${VERSION}"
          done
          
          echo "✅ All services re-tagged for ${ENV} environment"

      - name: �🚀 Deploy to ECS with Terraform (Force Redeploy)
        working-directory: ./terraform/prod
        run: |
          echo "🔄 Starting PRODUCTION ECS redeploy with Terraform..."
          echo "ℹ️  ECS will pull updated images with :prod tag"
          
          # Initialiser Terraform avec le fichier spécifique pour production
          terraform init
          
          # Planifier le déploiement avec le fichier production
          terraform plan \
            -var="cluster_name=infrasoft-prod-cluster" \
            -var="service_name=infrasoft-vnv-srv-prod" \
            -var="aws_region=eu-central-1" \
            -out=tfplan-prod
          
          # Appliquer le déploiement (force new deployment)
          terraform apply -auto-approve tfplan-prod
          
          # Récupérer les outputs
          CLUSTER_NAME=$(terraform output -raw cluster_name)
          SERVICE_NAME=$(terraform output -raw service_name)
          DEPLOYMENT_TIME=$(terraform output -raw deployment_time)
          
          echo "✅ PRODUCTION ECS redeploy completed:"
          echo "   - Cluster: ${CLUSTER_NAME}"
          echo "   - Service: ${SERVICE_NAME}"
          echo "   - Version Deployed: ${{ inputs.version }}"
          echo "   - Deployment Time: ${DEPLOYMENT_TIME}"

      - name: ⏳ Wait for PRODUCTION Deployment to Complete
        run: |
          echo "⏳ Waiting for PRODUCTION ECS service to stabilize..."
          
          # Attendre avec un timeout plus long et plus de tolérance
          set +e  # Ne pas échouer immédiatement en cas d'erreur
          aws ecs wait services-stable \
            --cluster infrasoft-prod-cluster \
            --services infrasoft-vnv-srv-prod \
            --region eu-central-1 \
            --cli-read-timeout 900
          
          WAIT_EXIT_CODE=$?
          
          if [ $WAIT_EXIT_CODE -eq 0 ]; then
            echo "✨ PRODUCTION Service is now stable and running with the new image!"
          else
            echo "⚠️ PRODUCTION Service stabilization timed out, but deployment was initiated successfully."
            echo "   Check the AWS console to verify the deployment status."
            # Vérifier le statut actuel du service
            aws ecs describe-services \
              --cluster infrasoft-prod-cluster \
              --services infrasoft-vnv-srv-prod \
              --region eu-central-1 \
              --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount}' \
              --output table
          fi
          
          set -e  # Réactiver l'arrêt en cas d'erreur pour les autres étapes

      - name: �📣 Send Notification to Teams
        run: |
          set +e  # Désactive l'arrêt immédiat en cas d'erreur
          TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
          curl -H "Content-Type: application/json" -X POST -d "{
            \"text\": \"� **PRODUCTION ECS Service Redeployed Successfully**\\n
            - **📦 Package** : ${PACKAGE_NAME}\\n
            - **🖼️ Image** : ${IMAGE_NAME}:${IMAGE_TAG}\\n
            - **� ECS Cluster** : infrasoft-prod-cluster\\n
            - **🔧 ECS Service** : infrasoft-vnv-srv-prod\\n
            - **⏱️ Timestamp** : ${TIMESTAMP}\\n
            - **🔗 Image Link** : https://github.com/orgs/${{ secrets.GHCR_USERNAME }}/packages/container/package/${PACKAGE_NAME}\\n
            \\n
            🔥 PRODUCTION service is now running with the latest image! 🎉\"
          }" ${{ secrets.TEAMS_WEBHOOK_URL }}
          # On ajoute ici un check pour gérer les erreurs et éviter que le job échoue
          if [ $? -ne 0 ]; then
            echo "L'envoi de la notification Teams a échoué, mais le flux continue."
          fi
          set -e  # Réactive l'arrêt en cas d'erreur pour les autres étapes

      - name: 🧹 Clean up Terraform files
        if: always()
        working-directory: ./terraform/prod
        run: |
          rm -f tfplan-prod
          rm -f .terraform.lock.hcl
```
### Frontend Application Versioning Challenge

Our architecture includes a **React application** deployed to **S3 static websites**, with the ECS proxy server redirecting to the appropriate bucket:

```typescript
// Current proxy setup (fixed target)
return createProxyMiddleware({
  target: 'http://studio-app-test.s3-website.eu-central-1.amazonaws.com',
  changeOrigin: true
})(req, res, next);
```

#### Current Frontend Architecture
- **React App Build** → **S3 Static Website** (studio-app-test, studio-app-prod)
- **ECS Proxy Server** → Dynamic redirect to S3 bucket
- **Azure AD Authentication** → Requires pre-configured redirect URLs

#### Frontend Versioning Requirements
We want to extend the **double tagging concept** to React applications:

1. **Version Alignment**: All servers and React app should share the same version
2. **Dynamic Bucket Routing**: Proxy should redirect to versioned buckets
3. **Azure AD Compatibility**: Redirect URLs must be registered in Azure AD
4. **Snapshot Support**: Additional `.snap.XXXX` versions for infrastructure testing

### Proposed Frontend Versioning Solutions

#### **Approach 1: Double S3 Bucket Provisioning (Limited by ECS Constraints)**

Create both **fixed environment buckets** and **versioned buckets**:

```
studio-app-test                    # Fixed bucket (ECS compatibility)
studio-app-prod                    # Fixed bucket (ECS compatibility)  
studio-app-v1.2.3-rc.1            # Versioned bucket (for testing/validation)
studio-app-v1.2.3                 # Versioned bucket (for audit trail)
studio-app-v1.2.3.snap.20241001   # Snapshot bucket (temporary testing)
```

**Critical Constraint - ECS Task Definition Limitation:**
```typescript
// PROBLEM: This approach requires dynamic infrastructure changes
const RELEASE = JSON.parse(fs.readFileSync('./release.json'));

return createProxyMiddleware({
  target: `http://studio-app-${RELEASE.version}.s3-website.eu-central-1.amazonaws.com`,
  changeOrigin: true
})(req, res, next);
```

**⚠️ ECS Infrastructure Challenge:**
- **ECS Task Definitions are immutable** - changing proxy target requires new task definition
- **No real-time version switching** - would need workflow to create new ECS tasks dynamically
- **Infrastructure complexity** - each version would need its own ECS service definition

**Realistic Benefits (with limitations):**
- ✅ **Version Traceability**: Versioned buckets for audit and validation
- ✅ **Testing Isolation**: Test specific versions before promotion
- ❌ **Real-time Switching**: Cannot switch versions without ECS redeployment
- ❌ **Dynamic Infrastructure**: Cannot create clusters/tasks on-demand easily

#### **Approach 2: CloudFront with Version-Aware URLs (More Feasible)**

Use **CloudFront distributions** with version information in custom headers or paths:

```
https://d1234567890.cloudfront.net/v1.2.3/    # Version in path
https://studio-v1-2-3.cloudfront.net/         # Version in subdomain (requires DNS)
```

**More Realistic Approach - Path-Based Versioning:**
```typescript
// ECS proxy can route to same CloudFront with different paths
return createProxyMiddleware({
  target: 'https://d1234567890.cloudfront.net',
  pathRewrite: {
    '^/': `/v${RELEASE.version}/`  // Rewrite all paths to include version
  },
  changeOrigin: true
})(req, res, next);
```

**Benefits:**
- ✅ **CDN Performance**: CloudFront caching and global distribution
- ✅ **Version Visibility**: Version information visible in URL path
- ✅ **SSL Termination**: Automatic HTTPS support
- ✅ **No ECS Changes**: Same CloudFront, different path routing

**Remaining Challenges:**
- ❌ **CloudFront Configuration**: Still requires automation to create versioned origins
- ❌ **Cache Invalidation**: Different versions need separate cache management
- ❌ **Path Complexity**: Frontend routing needs to handle version prefixes

#### **Azure AD Integration Strategy**

For both approaches, **Terraform automation** can manage Azure AD redirect URLs:

```hcl
# Terraform Azure AD Application Registration
resource "azuread_application" "vnv_app" {
  display_name = "VNV Application"
  
  web {
    redirect_uris = [
      "https://vnv.example.com/auth/callback",                    # Production
      "http://studio-app-test.s3-website.eu-central-1.amazonaws.com/auth/callback",  # Test
      "http://studio-app-v${var.app_version}.s3-website.eu-central-1.amazonaws.com/auth/callback", # Versioned
    ]
  }
}
```

This ensures **automatic registration** of versioned URLs for Azure AD authentication.

### Authentication
- The test and the production environment both use the same Azure AD for authentication, using MSAL.
- **Versioned deployments** automatically register their redirect URLs in Azure AD via Terraform.
- **Snapshot deployments** can use temporary Azure AD registrations for testing.

### Bootstrapping

#### Context

A second point of attention to avoid 'works on my machine' problems is having a consistent and predictable dataset in the application delivery and testing pipeline.

This ensures:
- Reproducibility of tests: Test results depend only on the code under test, not on leftover or random data.
- Isolation of environments
- Predictable test coverage: It is possible to craft dataset fixtures that deliberately include edge cases
- Reduced flakiness
- Faster onboarding: New delepers can easely spin up the app with a dataset that behaves like a test environment.
- Safer production simulation: No leaking of sensitive data from production to the test environments.
- This also ensures a predictable state for new production deployments

#### Proposed solution

- A folder with excel files describing the dataset is added to the source code tree.
- The excel files are prefixed with a number sequence describing the order of import of the files
- On application startup, the excel files that are not previously imported, are imported in the system. This requires that:
  - The import of excel files is idempotent: if the import of a file is interrupted before it is marked as complete, for whatever reason, the import may be resumed from the start. If not idempotent, duplicate and / or inconsitent data may be created.
   [!WARNING]  
    > The existing import of excel files is idempotent, wit the exception of the creation of file nodes.
  - There are separate folders for dev and production imports

Example implementation:
```typescript
// src/server/bootstrap/excel-import-bootstrap.ts
import { fs, path, crypto, logger } from '@depts';
import SDKClient , { BER } from '@infrasoftbe/vnv-sdk';
import { Sessions } from '@infrasoftPackage/proxy-server-sessions-handler/index';
import FormData from 'form-data';

interface ImportedFileRecord {
  filePath: string;
  fileHash: string;
  importedAt: number;
  projectToken?: string;
}

class ExcelImportBootstrap {

  private readonly IMPORT_DIR = path.join(process.cwd(), 'bootstrap', 'excel-imports');
  private readonly IMPORT_LOG_FILE = path.join(process.cwd(), 'logs', 'import-history.json');
  private readonly IMPORTED_FILES: Map<string, ImportedFileRecord> = new Map();

  private readonly $vnvClient : SDKClient = SDKClient({ 
    userToken : null, //
    remotteAddress : null // 
  });

  constructor() {
    this.ensureDirectories();
    this.loadImportHistory();
  }

  private ensureDirectories() {
    if (!fs.existsSync(this.IMPORT_DIR)) {
      fs.mkdirSync(this.IMPORT_DIR, { recursive: true });
    }
    if (!fs.existsSync(path.dirname(this.IMPORT_LOG_FILE))) {
      fs.mkdirSync(path.dirname(this.IMPORT_LOG_FILE), { recursive: true });
    }
  }

  private loadImportHistory() {
    if (fs.existsSync(this.IMPORT_LOG_FILE)) {
      try {
        const history = JSON.parse(fs.readFileSync(this.IMPORT_LOG_FILE, 'utf8'));
        Object.entries(history).forEach(([hash, record]) => {
          this.IMPORTED_FILES.set(hash, record as ImportedFileRecord);
        });
        logger.info(`Loaded ${this.IMPORTED_FILES.size} imported files from history`);
      } catch (error) {
        logger.error('Failed to load import history:', error);
      }
    }
  }

  // Better to save in DB instead of file
  private saveImportHistory() {
    const history = Object.fromEntries(this.IMPORTED_FILES);
    fs.writeFileSync(this.IMPORT_LOG_FILE, JSON.stringify(history, null, 2));
  }

  private calculateFileHash(filePath: string): string {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  }

  private async importExcelFile(filePath: string): Promise<boolean> {
    try {
      const fileHash = this.calculateFileHash(filePath);
      
      // Check if already imported
      if (this.IMPORTED_FILES.has(fileHash)) {
        logger.info(`Skipping ${path.basename(filePath)} - already imported`);
        return false;
      }

      logger.info(`Importing ${path.basename(filePath)}...`);

      // Validate Excel file
      const fileBuffer = fs.readFileSync(filePath);
      const validation = await BER.isValidExcel(fileBuffer, true);
      
      if (!validation.success) {
        logger.error(`Invalid Excel file ${path.basename(filePath)}:`, validation.errors);
        return false;
      }

      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));

      const resultImport = await this.$vnvClient.EssAPI().importExcelProject(form);
      // OR IF ZIP await this.$vnvClient.EssAPI().importZIPProject(form);
      
      if (resultImport.operations.length > 0) {
        // Commit to database
        const commitResult = await this.$vnvClient.EssAPI().Project().Commit();
        
        // Record successful import
        this.IMPORTED_FILES.set(fileHash, {
          filePath,
          fileHash,
          importedAt: Date.now(),
          projectToken: projectInstance.self.token
        });
        
        this.saveImportHistory();
        
        logger.info(`Successfully imported ${path.basename(filePath)} - ${mergeResult.operations.length} operations`);
        return true;
      } else {
        logger.info(`No changes needed for ${path.basename(filePath)}`);
        return false;
      }

    } catch (error) {
      logger.error(`Failed to import ${path.basename(filePath)}:`, error);
      return false;
    }
  }

  private mergeProjects(this: Session, sourceProjectInstance: VPI.ProxyProjectInstance) {
    // Implementation similar to existing mergeProjects function
    // ... (use existing merge logic)
  }

  private async commitProject(session: Session, projectInstance: VPI.ProxyProjectInstance) {
    // Implementation similar to existing commit logic
    // ... (use existing commit logic)
  }

  public async runBootstrapImport(): Promise<void> {
    logger.info('Starting Excel import bootstrap...');

    if (!fs.existsSync(this.IMPORT_DIR)) {
      logger.info('No Excel import directory found, skipping bootstrap import');
      return;
    }

    const excelFiles = fs.readdirSync(this.IMPORT_DIR)
      .filter(file => file.endsWith('.xlsx') || file.endsWith('.xls'))
      .map(file => path.join(this.IMPORT_DIR, file));

    if (excelFiles.length === 0) {
      logger.info('No Excel files found for bootstrap import');
      return;
    }

    logger.info(`Found ${excelFiles.length} Excel files to process`);

    let importedCount = 0;
    let skippedCount = 0;

    for (const filePath of excelFiles) {
      const wasImported = await this.importExcelFile(filePath);
      if (wasImported) {
        importedCount++;
      } else {
        skippedCount++;
      }
    }

    logger.info(`Bootstrap import completed: ${importedCount} imported, ${skippedCount} skipped`);
  }
}

export { ExcelImportBootstrap };
```

## Frontend Versioning Challenges & Technical Constraints

### **Critical Infrastructure Constraint**

A major technical challenge emerges when extending version management to React applications: **ECS Task Definitions are immutable**. This creates a fundamental tension between versioning goals and infrastructure realities:

#### **The Real-Time Switching Problem**

```typescript
// Desired behavior: Dynamic version switching
const RELEASE = JSON.parse(fs.readFileSync('./release.json'));
return createProxyMiddleware({
  target: `http://studio-app-${RELEASE.version}.s3-website.eu-central-1.amazonaws.com`,
  changeOrigin: true
})(req, res, next);
```

**Problem**: Changing the proxy target requires **new ECS Task Definition** → **ECS Service restart** → **Not real-time switching**

#### **Infrastructure Implications**

**Option 1: Fixed Infrastructure (Current Approach)**
- ✅ **Predictable**: Known ECS configurations
- ✅ **Stable**: No dynamic infrastructure changes
- ❌ **Limited**: Cannot switch versions without redeployment
- ❌ **No Real-time Testing**: Cannot test multiple versions simultaneously

**Option 2: Dynamic Infrastructure Provisioning**
- ✅ **Flexible**: Can test any version instantly
- ✅ **Isolation**: Multiple versions running simultaneously
- ❌ **Complex**: Workflows must create ECS clusters/tasks dynamically
- ❌ **Cost**: Multiple environments running concurrently
- ❌ **Management**: Complex cleanup and resource management

**Option 3: Hybrid Approach - Path-Based Routing**
- ✅ **Same Infrastructure**: No ECS changes needed
- ✅ **Version Visibility**: Version in URL path
- ❌ **CloudFront Complexity**: Dynamic origin management
- ❌ **Frontend Routing**: Application must handle version prefixes

### **Questions for Further Discussion**

1. **Cost vs. Flexibility**: Is dynamic infrastructure provisioning worth the added complexity and cost?

2. **Use Case Priority**: How important is real-time version switching vs. traditional deployment with rollback?

3. **Testing Strategy**: Do we need multiple versions running simultaneously, or is sequential testing sufficient?

4. **Operational Complexity**: Can the team manage dynamic infrastructure creation/cleanup reliably?

5. **Azure AD Implications**: How do we handle authentication redirect URLs for dynamically created environments?

6. **🤔 Terraform Orchestration**: Should the Bootstrap Service execute Terraform directly, or delegate to existing CI/CD pipelines?

7. **🤔 State Management**: How to handle Terraform state files for temporary infrastructure? (S3 backend, cleanup strategies)

8. **🤔 Template Strategy**: Standardized Terraform modules vs. dynamic configuration generation?

9. **🤔 Security & Permissions**: What AWS/Azure permissions would the Bootstrap Service need to provision infrastructure?

10. **🤔 Failure Handling**: How to handle failed Terraform executions and partial infrastructure creation?

11. **🆕 Hybrid Architecture**: Should we implement local Docker orchestration via Dockerode alongside cloud deployments?

12. **🆕 EasyHost Migration**: What's the timeline and strategy for migrating DNS/SSL from EasyHost to AWS Route53+ACM?

13. **🆕 DNS Automation**: Should versioned DNS aliases be created automatically, or require manual approval?

14. **🆕 Cost Management**: How to control costs with potentially many versioned ALB/ECS combinations?

### **Potential Approaches to Explore**

#### **A. Enhanced Double Tagging with Orchestration**
- Keep current ECS approach for production
- Add Bootstrap Service for version coordination
- Use CloudFront path routing for testing environments

#### **B. Full Dynamic Infrastructure with Terraform Orchestration**
- Bootstrap Service executes Terraform scripts for infrastructure provisioning
- Template-based infrastructure generation (ECS clusters, S3 buckets, CloudFront, ALB)
- Automated Terraform state management and cleanup
- Temporary versioned environments with full infrastructure stack

#### **C. Hybrid Production/Testing Model**
- Fixed ECS for production (current approach)
- Dynamic Docker Compose for development/testing
- CloudFront for version-aware URLs in testing

#### **🆕 D. Full Hybrid Architecture with AWS DNS/SSL Management**
- **Local Development**: Bootstrap Service + Dockerode for local environments
- **Cloud Testing**: Dynamic ECS with versioned DNS aliases (`1.2.3.step-studio.be`)
- **SSL/HTTPS**: Complete migration from EasyHost to AWS Route53 + ACM
- **Azure AD Integration**: Redirect URLs automatically configured with HTTPS
- **Unified Management**: Single Bootstrap Service orchestrating local + cloud

### Bootstrap Service for Version Distribution

As the system grows more complex with multiple services, packages, and frontend applications all requiring version alignment, we propose a **dedicated Bootstrap Service**:

#### **Bootstrap Service Responsibilities (Hybrid Architecture)**

1. **Version Registry**: Central registry of all available versions across the organization
2. **Environment Setup**: Automated provisioning of new environments with consistent datasets
3. **Version Distribution**: API for services to discover compatible versions
4. **Health Monitoring**: Track which versions are running where
5. **🆕 Dynamic Infrastructure Management**: Orchestrate creation of ECS tasks and CloudFront distributions for new versions
6. **🤔 Infrastructure-as-Code Execution**: *Could* execute Terraform scripts to provision infrastructure on-demand
7. **🆕 Hybrid Local/Cloud Orchestration**: Manage Docker containers locally via Dockerode and cloud resources via AWS APIs
8. **🆕 SSL/DNS Management**: Automated domain alias creation and SSL certificate provisioning via AWS

#### **Bootstrap Service Architecture (Hybrid Local/Cloud with SSL Management)**

```
┌─────────────────┐    ┌───────────────────┐    ┌──────────────────┐
│ Local/ECS Srvcs │───▶│ Bootstrap Service │───▶│ Version Registry │
│  (Get Version)  │    │ (Hybrid Gateway)  │    │   (Database)     │
└─────────────────┘    └───────────────────┘    └──────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
       ┌─────────────┐  ┌───────────────┐  ┌──────────────┐
       │   Dataset   │  │   Hybrid      │  │   Cleanup    │
       │ Bootstrap   │  │ Orchestrator  │  │ Scheduler    │
       │(Excel Imp.) │  │               │  │(Auto-destroy)│
       └─────────────┘  └───────────────┘  └──────────────┘
                               │
               ┌───────────────┼───────────────┐
               ▼               ▼               ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
    │ Local Docker    │ │ AWS Cloud   │ │ DNS/SSL Manager │
    │ • Dockerode API │ │ • Terraform │ │ • Route53 Alias │
    │ • Compose Mgmt  │ │ • ECS Tasks │ │ • ACM SSL Certs │
    │ • Local Networks│ │ • S3 Buckets│ │ • EasyHost→AWS  │
    └─────────────────┘ └─────────────┘ └─────────────────┘
```

#### **Release Metadata Distribution & Dynamic Infrastructure**

**Option A: Fixed Infrastructure with Version Switching (Current Approach)**
```typescript
// Services query Bootstrap Service for current version
const response = await fetch('https://bootstrap.vnv.internal/api/v1/version/current');
const release = await response.json();

// ⚠️ PROBLEM: This still requires ECS task definition changes
return createProxyMiddleware({
  target: `http://studio-app-${release.version}.s3-website.eu-central-1.amazonaws.com`,
  changeOrigin: true
})(req, res, next);
```

**Option B: Dynamic Infrastructure Provisioning via Terraform (Advanced)**
```typescript
// Bootstrap Service executes Terraform to create infrastructure on-demand
const deployResult = await fetch('https://bootstrap.vnv.internal/api/v1/deploy/version/v1.2.3', {
  method: 'POST',
  body: JSON.stringify({
    environment: 'testing',
    services: ['proxy-server', 'event-bridge', 'react-app'],
    duration: '2h', // Auto-cleanup after 2 hours
    infrastructure: {
      terraform_template: 'ecs-versioned-stack',
      variables: {
        app_version: 'v1.2.3',
        cluster_prefix: 'temp',
        s3_bucket_prefix: 'studio-app-test'
      }
    }
  })
});

// Bootstrap Service internally:
// 1. Generates Terraform configuration from template
// 2. Executes: terraform plan && terraform apply
// 3. Registers new infrastructure in registry
// 4. Schedules cleanup job after duration
// Returns: { 
//   cluster: 'temp-v1-2-3', 
//   endpoint: 'https://v1-2-3.temp.vnv.com',
//   s3_bucket: 'studio-app-test-v1-2-3',
//   terraform_state: 'bootstrap-states/temp-v1-2-3.tfstate'
// }
```

**Option C: Hybrid - Path-Based Routing (Current Recommendation)**
```typescript
// Same ECS infrastructure, dynamic path routing via CloudFront
const response = await fetch('https://bootstrap.vnv.internal/api/v1/version/current');
const release = await response.json();

return createProxyMiddleware({
  target: 'https://vnv-cloudfront.amazonaws.com',
  pathRewrite: {
    '^/': `/versions/${release.version}/`
  },
  changeOrigin: true
})(req, res, next);
```

**🆕 Option D: Hybrid Bootstrap with AWS DNS/SSL Management (Advanced)**
```typescript
// Bootstrap Service creates versioned DNS aliases with SSL termination
const deployRequest = {
  version: 'v1.2.3',
  environment: 'testing', // or 'local'
  deployment_type: 'hybrid',
  ssl_config: {
    domain_pattern: '{version}.step-studio.be',
    certificate_source: 'aws_acm', // Migration from EasyHost
    auto_dns_alias: true
  }
};

// Bootstrap Service Response:
// {
//   local_containers: ['vnv-proxy:v1.2.3', 'vnv-app:v1.2.3'],
//   cloud_resources: {
//     ecs_cluster: 'vnv-v1-2-3',
//     s3_bucket: 'http://studio-app-v1.2.3.s3-website.eu-central-1.amazonaws.com',
//     dns_alias: '1.2.3.step-studio.be → ALB → ECS(v1.2.3) → S3(v1.2.3)',
//     ssl_certificate: 'arn:aws:acm:eu-central-1:xxx:certificate/xxx'
//   },
//   authentication: {
//     azure_ad_redirect: 'https://1.2.3.step-studio.be/auth/callback',
//     https_required: true // MSAL constraint satisfied
//   }
// }

// Local Development with HTTPS:
if (process.env.NODE_ENV === 'development') {
  // Bootstrap creates local Docker network with SSL proxy
  return createProxyMiddleware({
    target: 'https://localhost:8443', // Local SSL termination
    changeOrigin: true
  })(req, res, next);
} else {
  // Cloud deployment with versioned DNS
  return createProxyMiddleware({
    target: `https://${release.version.replace(/\./g, '-')}.step-studio.be`,
    changeOrigin: true
  })(req, res, next);
}
```

#### **Hybrid Local/Cloud Orchestration with Dockerode**

The Bootstrap Service can operate in a **hybrid mode between cloud and local** environments:

**Local Orchestration via Dockerode:**
```typescript
// Bootstrap Service - Local Docker Management
import Docker from 'dockerode';
import { DockerComposeManager } from './docker-compose-manager';

class HybridBootstrapService {
  private docker: Docker;
  private composeManager: DockerComposeManager;

  async createLocalEnvironment(version: string): Promise<LocalEnvironment> {
    // Ensure Docker is properly configured
    await this.validateDockerSetup();
    
    // Create versioned local stack
    const composeConfig = {
      version: '3.8',
      services: {
        [`vnv-proxy-${version}`]: {
          image: `ghcr.io/infrasoftbe/infrasoft-vnv-proxy-server:${version}`,
          ports: ['8080:8080'],
          environment: {
            RELEASE_VERSION: version,
            S3_BUCKET_URL: `http://studio-app-${version}.s3-website.eu-central-1.amazonaws.com`
          }
        },
        [`vnv-app-${version}`]: {
          image: `ghcr.io/infrasoftbe/infrasoft-vnv-app:${version}`,
          depends_on: [`vnv-proxy-${version}`]
        }
      }
    };
    
    return this.composeManager.deployStack(version, composeConfig);
  }

  private async validateDockerSetup(): Promise<void> {
    // Verify Docker daemon is running and properly configured
    const info = await this.docker.info();
    if (!info.ServerVersion) {
      throw new Error('Docker daemon not properly configured');
    }
  }
}
```

#### **SSL/HTTPS Challenge & AWS Migration Strategy**

**Current Issues with EasyHost:**
- ❌ **Limited Control**: Manual DNS alias configuration
- ❌ **No Integration**: No API for automation in workflows
- ❌ **MSAL/Azure AD**: Microsoft popup requires HTTPS (non-negotiable constraint)
- ❌ **Insufficient Mock Crypto**: Popup opens in uncontrolled window

**📦 AWS Migration Strategy:**

```hcl
# Terraform - DNS Alias with automatic SSL
resource "aws_route53_zone" "step_studio" {
  name = "step-studio.be"
}

# Wildcard SSL certificate for versioned subdomains
resource "aws_acm_certificate" "versioned_ssl" {
  domain_name       = "*.step-studio.be"
  subject_alternative_names = ["step-studio.be"]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Dynamic DNS alias for each version
resource "aws_route53_record" "version_alias" {
  for_each = var.active_versions # ["1.2.3", "1.2.4-rc.1", etc.]
  
  zone_id = aws_route53_zone.step_studio.zone_id
  name    = "${replace(each.value, ".", "-")}.step-studio.be"
  type    = "A"

  alias {
    name                   = aws_lb.versioned_alb[each.key].dns_name
    zone_id               = aws_lb.versioned_alb[each.key].zone_id
    evaluate_target_health = true
  }
}

# ALB for routing to versioned ECS
resource "aws_lb" "versioned_alb" {
  for_each = var.active_versions
  
  name               = "vnv-alb-${replace(each.value, ".", "-")}"
  internal           = false
  load_balancer_type = "application"
  subnets           = var.public_subnet_ids
  
  # SSL termination with AWS ACM certificate
  listener {
    port     = "443"
    protocol = "HTTPS"
    ssl_policy      = "ELBSecurityPolicy-TLS-1-2-2017-01"
    certificate_arn = aws_acm_certificate.versioned_ssl.arn
    
    default_action {
      type             = "forward"
      target_group_arn = aws_lb_target_group.ecs_versioned[each.key].arn
    }
  }
}
```

**Complete Flow Architecture:**
```
🌍 Client HTTPS Request
     ↓
📍 1.2.3.step-studio.be (Route53 Alias)
     ↓
🔒 ALB + SSL Termination (ACM Certificate)
     ↓
🐳 ECS Fargate Cluster (Images v1.2.3)
     ↓
📦 S3 Static Website (studio-app-v1.2.3)
     ↓
🔐 Azure AD Redirect (HTTPS ✅)
```

#### **Snapshot Management**

The Bootstrap Service would manage **snapshot lifecycle**:

- **Create Snapshots**: `v1.2.3.snap.20241001` with timestamp
- **Promote Snapshots**: Convert successful snaps to release candidates
- **Cleanup Old Snapshots**: Automatic deletion of outdated snaps
- **Cross-Service Compatibility**: Ensure all services can work with snapshots
- **🆕 DNS Cleanup**: Automatic Route53 alias removal for expired snapshots

#### **Benefits of Bootstrap Service**

1. **Centralized Control**: Single source of truth for versions
2. **Automated Setup**: New environments with consistent data
3. **Version Alignment**: Guarantee all components use compatible versions
4. **Operational Simplicity**: Simplified rollback and deployment procedures
5. **Audit Trail**: Complete history of version deployments across environments
6. **🤔 Dynamic Infrastructure Management**: *Could* orchestrate ECS task creation (if this approach is chosen)

## **Summary & Next Steps**

This document presents multiple approaches for extending version management to the full stack (ECS + React applications). The key decision points are:

### **Technical Trade-offs**
- **Current Approach**: Stable but limited real-time version switching
- **Dynamic Infrastructure**: Flexible but complex operational overhead
- **Hybrid Solutions**: Balanced but may introduce new complexities

### **Business Considerations**
- **Team Capacity**: Can we manage dynamic infrastructure reliably?
- **Cost Impact**: Multiple environments vs. operational efficiency
- **Use Case Requirements**: How critical is real-time version switching?

### **Recommended Discussion Points**
1. Define primary use cases for version switching (testing, demos, rollback scenarios)
2. Assess team readiness for dynamic infrastructure management
3. Evaluate cost implications of different approaches
4. Consider phased implementation (start with CloudFront path routing)
5. Prototype Bootstrap Service for version coordination
6. **🤔 Terraform Integration Strategy**: Direct execution vs. pipeline delegation
7. **🤔 Infrastructure Templates**: Standardization and maintenance approach
8. **🤔 State Management**: S3 backend strategy for temporary infrastructure
9. **🤔 Security Model**: IAM roles and permissions for infrastructure provisioning
10. **🤔 Cost Control**: Automatic cleanup, resource tagging, and budget monitoring

*This document serves as a foundation for architectural discussions and does not prescribe a definitive solution.*

# Future improvements

## Monorepo

- Put all services in one repo (monorepo approach): 
  - Only one git tree needs to be maintained:
    - One commit/PR can change multiple services and their shared libraries together.
    - Tagging version of releases is more straightforward
  - Better control of compatibility between the different services:
    - Dependencies between projects are explicitly tracked
    - Easier to spot unintended couploing between services
- More elaborate automated testing:
  - Builds with failed tests cannot be deployed

## Git

- Using short lived branches, that are rebased on the main branch before merging to keep a clean history.
- Using one main branch instead of separate release branches may cause problems to create and deploy a hotfix while working on new features. This can be avoided by only merging code that can be shipped to production, if when not finished. Unfinished features can be hidden behind feature toggles.

## Authentication
- Create an abstraction between MSAL and the services to have different authentication implementations. This way, a mock of other implementation can be used in the dev environment or for local development.
  
````
