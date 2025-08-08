#!/bin/bash

# New Tab Page Deployment Script
# This script automates the deployment process

set -e

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

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    if npm test; then
        print_success "All tests passed"
    else
        print_error "Tests failed"
        exit 1
    fi
}

# Build the application
build_app() {
    print_status "Building application..."
    npm run build
    print_success "Application built successfully"
}

# Deploy to different platforms
deploy() {
    local platform=$1
    
    case $platform in
        "vercel")
            print_status "Deploying to Vercel..."
            if command -v vercel &> /dev/null; then
                vercel --prod
                print_success "Deployed to Vercel"
            else
                print_error "Vercel CLI is not installed"
                exit 1
            fi
            ;;
        "netlify")
            print_status "Deploying to Netlify..."
            if command -v netlify &> /dev/null; then
                netlify deploy --prod --dir=dist
                print_success "Deployed to Netlify"
            else
                print_error "Netlify CLI is not installed"
                exit 1
            fi
            ;;
        "github")
            print_status "Deploying to GitHub Pages..."
            git add .
            git commit -m "Deploy to GitHub Pages"
            git push origin main
            print_success "Deployed to GitHub Pages"
            ;;
        "docker")
            print_status "Building Docker image..."
            docker build -t new-tab-page .
            print_success "Docker image built"
            
            print_status "Running Docker container..."
            docker run -d -p 3000:80 --name new-tab-page new-tab-page
            print_success "Docker container running on port 3000"
            ;;
        *)
            print_error "Unknown platform: $platform"
            print_status "Available platforms: vercel, netlify, github, docker"
            exit 1
            ;;
    esac
}

# Main deployment process
main() {
    local platform=${1:-"local"}
    
    print_status "Starting deployment process..."
    
    check_dependencies
    install_dependencies
    
    if [ "$platform" != "local" ]; then
        run_tests
    fi
    
    build_app
    
    if [ "$platform" != "local" ]; then
        deploy $platform
    else
        print_success "Local build completed. Run 'npm run dev' to start development server"
    fi
}

# Show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -p, --platform PLATFORM  Deploy to specific platform"
    echo "  -h, --help               Show this help message"
    echo ""
    echo "Available platforms:"
    echo "  local     Build locally (default)"
    echo "  vercel    Deploy to Vercel"
    echo "  netlify   Deploy to Netlify"
    echo "  github    Deploy to GitHub Pages"
    echo "  docker    Build and run Docker container"
    echo ""
    echo "Examples:"
    echo "  $0                    # Build locally"
    echo "  $0 -p vercel         # Deploy to Vercel"
    echo "  $0 --platform docker # Deploy with Docker"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Run main function
main $PLATFORM 