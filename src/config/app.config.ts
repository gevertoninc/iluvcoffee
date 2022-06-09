const appConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    database: process.env.DATABASE_NAME || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    password: process.env.DATABASE_PASSWORD || 'pass123',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
  },
});

export { appConfig };
