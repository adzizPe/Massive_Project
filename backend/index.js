const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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
  res.send('Backend server jalan');
});

app.use('/auth', authRoutes);

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

// Add report submission endpoint with debugging
app.post('/reports', upload.array('photos', 10), (req, res) => {
  const { iduser, location, description, status, category } = req.body;
  const laporan_date = new Date();
  const photos = req.files.map(file => file.filename);

  if (!iduser || !location || !description) {
    return res.status(400).send('ID user, location, and description are required');
  }

  const sql = 'INSERT INTO reports (iduser, laporan_date, location, description, status, category, photo) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [iduser, laporan_date, location, description, status || 'pending', category, JSON.stringify(photos)];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting report:', err);
      return res.status(500).send('Error inserting report');
    } else {
      console.log('Report added successfully:', results);
      return res.status(200).send({
        message: 'Report added!',
        reportId: results.insertId,
      });
    }
  });
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});