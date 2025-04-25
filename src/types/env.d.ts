declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
}
