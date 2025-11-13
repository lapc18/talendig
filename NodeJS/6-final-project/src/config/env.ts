import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env'
});

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env variable: ${key}`);
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  env: process.env.NODE_ENV ?? 'development',
  db: {
    name: requireEnv('DB_NAME'),
    user: requireEnv('DB_USER'),
    password: requireEnv('DB_PWD'),
    host: requireEnv('DB_HOST'),
    port: parseInt(process.env.DB_PORT!) || 5432,
  },
  jwtSecret: requireEnv('JWT_SECRET'),
  firebase: {
    projectId: requireEnv('FIREBASE_PROJECT_ID'),
    clientEmail: requireEnv('FIREBASE_CLIENT_EMAIL'),
    privateKey: requireEnv('FIREBASE_PRIVATE_KEY'),
  },
};

