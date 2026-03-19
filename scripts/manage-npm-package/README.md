# npm Package Management Script

Local publishing script for `@shipogre/ogre-brand-kit` to GitHub Packages.

## Script

### publish-github.zsh

Publishes the package to GitHub Packages for distribution.

**Actions (one required):**
| Parameter | Description |
|-----------|-------------|
| `--version <version>` | Publish with specified semver version |
| `--alpha` | Publish alpha version (auto-generated, e.g., `1.0.0-alpha.20260203143022`) |
| `--list-versions` | List existing versions on GitHub Packages |

**What it does (when publishing):**
1. Validates semver format
2. Sets version in `package.json` (temporary, reverted after publish)
3. Installs dependencies (`npm ci`)
4. Builds the package (`npm run build`)
5. Publishes to GitHub Packages (`npm publish`)
6. Reverts `package.json` version changes

## Usage

```bash
# List existing versions on GitHub Packages
./scripts/manage-npm-package/publish-github.zsh --list-versions

# Publish a specific version
./scripts/manage-npm-package/publish-github.zsh --version 1.0.0

# Quick alpha publish for sharing with team
./scripts/manage-npm-package/publish-github.zsh --alpha
```

## Prerequisites

- **Node.js and npm**: Required for building and publishing
- **GITHUB_PACKAGES_TOKEN**: Personal access token with `read:packages` and `write:packages` scopes
  ```bash
  # Add to ~/.zshrc
  export GITHUB_PACKAGES_TOKEN=ghp_xxxxxxxxxxxx
  ```
- **jq**: Required for `--list-versions` and `--alpha` (`brew install jq`)

## CI/CD Publishing

The GitHub Actions workflow `publish-npm-package.yml` handles automated publishing:
- **Tag-based**: Push a tag matching `ogre-brand-kit-v*` (e.g., `ogre-brand-kit-v1.0.0`)
- **Manual dispatch**: Trigger from the Actions tab with version and release notes inputs

The CI workflow uses `GITHUB_TOKEN` for authentication (no PAT needed).
