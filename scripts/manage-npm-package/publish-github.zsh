#!/bin/zsh

# ogre-brand-kit npm Package GitHub Packages Publisher
# Publishes the package to GitHub Packages for distribution

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

REPO_ROOT="$(git rev-parse --show-toplevel)"
PACKAGE_NAME="@shipogre/ogre-brand-kit"
SCRIPT_NAME="${0:t}"

# Function to display usage
show_help() {
    echo "ogre-brand-kit npm Package GitHub Packages Publisher"
    echo "===================================================="
    echo ""
    echo "${YELLOW}Usage:${NC}"
    echo "  $SCRIPT_NAME --version <version>"
    echo "  $SCRIPT_NAME --alpha"
    echo "  $SCRIPT_NAME --list-versions"
    echo "  $SCRIPT_NAME -h|--help"
    echo ""
    echo "${YELLOW}Actions (one required):${NC}"
    echo "  --version <version>            Publish with specified version"
    echo "  --alpha                        Publish alpha version (auto-generated)"
    echo "  --list-versions                List existing versions on GitHub Packages"
    echo ""
    echo "${YELLOW}Alpha versioning:${NC}"
    echo "  --alpha generates a version like: 1.0.0-alpha.20260203143022"
    echo "  Based on latest non-alpha version with timestamp suffix"
    echo ""
    echo "${YELLOW}Environment Variables:${NC}"
    echo "  GITHUB_PACKAGES_TOKEN     Required (PAT with read:packages and write:packages scopes)"
    echo ""
    echo "${YELLOW}Prerequisites:${NC}"
    echo "  - Node.js and npm installed"
    echo "  - jq installed (brew install jq) - for --list-versions and --alpha"
}

# Function to validate semver format
validate_semver() {
    local version="$1"
    if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.-]+)?$ ]]; then
        echo "${RED}Invalid version format: $version${NC}"
        echo "Version must follow semver format: X.Y.Z or X.Y.Z-prerelease"
        echo "Examples: 1.0.0, 1.0.1-beta, 2.0.0-rc.1"
        exit 1
    fi
}

# Function to check GITHUB_PACKAGES_TOKEN
require_token() {
    if [[ -z "$GITHUB_PACKAGES_TOKEN" ]]; then
        echo "${RED}GITHUB_PACKAGES_TOKEN environment variable is not set${NC}"
        echo ""
        echo "Set it with your GitHub Personal Access Token:"
        echo "  ${BLUE}export GITHUB_PACKAGES_TOKEN=ghp_xxxxxxxxxxxx${NC}"
        echo ""
        echo "Your token needs the ${YELLOW}read:packages${NC} and ${YELLOW}write:packages${NC} scopes."
        exit 1
    fi
}

# Function to require jq
require_jq() {
    if ! command -v jq &> /dev/null; then
        echo "${RED}jq is not installed${NC}"
        echo "Install with: ${BLUE}brew install jq${NC}"
        exit 1
    fi
}

# Function to get latest non-alpha version from npm registry
get_latest_base_version() {
    require_token
    require_jq

    local api_url="https://npm.pkg.github.com/@shipogre%2fogre-brand-kit"

    local api_response
    local http_code
    api_response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $GITHUB_PACKAGES_TOKEN" "$api_url") || true
    http_code=$(echo "$api_response" | tail -n1)
    api_response=$(echo "$api_response" | sed '$d')

    if [[ "$http_code" == "404" ]]; then
        echo "1.0.0"
        return
    elif [[ "$http_code" != "200" ]]; then
        echo "${RED}Failed to fetch versions (HTTP $http_code)${NC}" >&2
        exit 1
    fi

    local latest_version
    latest_version=$(echo "$api_response" | jq -r '.versions | keys[]' 2>/dev/null | grep -v '\-alpha\.' | sort -V | tail -1)

    if [[ -z "$latest_version" ]]; then
        echo "1.0.0"
    else
        echo "$latest_version"
    fi
}

# Function to generate alpha version
generate_alpha_version() {
    echo "${YELLOW}Determining base version...${NC}"
    local base_version
    base_version=$(get_latest_base_version)

    local timestamp=$(date +%Y%m%d%H%M%S)

    local alpha_version="${base_version}-alpha.${timestamp}"
    echo "${GREEN}   Base version: $base_version${NC}"
    echo "${GREEN}   Alpha version: $alpha_version${NC}"
    echo ""

    echo "$alpha_version"
}

# Function to list existing versions
list_versions() {
    echo "Listing existing versions of $PACKAGE_NAME on GitHub Packages..."
    echo ""

    require_token
    require_jq

    echo "${YELLOW}Fetching versions from npm registry...${NC}"
    echo ""

    local api_url="https://npm.pkg.github.com/@shipogre%2fogre-brand-kit"

    local api_response
    local http_code
    api_response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $GITHUB_PACKAGES_TOKEN" "$api_url") || true
    http_code=$(echo "$api_response" | tail -n1)
    api_response=$(echo "$api_response" | sed '$d')

    if [[ "$http_code" == "401" ]] || [[ "$http_code" == "403" ]]; then
        echo "${RED}Authentication failed${NC}"
        echo ""
        echo "Ensure your GITHUB_PACKAGES_TOKEN has ${YELLOW}read:packages${NC} scope."
        exit 1
    elif [[ "$http_code" == "404" ]]; then
        echo "${YELLOW}Package does not exist yet (no versions published)${NC}"
        exit 0
    elif [[ "$http_code" != "200" ]]; then
        echo "${RED}Failed to list versions (HTTP $http_code)${NC}"
        echo "$api_response"
        exit 1
    fi

    local versions
    versions=$(echo "$api_response" | jq -r '.versions | keys[]' 2>/dev/null | sort -V)

    if [[ -z "$versions" ]]; then
        echo "${YELLOW}No versions found${NC}"
    else
        echo "${GREEN}Available versions:${NC}"
        echo "$versions"
    fi
}

# Function to publish package
publish_package() {
    local version="$1"

    echo "ogre-brand-kit npm Package GitHub Packages Publisher"
    echo "===================================================="

    validate_semver "$version"
    require_token

    echo "${BLUE}Version: $version${NC}"
    echo "${BLUE}Package: $PACKAGE_NAME${NC}"
    echo ""

    cd "$REPO_ROOT"

    echo "${YELLOW}Setting version to $version...${NC}"
    npm version "$version" --no-git-tag-version --allow-same-version

    echo ""
    echo "${YELLOW}Installing dependencies...${NC}"
    npm ci

    echo ""
    echo "${YELLOW}Building package...${NC}"
    npm run build

    echo ""
    echo "${YELLOW}Publishing to GitHub Packages...${NC}"

    local publish_output
    local publish_exit_code
    publish_exit_code=0
    publish_output=$(npm publish 2>&1) || publish_exit_code=$?

    echo "$publish_output"
    echo ""

    if [[ "$publish_output" == *"already exists"* ]] || [[ "$publish_output" == *"cannot publish over"* ]]; then
        echo "${YELLOW}Version $version already exists on GitHub Packages${NC}"
        echo ""
        echo "Use a different version number to publish a new package."
        # Reset version in package.json
        git checkout -- package.json package-lock.json 2>/dev/null || true
        exit 1
    elif [[ $publish_exit_code -ne 0 ]]; then
        echo "${RED}Failed to publish package${NC}"
        # Reset version in package.json
        git checkout -- package.json package-lock.json 2>/dev/null || true
        exit 1
    fi

    echo "${GREEN}Package published successfully!${NC}"
    echo ""
    echo "${BLUE}Package: $PACKAGE_NAME${NC}"
    echo "${BLUE}Version: $version${NC}"
    echo "${BLUE}Source: GitHub Packages (shipogre)${NC}"

    # Reset version in package.json
    git checkout -- package.json package-lock.json 2>/dev/null || true
}

# Parse arguments
ACTION=""
VERSION=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        --version)
            if [[ -z "$2" || "$2" == --* ]]; then
                echo "${RED}--version requires a version argument${NC}"
                exit 1
            fi
            ACTION="version"
            VERSION="$2"
            shift 2
            ;;
        --alpha)
            ACTION="alpha"
            shift
            ;;
        --list-versions)
            ACTION="list-versions"
            shift
            ;;
        *)
            echo "${RED}Unknown option: $1${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
done

if [[ -z "$ACTION" ]]; then
    show_help
    exit 0
fi

# Execute action
case "$ACTION" in
    list-versions)
        list_versions
        ;;
    alpha)
        alpha_version_output=$(generate_alpha_version 2>&1)
        alpha_version=$(echo "$alpha_version_output" | tail -1)
        echo "$alpha_version_output" | head -n -1
        publish_package "$alpha_version"
        ;;
    version)
        publish_package "$VERSION"
        ;;
esac
