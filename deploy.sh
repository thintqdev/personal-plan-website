#!/bin/bash

# ThinPlan Frontend Deployment Script
# This script automates the deployment process for the frontend application

set -e  # Exit on any error

echo "🚀 Starting ThinPlan Frontend Deployment..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if required commands exist
check_dependencies() {
    print_status "Checking dependencies..."

    if ! command_exists node; then
        print_error "Node.js is not installed or not in PATH"
        exit 1
    fi

    if ! command_exists npm; then
        print_error "npm is not installed or not in PATH"
        exit 1
    fi

    if ! command_exists pm2; then
        print_error "PM2 is not installed or not in PATH"
        exit 1
    fi

    print_success "All dependencies are available"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies with --force flag..."
    if npm install --force; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Function to build the application
build_application() {
    print_status "Building the application..."
    if npm run build; then
        print_success "Application built successfully"
    else
        print_error "Failed to build application"
        exit 1
    fi
}

# Function to restart PM2 process
restart_pm2() {
    local pm2_id=$1
    print_status "Restarting PM2 process (ID: $pm2_id)..."

    if pm2 restart "$pm2_id"; then
        print_success "PM2 process restarted successfully"

        # Wait a moment and check status
        sleep 2
        if pm2 status | grep -q "$pm2_id.*online"; then
            print_success "Application is now running and online"
        else
            print_warning "Process restarted but status check inconclusive"
        fi
    else
        print_error "Failed to restart PM2 process"
        exit 1
    fi
}

# Function to show deployment summary
show_summary() {
    echo ""
    echo "=========================================="
    print_success "Deployment completed successfully!"
    echo ""
    echo "📊 Deployment Summary:"
    echo "   ✅ Dependencies installed"
    echo "   ✅ Application built"
    echo "   ✅ PM2 process restarted"
    echo ""
    echo "🌐 Your application should now be running"
    echo "=========================================="
}

# Main deployment function
main() {
    local pm2_id=${1:-14}  # Default PM2 ID is 14, can be overridden

    echo "Target PM2 Process ID: $pm2_id"
    echo ""

    # Check dependencies
    check_dependencies

    # Install dependencies
    install_dependencies

    # Build application
    build_application

    # Restart PM2 process
    restart_pm2 "$pm2_id"

    # Show summary
    show_summary
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [PM2_PROCESS_ID]"
    echo ""
    echo "Arguments:"
    echo "  PM2_PROCESS_ID    The PM2 process ID to restart (default: 14)"
    echo ""
    echo "Examples:"
    echo "  $0              # Restart PM2 process 14"
    echo "  $0 15           # Restart PM2 process 15"
    echo ""
    echo "The script will:"
    echo "  1. Check for required dependencies (node, npm, pm2)"
    echo "  2. Run 'npm install --force'"
    echo "  3. Run 'npm run build'"
    echo "  4. Restart the specified PM2 process"
    echo "  5. Show deployment summary"
}

# Handle command line arguments
case "${1:-}" in
    -h|--help)
        show_usage
        exit 0
        ;;
    *)
        # Check if argument is a number
        if [[ "${1:-}" =~ ^[0-9]+$ ]] || [[ -z "${1:-}" ]]; then
            main "${1:-14}"
        else
            print_error "Invalid argument: $1"
            echo ""
            show_usage
            exit 1
        fi
        ;;
esac