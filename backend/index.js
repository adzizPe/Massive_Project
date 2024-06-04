const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'holify',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.post('/register', (req, res) => {
  const { name, username, email, telp, password } = req.body;

  console.log('Received data:', { name, username, email, telp, password });

  if (!name || !username || !email || !telp || !password) {
    console.error('Missing fields:', { name, username, email, telp, password });
    return res.status(400).send('Missing fields');
  }
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'SELECT * FROM user WHERE email = ?';
    const values = [email.toLowerCase()]; // Ubah email menjadi huruf kecil

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error authenticating user:', err);
      return res.status(500).send('Error authenticating user');
    }

    if (results.length > 0) {
      // Otentikasi berhasil
      return res.status(200).send('Authentication successful');
    } else {
      // Otentikasi gagal
      return res.status(401).send('Invalid email or password');
    }
  });
});

  
  const sql = 'INSERT INTO user (name, username, email, telp, password) VALUES (?, ?, ?, ?, ?)';
const values = [name, username, email, telp, password];

db.query(sql, values, (err, results) => {
  if (err) {
    console.error('Error inserting user:', err);
    return res.status(500).send('Error inserting user');
  } else {
    console.log('User inserted successfully!');
    return res.status(200).send({
      message: 'User added!',
    });
  }
});
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
