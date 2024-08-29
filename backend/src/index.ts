import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

// .envファイルから環境変数を読み込む
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

let dbConnectionStatus = 'Not connected';

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    dbConnectionStatus = 'Error connecting to MySQL';
    return;
  }
  console.log('Connected to MySQL');
  dbConnectionStatus = 'Connected to MySQL';
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/db-status', (req, res) => {
  res.json({ status: dbConnectionStatus });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});