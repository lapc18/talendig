declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: 'development' | 'production';
    DB_NAME: string;
    DB_USER: string;
    DB_PWD: string;
    DB_HOST: string;
    DB_PORT: string;
  }

}
