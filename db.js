require('dotenv').config(); // This line loads the .env file
const mysql = require('mysql2/promise');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '@Viki0975', 
  database: process.env.DB_NAME || 'express_crud'
});

module.exports = pool;