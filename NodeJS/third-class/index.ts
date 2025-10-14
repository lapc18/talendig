// import { EventEmitter } from 'events';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as os from 'os';
// import * as http from 'http';

console.log('🚀 Third Class - NodeJS Modules, HTTP and Asynchrony');
console.log('==================================================');

// Example: Using native modules
console.log('\n📁 Native Modules Examples:');




// Example: File system operations
console.log('\n📄 File System Operations:');



// Example: Event emitter
console.log('\n🎯 Event Emitter Example:');





// Example: HTTP Server
console.log('\n🌐 HTTP Server Example:');



// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
