const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Buat folder uploads jika belum ada
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Setup multer untuk file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

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

// Endpoint untuk menerima laporan
app.post('/reports', upload.array('photos', 1), (req, res) => {
  const { location, numberOfPotholes, additionalDetails, status, category, iduser } = req.body;

  let photo;
  if (req.files.length > 0) {
    const file = req.files[0];
    photo = file.filename; // Mengambil nama file
  }

  console.log('Received report data:', req.body); // Debugging
  console.log('Received photo data:', photo); // Debugging

  const query = 'INSERT INTO laporan (iduser, laporan_date, location, description, status, category, photo) VALUES (?, NOW(), ?, ?, ?, ?, ?)';
  const values = [iduser, location, additionalDetails, status, category, photo];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting report:', err);
      res.status(500).send('Error inserting report');
      return;
    }
    console.log('Report inserted successfully:', result); // Debugging
    res.status(200).send('Report submitted successfully');
  });
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
        const token = jwt.sign({ id: user.iduser }, 'your_secret_key', { expiresIn: '1h' });
        return res.status(200).send({ message: 'Authentication successful', token, username: user.username });
      } else {
        return res.status(401).send('Invalid email or password');
      }
    } else {
      return res.status(401).send('Invalid email or password');
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});