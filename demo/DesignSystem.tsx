import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  Input,
  Select,
  Badge,
  Spinner,
  ProgressBar,
} from '../src/components';

function CopyableClass({ className }: { className: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(className);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-2 py-1 text-xs font-mono text-text-secondary bg-bg-secondary hover:bg-bg-hover border border-border rounded cursor-pointer transition-colors"
      title="Click to copy"
    >
      {copied ? '✓ Copied!' : className}
    </button>
  );
}

function ClassReference({ classes }: { classes: string[] }) {
  return (
    <div className="mt-4 pt-4 border-t border-border">
      <p className="text-text-muted text-xs mb-2">CSS Classes (click to copy):</p>
      <div className="flex flex-wrap gap-2">
        {classes.map((cls) => (
          <CopyableClass key={cls} className={cls} />
        ))}
      </div>
    </div>
  );
}

export function DesignSystem() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              OGRE Design System
            </h1>
            <p className="text-text-secondary">
              Component showcase for ogre-brand-kit
            </p>
          </div>
          <Button variant="ghost" onClick={toggleDarkMode}>
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorSwatch name="Primary" className="bg-primary" />
            <ColorSwatch name="Primary Hover" className="bg-primary-hover" />
            <ColorSwatch name="Secondary" className="bg-secondary" />
            <ColorSwatch name="Secondary Hover" className="bg-secondary-hover" />
            <ColorSwatch name="Success" className="bg-success" />
            <ColorSwatch name="Warning" className="bg-warning" />
            <ColorSwatch name="Error" className="bg-error" />
            <ColorSwatch name="Info" className="bg-info" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            <ColorSwatch name="BG Primary" className="bg-bg-primary border border-border" textDark />
            <ColorSwatch name="BG Secondary" className="bg-bg-secondary border border-border" textDark />
            <ColorSwatch name="BG Hover" className="bg-bg-hover border border-border" textDark />
            <ColorSwatch name="Border" className="bg-border" textDark />
            <ColorSwatch name="Border Light" className="bg-border-light border border-border" textDark />
            <ColorSwatch name="Sidebar BG" className="bg-sidebar-bg border border-border" textDark />
          </div>
          <ClassReference classes={['bg-primary', 'bg-primary-hover', 'bg-secondary', 'bg-secondary-hover', 'bg-success', 'bg-warning', 'bg-error', 'bg-info', 'bg-bg-primary', 'bg-bg-secondary', 'bg-bg-hover', 'bg-border', 'bg-border-light', 'bg-sidebar-bg']} />
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Buttons</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Button States</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" isLoading={isLoading} onClick={handleLoadingClick}>
                {isLoading ? 'Loading...' : 'Click to Load'}
              </Button>
            </div>
          </Card>
          <ClassReference classes={['.btn', '.btn-primary', '.btn-secondary', '.btn-ghost', '.btn-small', '.btn-large', '.btn-icon']} />
        </section>

        {/* Form Elements Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Form Elements</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Default Input"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="With Helper Text"
                placeholder="Enter email..."
                helperText="We'll never share your email"
              />
              <Input
                label="With Error"
                placeholder="Enter password..."
                error="Password must be at least 8 characters"
              />
              <Input
                label="Disabled"
                placeholder="Cannot edit..."
                disabled
              />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Default Select"
                placeholder="Choose an option..."
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
              />
              <Select
                label="Loading Select"
                placeholder="Loading..."
                isLoading
                options={[]}
              />
              <Select
                label="With Error"
                placeholder="Select..."
                error="Please select an option"
                options={[
                  { value: 'a', label: 'Option A' },
                  { value: 'b', label: 'Option B' },
                ]}
              />
              <Select
                label="Disabled"
                placeholder="Cannot change..."
                disabled
                options={[]}
              />
            </div>
          </Card>
          <ClassReference classes={['.form-group', '.form-label', '.form-input', '.form-select', '.form-textarea']} />
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
              </CardHeader>
              <p className="text-text-secondary">
                This is a simple card with a header and content.
              </p>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
              </CardHeader>
              <p className="text-text-secondary">
                This card has both header and footer sections.
              </p>
              <CardFooter>
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="tile-icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="tile-title">Tile Style Card</h3>
              <p className="tile-description">
                Using tile classes for icon-based cards.
              </p>
            </Card>
          </div>
          <div className="mt-4">
            <ClassReference classes={['.card', '.card-header', '.card-title', '.card-footer', '.tile', '.tile-icon', '.tile-title', '.tile-description']} />
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Badges</h2>

          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-4">
              <Badge status="active">Active</Badge>
              <Badge status="progress">In Progress</Badge>
              <Badge status="review">Review</Badge>
              <Badge status="completed">Completed</Badge>
              <Badge status="pending">Pending</Badge>
            </div>
          </Card>
          <ClassReference classes={['.status-badge', '.status-active', '.status-progress', '.status-review', '.status-completed', '.status-pending']} />
        </section>

        {/* Spinners Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Spinners</h2>

          <Card>
            <CardHeader>
              <CardTitle>Spinner Sizes</CardTitle>
            </CardHeader>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Spinner size="sm" />
                <p className="text-text-muted text-sm mt-2">Small</p>
              </div>
              <div className="text-center">
                <Spinner size="md" />
                <p className="text-text-muted text-sm mt-2">Medium</p>
              </div>
              <div className="text-center">
                <Spinner size="lg" />
                <p className="text-text-muted text-sm mt-2">Large</p>
              </div>
            </div>
          </Card>
          <ClassReference classes={['.spinner', '.spinner-sm', '.spinner-lg']} />
        </section>

        {/* Progress Bars Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Progress Bars</h2>

          <Card>
            <CardHeader>
              <CardTitle>Progress Indicators</CardTitle>
            </CardHeader>
            <div className="space-y-6">
              <div>
                <p className="text-text-secondary mb-2">25% Complete</p>
                <ProgressBar value={25} />
              </div>
              <div>
                <p className="text-text-secondary mb-2">50% Complete</p>
                <ProgressBar value={50} />
              </div>
              <div>
                <p className="text-text-secondary mb-2">75% Complete</p>
                <ProgressBar value={75} />
              </div>
              <div>
                <p className="text-text-secondary mb-2">100% Complete</p>
                <ProgressBar value={100} />
              </div>
              <div>
                <p className="text-text-secondary mb-2">Large Progress Bar (no label)</p>
                <ProgressBar value={60} size="lg" showLabel={false} />
              </div>
            </div>
          </Card>
          <ClassReference classes={['.progress-bar', '.progress-fill', '.progress-text']} />
        </section>

        {/* Stat Tiles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Stat Tiles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat-tile">
              <div className="stat-value">$12,450</div>
              <div className="stat-label">Total Revenue</div>
              <div className="stat-change positive">+12.5%</div>
            </div>
            <div className="stat-tile">
              <div className="stat-value">1,234</div>
              <div className="stat-label">Active Users</div>
              <div className="stat-change positive">+8.2%</div>
            </div>
            <div className="stat-tile">
              <div className="stat-value">98.5%</div>
              <div className="stat-label">Uptime</div>
              <div className="stat-change positive">+0.5%</div>
            </div>
            <div className="stat-tile">
              <div className="stat-value">23</div>
              <div className="stat-label">Open Issues</div>
              <div className="stat-change negative">-15.3%</div>
            </div>
          </div>
          <div className="mt-4">
            <ClassReference classes={['.stat-tile', '.stat-value', '.stat-label', '.stat-change', '.positive', '.negative']} />
          </div>
        </section>

        {/* Data Table Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Data Table</h2>

          <div className="table-container">
            <div className="table-header">
              <div className="table-title">Recent Projects</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Filter</Button>
                <Button variant="primary" size="sm">Add New</Button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Website Redesign</td>
                  <td><Badge status="progress">In Progress</Badge></td>
                  <td><ProgressBar value={65} /></td>
                  <td>5 members</td>
                </tr>
                <tr>
                  <td>Mobile App</td>
                  <td><Badge status="active">Active</Badge></td>
                  <td><ProgressBar value={40} /></td>
                  <td>8 members</td>
                </tr>
                <tr>
                  <td>API Integration</td>
                  <td><Badge status="review">Review</Badge></td>
                  <td><ProgressBar value={90} /></td>
                  <td>3 members</td>
                </tr>
                <tr>
                  <td>Database Migration</td>
                  <td><Badge status="completed">Completed</Badge></td>
                  <td><ProgressBar value={100} /></td>
                  <td>2 members</td>
                </tr>
                <tr>
                  <td>Security Audit</td>
                  <td><Badge status="pending">Pending</Badge></td>
                  <td><ProgressBar value={0} /></td>
                  <td>4 members</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <ClassReference classes={['.table-container', '.table-header', '.table-title', '.data-table']} />
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Typography</h2>

          <Card>
            <CardHeader>
              <CardTitle>Text Colors</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <p className="text-text-primary">Primary Text - Used for headings and important content</p>
              <p className="text-text-secondary">Secondary Text - Used for body text and descriptions</p>
              <p className="text-text-muted">Muted Text - Used for less important information</p>
            </div>
          </Card>
          <ClassReference classes={['text-text-primary', 'text-text-secondary', 'text-text-muted']} />
        </section>

        {/* Shadows Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Shadows</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border">
              <p className="text-text-primary font-medium">Shadow SM</p>
              <p className="text-text-muted text-sm">Subtle elevation</p>
            </div>
            <div className="bg-bg-primary p-6 rounded-lg shadow-md">
              <p className="text-text-primary font-medium">Shadow MD</p>
              <p className="text-text-muted text-sm">Medium elevation</p>
            </div>
            <div className="bg-bg-primary p-6 rounded-lg shadow-lg">
              <p className="text-text-primary font-medium">Shadow LG</p>
              <p className="text-text-muted text-sm">High elevation</p>
            </div>
          </div>
          <ClassReference classes={['shadow-sm', 'shadow-md', 'shadow-lg']} />
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({ name, className, textDark = false }: { name: string; className: string; textDark?: boolean }) {
  return (
    <div className="text-center">
      <div className={`w-full h-16 rounded-lg ${className}`} />
      <p className={`text-sm mt-2 ${textDark ? 'text-text-primary' : 'text-text-secondary'}`}>{name}</p>
    </div>
  );
}

export default DesignSystem;
