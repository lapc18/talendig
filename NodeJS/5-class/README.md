# Fifth Class NodeJS Project

This is the fifth class NodeJS learning project for the Talendig program.

## Project Structure

```
5-class/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # Route definitions
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── dist/               # Compiled JavaScript output
├── index.ts            # Main application entry point
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express.js**: Web framework for building APIs
- **Structured Architecture**: Organized code structure with separation of concerns
- **Error Handling**: Comprehensive error handling middleware
- **Response Helpers**: Utility functions for consistent API responses
- **Request Logging**: Middleware for logging HTTP requests

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd NodeJS/5-class
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Development mode (with auto-reload):**
   ```bash
   npm run start:dev
   ```

4. **Watch mode (TypeScript compilation):**
   ```bash
   npm run dev
   ```

### API Endpoints

- `GET /` - Welcome message and project info
- `GET /health` - Health check endpoint

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the compiled application
- `npm run start:dev` - Start with nodemon for development
- `npm run dev` - Watch mode for TypeScript compilation
- `npm test` - Run tests (not configured yet)
- `npm run lint` - Run linting (not configured yet)

## TypeScript Configuration

The project uses strict TypeScript configuration with:
- ES2022 target
- CommonJS modules
- Strict type checking enabled
- Source maps and declarations generated
- Comprehensive compiler options for better code quality

## Author

Luis Adolfo Pimentel - Talendig Learning Program
