# Aha! Follow-up Extension

A simple and elegant extension for Aha! Develop that adds a "Follow-up" button to Feature details pages, allowing users to quickly create follow-up tasks with a single click.

## Features

✅ **One-click task creation** - Create follow-up tasks instantly from any Feature page
✅ **Smart naming** - Tasks are automatically named "Follow up: [Feature Name]"
✅ **Auto-assignment** - Tasks are automatically assigned to the current user
✅ **Due date handling** - Tasks are set with tomorrow's date as the due date
✅ **Aha! design system** - Uses native Aha! button components with proper styling
✅ **State management** - Clean loading, success, and error states with retry functionality
✅ **Professional UI** - Integrates seamlessly into Feature details pages

## Installation

### Prerequisites
- Aha! Develop account with administrator privileges
- Node.js and npm installed
- Aha! CLI installed globally: `npm install -g aha-cli`

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nathanielcollum/aha-follow-up.git
   cd aha-follow-up/follow-up
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install the extension**:
   ```bash
   aha extension:install
   ```

4. **Start development mode** (optional):
   ```bash
   aha extension:watch
   ```

## Usage

1. Navigate to any Feature details page in your Aha! Develop account
2. Look for the "Follow-up" button in the Feature details area
3. Click the button to create a follow-up task
4. The button will show different states:
   - **Default**: Gray "Follow-up" button
   - **Loading**: Dimmed "Creating..." button with spinner
   - **Success**: Green "Follow-up created" button
   - **Error**: Red "Retry" button with error message

## Technical Details

### Architecture
- **Framework**: React with Aha! Extension API
- **Styling**: Native Aha! design system components (`<aha-button>`)
- **Task Creation**: Uses `aha.models.Task` API
- **Location**: Feature details page (`host: "attribute", location: { "details": true }`)

### Key Components
- **Button States**: Secondary (default), Success (green), Danger (red)
- **Error Handling**: Graceful error handling with retry functionality
- **Date Formatting**: ISO date format (YYYY-MM-DD) for due dates
- **Feature Name Detection**: Fallback logic to get proper feature names

### File Structure
```
follow-up/
├── src/
│   └── views/
│       └── followUpButton.js    # Main React component
├── package.json                 # Extension manifest
├── tsconfig.json               # TypeScript configuration
└── .aha-cache/                 # Auto-generated Aha! types
```

## Development

### Commands
```bash
# Install extension
aha extension:install

# Watch for changes (development mode)
aha extension:watch

# Build extension for distribution
aha extension:build

# Validate extension configuration
npx tsc --noEmit  # Type checking
```

### Extension Configuration
The extension is configured in `package.json` under the `ahaExtension` section:

```json
{
  "ahaExtension": {
    "contributes": {
      "views": {
        "followUpButton": {
          "title": "Follow-up",
          "entryPoint": "src/views/followUpButton.js",
          "host": "attribute",
          "recordTypes": ["Feature"],
          "location": { "details": true }
        }
      }
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test the extension: `aha extension:install`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions:
1. Check the [Aha! Extension Documentation](https://www.aha.io/api/extensions)
2. Open an issue in this repository
3. Contact the maintainer

---

**Author**: [Nathaniel Collum](https://github.com/nathanielcollum)  
**Repository**: [aha-follow-up](https://github.com/nathanielcollum/aha-follow-up)
