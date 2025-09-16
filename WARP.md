# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Aha! Develop extension project that extends the functionality of the Aha! Develop platform. The main extension code is located in the `follow-up/` directory and follows the Aha! extension architecture pattern with commands and views.

## Essential Commands

### Extension Development
```bash
# Install the Aha! CLI globally (required for extension development)
npm install -g aha-cli

# Install the extension into your Aha! account and set up file watcher
cd follow-up
aha extension:install
aha extension:watch

# Build the extension for distribution
aha extension:build
```

### Development Workflow
```bash
# Navigate to the extension directory for most operations
cd follow-up

# Type checking (using TypeScript config for JavaScript files)
npx tsc --noEmit

# Check extension configuration
aha extension:validate
```

## Architecture and Code Structure

### Extension Architecture
This is an Aha! Develop extension with a specific architectural pattern:

- **Extension Manifest**: `follow-up/package.json` contains the `ahaExtension` configuration that defines:
  - Views: UI components hosted within Aha! pages
  - Commands: Backend logic triggered by user actions or system events
  
- **Entry Points**: The extension uses JavaScript entry points that register handlers using the `aha.on()` pattern

### Directory Structure
```
follow-up/                    # Main extension directory
├── src/
│   ├── commands/            # Command handlers (backend logic)
│   │   └── sampleCommand.js # Example command implementation
│   └── views/               # View components (React UI)
│       └── samplePage.js    # Example page view with React
├── .aha-cache/              # Auto-generated type definitions and schemas
│   ├── types/               # TypeScript definitions for Aha! APIs
│   └── schema/              # JSON schemas for validation
├── package.json             # Extension manifest and configuration
└── tsconfig.json            # TypeScript config for JavaScript type checking
```

### Code Patterns

**Command Pattern** (`src/commands/*.js`):
```javascript path=null start=null
aha.on("commandName", ({ record }, { identifier, settings }) => {
  // Command logic here
  aha.commandOutput("Response message");
});
```

**View Pattern** (`src/views/*.js`):
```javascript path=null start=null
import React from "react";

aha.on("viewName", ({ fields, onUnmounted }, { identifier, settings }) => {
  return (
    <div>
      {/* React JSX content */}
    </div>
  );
});
```

### Extension Configuration
The `package.json` file contains an `ahaExtension` section that defines:
- **Views**: UI components with `entryPoint`, `host`, and `location` properties
- **Commands**: Backend handlers with `entryPoint` and `title` properties

### Type Safety
- TypeScript configuration is set up for JavaScript files (`checkJs: true`)
- Aha! API types are auto-generated in `.aha-cache/types/`
- VSCode is configured to use Aha! package schema for validation

## Development Notes

### Extension Development Requirements
- Must be an Aha! account administrator to install extensions
- The `aha` CLI tool is required for development workflow
- Extensions are auto-deployed during development when using `aha extension:watch`

### File Watching
The development workflow relies on file watching - changes to source files are automatically reflected in the Aha! account when `aha extension:watch` is running.

### React and JSX
Views use React with JSX syntax. The extension supports:
- Inline styles via `<style>` components
- CSS custom properties (e.g., `var(--aha-green-800)`)
- Standard React patterns and hooks

### API Context
Commands and views receive context objects containing:
- `record`: The current Aha! record (feature, requirement, etc.)
- `fields`: Form fields and user inputs
- `identifier`: Extension identification
- `settings`: Extension settings and configuration