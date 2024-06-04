const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

app.post('/register', async (req, res) => {
  const { name, username, email, telp, password } = req.body;

  if (!name || !username || !email || !telp || !password) {
    return res.status(400).send('Missing fields');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO user (name, username, email, telp, password) VALUES (?, ?, ?, ?, ?)';
    const values = [name, username, email, telp, hashedPassword];

    db.query(sql, values, (err, results) => {
      if (err) {
        return res.status(500).send('Error inserting user');
      } else {
        return res.status(200).send({
          message: 'User added!',
        });
      }
    });
  } catch (error) {
    return res.status(500).send('Error hashing password');
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM user WHERE email = ?';
  const values = [email.toLowerCase()];

  db.query(sql, values, async (err, results) => {
    if (err) {
      return res.status(500).send('Error authenticating user');
    }

    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        return res.status(200).send({ message: 'Authentication successful', token, username: user.username });
      } else {
        return res.status(401).send('Invalid email or password');
      }
    } else {
      return res.status(401).send('Invalid email or password');
    }
  });
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});