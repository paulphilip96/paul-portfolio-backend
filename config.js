//imports
require('dotenv').config();

const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const connectionStringLudwing = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_LUDWING}`;

const pool = new Pool({
  connectionString,
   ssl: {
   	isProduction,
  	rejectUnauthorized: false
  }
});

const pool_ludwing = new Pool({
  connectionString: connectionStringLudwing,
  ssl: {
    isProduction,
    rejectUnauthorized: false   
  }
});

module.exports = { pool, pool_ludwing }