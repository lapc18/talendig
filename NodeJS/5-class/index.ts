import express from 'express';
import swaggerUi from "swagger-ui-express";
import specs from './src/config/swagger'
import { connect, sequelize } from './src/config/db';
import productsRouter from './src/routes/products.routes';
import usersRouter from './src/routes/users.routes';

const app = express();
const PORT = process.env['PORT'] || 3000;

const loadConfig = async () => {
  console.log('🔄 Loading config...');
  await connect();
  await sequelize.sync({ alter: true });
  console.log('✅ Config loaded successfully');
}

loadConfig();

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))



// Routes
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Fifth/Sixth Class NodeJS Project!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🚀`);
  console.log(`📱 Health check available at http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
