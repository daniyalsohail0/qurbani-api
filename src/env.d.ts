declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_URI: string;
    JWT_SECRET: string;
    SENDGRID_API: string;
  }
}
