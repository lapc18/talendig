declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: 'development' | 'production';
    DB_NAME: string;
    DB_USER: string;
    DB_PWD: string;
    DB_HOST: string;
    DB_PORT: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
  }

}
