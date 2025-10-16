import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as http from 'http';
import * as url from 'url';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';

console.log('🚀 Third Class - NodeJS Modules, HTTP and Asynchrony');
console.log('#========================================================================#\n');

console.log('Current working dir::', process.cwd());
console.log('Platform:', os.platform());
console.log('arc:', os.arch());
console.log('cpu:', os.cpus());

console.log('\n===========================[Native Modules]===============================\n');

const file = path.join(process.cwd(), 'package-old.json');

console.log('README.MD > \n', file);

console.log('=======================[File system operations]===========================');
const fileContent = fs.existsSync(file);
// const fileContentParsed: { name: string, version: string } = JSON.parse(fileContent);
console.log('file content:exists?:', fileContent);
// console.log('file fileContentParsed::', fileContentParsed.name);


console.log('===========================[Event Emitters]===============================');
const emitter = new EventEmitter();

emitter.on('start', () => {
  console.log('Hemos inicializado el API, sea juicioso.')
})

// what do you think is going to happen here?
emitter.emit('start', { name: 'Jonh Doe' })


console.log('=============================[HTTP Server]=================================');

// HTTP Server with proper request handling
const server = http.createServer(async (req, res) => {
  const method = req.method;

  const { pathname } = url.parse(req.url!, true);

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'say hello' }));
    return;
  }

  if (pathname === '/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ time: 'son las 9PM...' }));
    return;
  }

  if (pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ about: 'soy lapc18...' }));


    return new Promise((_, reject) => {
      setTimeout(() => reject('PRUEBA, porque si.'), 3000)
    });
  }

  if(pathname === '/save' && method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end(JSON.stringify({ about: 'soy lapc18 ejecutando post...' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});


const PORT = 4000;

server.listen(PORT, () => {
  console.log(`RUNNING OVER PORT: ${PORT}`);
});

console.log('============================[System Events]================================');
// Graceful shutdown
process.on('SIGINT', () => {
  console.log('###### TURNING OFF THIS PIIIII... ######');
  process.exit(0);
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('##### Something is BROKEN, must check: #####\n', error);
  // process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('#### Like your Ex: a rejection found xd ####');
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
  // process.exit(1);
});
