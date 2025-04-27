#!/bin/bash

# Exit on error
set -e

# Configuration
DEPLOY_PATH="/var/www/healthcare/frontend"
CURRENT_TIME=$(date +%Y%m%d_%H%M%S)
DEPLOY_DIR="$DEPLOY_PATH/deployments/$CURRENT_TIME"
CURRENT_LINK="$DEPLOY_PATH/current"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting frontend deployment...${NC}"

# Create production env file
echo -e "${YELLOW}Creating production environment file...${NC}"
cat > apps/web/.env.production << EOL
NEXT_PUBLIC_API_URL=https://api.ishswami.in
NEXT_PUBLIC_DOMAIN=ishswami.in
NODE_ENV=production
EOL

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
yarn install --frozen-lockfile
yarn add -D nx@latest @nrwl/cli@latest

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npx nx build web
npx nx export web || yarn next export

# Create deployment directory
echo -e "${YELLOW}Creating deployment directory...${NC}"
mkdir -p deployment

# Copy build files based on available output
if [ -d "dist/apps/web/exported" ]; then
    echo -e "${YELLOW}Copying files from dist/apps/web/exported...${NC}"
    cp -r dist/apps/web/exported/* deployment/
elif [ -d "apps/web/out" ]; then
    echo -e "${YELLOW}Copying files from apps/web/out...${NC}"
    cp -r apps/web/out/* deployment/
else
    echo -e "${RED}Could not find build output directory${NC}"
    exit 1
fi

# Create deployment directory on server
echo -e "${YELLOW}Setting up server deployment...${NC}"
sudo mkdir -p "$DEPLOY_DIR"

# Copy deployment files to server
echo -e "${YELLOW}Copying files to server...${NC}"
sudo cp -r deployment/* "$DEPLOY_DIR/"

# Update current deployment record
echo "$CURRENT_TIME" > "$DEPLOY_PATH/current_deployment"

# Update symlink
echo -e "${YELLOW}Updating symlink...${NC}"
sudo ln -sfn "$DEPLOY_DIR" "$CURRENT_LINK"

# Set proper permissions
echo -e "${YELLOW}Setting permissions...${NC}"
sudo chmod -R 755 "$DEPLOY_DIR"

# Clean old deployments (keep last 5)
echo -e "${YELLOW}Cleaning old deployments...${NC}"
cd "$DEPLOY_PATH/deployments" && ls -t | tail -n +6 | xargs -I {} sudo rm -rf {}

# Verify deployment
if [ -f "$CURRENT_LINK/index.html" ]; then
    echo -e "${GREEN}Deployment verified successfully - index.html found!${NC}"
else
    echo -e "${RED}Deployment verification failed - index.html not found!${NC}"
    
    # Get previous deployment for potential rollback
    current=$(cat "$DEPLOY_PATH/current_deployment")
    previous=$(ls -1 "$DEPLOY_PATH/deployments" | grep -v "$current" | tail -n 1)
    
    if [ ! -z "$previous" ]; then
        echo -e "${YELLOW}Rolling back to previous deployment: $previous${NC}"
        sudo ln -sfn "$DEPLOY_PATH/deployments/$previous" "$CURRENT_LINK"
        echo "$previous" > "$DEPLOY_PATH/current_deployment"
        
        if [ -f "$CURRENT_LINK/index.html" ]; then
            echo -e "${GREEN}Rollback successful${NC}"
            exit 1
        else
            echo -e "${RED}Rollback failed - index.html not found${NC}"
            exit 2
        fi
    else
        echo -e "${RED}No previous deployment found for rollback${NC}"
        exit 3
    fi
fi

echo -e "${GREEN}Deployment completed successfully!${NC}" 