require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    host: 'localhost',
    port: process.env.DATABASE_PORT
  },
  test: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    host: 'localhost',
    port: process.env.DATABASE_PORT
  },
  production: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    host: 'localhost',
    port: process.env.DATABASE_PORT,
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    }
  },
};
