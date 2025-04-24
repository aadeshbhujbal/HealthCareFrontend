#!/bin/bash

# Rollback script for Healthcare Frontend Web

set -e

APP_DIR="/var/www/healthcare/frontend"
DEPLOYMENTS_DIR="$APP_DIR/deployments"
CURRENT_FILE="$APP_DIR/current_deployment"

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check service health
check_service_health() {
    if sudo systemctl is-active --quiet healthcare-frontend; then
        log "Frontend service is running"
        return 0
    fi
    return 1
}

# Function to check application health
check_app_health() {
    if curl -s http://localhost:3000 | grep -q "html"; then
        log "Frontend application is accessible"
        return 0
    fi
    return 1
}

# Function to get current deployment
get_current_deployment() {
    if [ -f "$CURRENT_FILE" ]; then
        cat "$CURRENT_FILE"
    else
        log "No current deployment file found"
        exit 1
    fi
}

# Function to get previous deployment
get_previous_deployment() {
    current=$1
    ls -1 "$DEPLOYMENTS_DIR" | grep -v "$current" | tail -n 1
}

# Function to perform rollback
do_rollback() {
    current=$(get_current_deployment)
    previous=$(get_previous_deployment "$current")

    if [ -z "$previous" ]; then
        log "No previous deployment found to rollback to"
        exit 1
    fi

    log "Rolling back from $current to $previous"

    # Stop current service
    log "Stopping current service..."
    sudo systemctl stop healthcare-frontend || true

    # Switch to previous deployment
    log "Switching to previous deployment..."
    ln -sfn "$DEPLOYMENTS_DIR/$previous" "$APP_DIR/current"
    echo "$previous" > "$CURRENT_FILE"

    # Start previous deployment
    log "Starting previous deployment..."
    sudo systemctl start healthcare-frontend

    # Check if the service is running
    log "Checking service health..."
    max_retries=30
    counter=0
    while [ $counter -lt $max_retries ]; do
        if check_service_health; then
            break
        fi
        log "Waiting for service to be healthy (attempt $counter of $max_retries)"
        counter=$((counter + 1))
        sleep 2
        
        if [ $counter -eq $max_retries ]; then
            log "Service health check failed"
            return 1
        fi
    done

    # Check if the application is accessible
    log "Checking application health..."
    max_retries=30
    counter=0
    while [ $counter -lt $max_retries ]; do
        if check_app_health; then
            return 0
        fi
        log "Waiting for application to be accessible (attempt $counter of $max_retries)"
        counter=$((counter + 1))
        sleep 2
    done

    log "Application health check failed"
    return 1
}

# Function to cleanup old deployments
cleanup_old_deployments() {
    # Keep last 5 deployments
    cd "$DEPLOYMENTS_DIR"
    ls -1t | tail -n +6 | xargs -r rm -rf
    log "Cleaned up old deployments"
}

# Main execution
log "Starting rollback process..."

if do_rollback; then
    cleanup_old_deployments
    log "Rollback completed successfully"
    exit 0
else
    log "Rollback failed"
    exit 1
fi 