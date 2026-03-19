# OGRE Brand Kit

A comprehensive design system for OGRE applications, built with Tailwind CSS and React.

## Installation

This package is published to GitHub Packages as `@shipogre/ogre-brand-kit`.

### 1. Configure npm for GitHub Packages

Create or update `.npmrc` in your project root:

```
@shipogre:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

### 2. Set up authentication

1. Create a GitHub Personal Access Token (classic):
   - Navigate to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
   - Click **"Generate new token (classic)"**
   - Select scopes: `read:packages` (for installing) or `read:packages` + `write:packages` (for publishing)
   - Copy the token immediately — it won't be shown again

2. Create an environment variable named `GITHUB_PACKAGES_TOKEN` that stores your personal access token:

```bash
# Add to ~/.zshrc
export GITHUB_PACKAGES_TOKEN="ghp_xxxxxxxxxxxx"
```

*You will need to restart your CLI session or IDE after editing your `~/.zshrc` file.*

### 3. Install

```bash
npm install @shipogre/ogre-brand-kit
```

## Features

- **Design Tokens**: Colors, shadows, border radii, spacing, and typography
- **Tailwind Preset**: Pre-configured theme extending Tailwind with OGRE tokens
- **Component Plugin**: Ready-to-use CSS component classes (buttons, forms, cards, etc.)
- **React Components**: Typed React components with built-in styling

## Usage

### 1. Import Styles (Tailwind CSS 4)

In your main CSS file:

```css
@import "tailwindcss";
@source "@shipogre/ogre-brand-kit";
@import "@shipogre/ogre-brand-kit/styles/theme.css";
@import "@shipogre/ogre-brand-kit/styles/base.css" layer(base);
@import "@shipogre/ogre-brand-kit/styles/components.css" layer(components);
```

### 2. Using Design Tokens

```typescript
import { colors, shadows, radius } from '@shipogre/ogre-brand-kit/tokens';

const primaryColor = colors.primary.DEFAULT; // '#6C3333'
const hoverShadow = shadows.md;
```

### 3. Using React Components

```tsx
import { Button, Card, Input, Badge, Spinner } from '@shipogre/ogre-brand-kit/components';

function MyComponent() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter your email" />
      <Button variant="primary" size="lg">
        Submit
      </Button>
      <Badge status="active">Active</Badge>
    </Card>
  );
}
```

### 4. Using CSS Classes

The component plugin adds these utility classes:

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-primary btn-small">Small</button>
<button class="btn btn-primary btn-large">Large</button>

<!-- Form Elements -->
<label class="form-label">Label</label>
<input class="form-input" placeholder="Input" />
<select class="form-select">...</select>

<!-- Cards & Tiles -->
<div class="card">Card content</div>
<div class="tile">Tile content</div>
<div class="stat-tile">
  <div class="stat-value">$1,234</div>
  <div class="stat-label">Revenue</div>
</div>

<!-- Status Badges -->
<span class="status-badge status-active">Active</span>
<span class="status-badge status-pending">Pending</span>
<span class="status-badge status-progress">In Progress</span>

<!-- Progress Bar -->
<div class="progress-bar">
  <div class="progress-fill" style="width: 75%"></div>
</div>
```

## Design Tokens

### Colors

| Token | Light Mode | Description |
|-------|------------|-------------|
| `primary` | `#6C3333` | Primary brand color (maroon) |
| `primary.hover` | `#5a2a2a` | Primary hover state |
| `secondary` | `#000000` | Secondary color (black) |
| `text.primary` | `#1a1a1a` | Primary text |
| `text.secondary` | `#666666` | Secondary text |
| `text.muted` | `#999999` | Muted text |
| `bg.primary` | `#ffffff` | Primary background |
| `bg.secondary` | `#f9fafb` | Secondary background |
| `success` | `#10b981` | Success state |
| `warning` | `#f59e0b` | Warning state |
| `error` | `#ef4444` | Error state |
| `info` | `#3b82f6` | Info state |

### Shadows

| Token | Value |
|-------|-------|
| `sm` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` |
| `md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` |
| `lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` |

### Border Radius

| Token | Value |
|-------|-------|
| `sm` | `4px` |
| `md` | `6px` |
| `lg` | `8px` |

## Components

### Button

```tsx
import { Button } from '@shipogre/ogre-brand-kit/components';

<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>
```

Props:
- `variant`: `'primary' | 'secondary' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `isLoading`: `boolean`

### Card

```tsx
import { Card, CardHeader, CardTitle, CardFooter } from '@shipogre/ogre-brand-kit/components';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  Content here
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input

```tsx
import { Input } from '@shipogre/ogre-brand-kit/components';

<Input
  label="Email"
  placeholder="Enter email"
  error="Invalid email"
  helperText="We'll never share your email"
/>
```

### Select

```tsx
import { Select } from '@shipogre/ogre-brand-kit/components';

<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  isLoading={false}
/>
```

### Badge

```tsx
import { Badge } from '@shipogre/ogre-brand-kit/components';

<Badge status="active">Active</Badge>
<Badge status="pending">Pending</Badge>
<Badge status="progress">In Progress</Badge>
<Badge status="review">Review</Badge>
<Badge status="completed">Completed</Badge>
```

### Spinner

```tsx
import { Spinner } from '@shipogre/ogre-brand-kit/components';

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### ProgressBar

```tsx
import { ProgressBar } from '@shipogre/ogre-brand-kit/components';

<ProgressBar value={75} max={100} showLabel />
```

## Publishing

### Automated (CI)

Push a tag matching `ogre-brand-kit-v*` to trigger the GitHub Actions publish workflow:

```bash
git tag ogre-brand-kit-v1.0.0
git push origin ogre-brand-kit-v1.0.0
```

Or trigger manually from the Actions tab with version and release notes inputs.

### Local Publishing

```bash
# List existing versions
./scripts/manage-npm-package/publish-github.zsh --list-versions

# Publish a specific version
./scripts/manage-npm-package/publish-github.zsh --version 1.0.0

# Quick alpha publish
./scripts/manage-npm-package/publish-github.zsh --alpha
```

Requires `GITHUB_PACKAGES_TOKEN` with `write:packages` scope.

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode
npm run dev
```

## License

MIT
