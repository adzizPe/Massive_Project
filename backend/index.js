const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}
app.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = 'SELECT name, email, username, telp, profile_img FROM user WHERE iduser = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      return res.status(500).json({ error: 'Failed to fetch profile data' });
    }

    if (results.length > 0) {
      const userData = results[0];
      return res.status(200).json(userData);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});
app.put('/profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  const userId = req.user.id;
  const { name, email, oldPassword, newPassword, username, telp } = req.body;

  let updateQuery = 'UPDATE user SET name = ?, username = ?, email = ?, telp = ?';
  let updateValues = [name, username, email, telp];

  // Handle password change
  if (oldPassword && newPassword) {
    const userQuery = 'SELECT password FROM user WHERE iduser = ?';
    const user = await new Promise((resolve, reject) => {
      db.query(userQuery, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    updateQuery += ', password = ?';
    updateValues.push(hashedNewPassword);
  }

  // Handle profile picture
  if (req.file) {
    const profilePicture = req.file.filename;
    updateQuery += ', profile_img = ?'; // Ubah profile_picture menjadi profile_img
    updateValues.push(profilePicture);
  }

  updateQuery += ' WHERE iduser = ?';
  updateValues.push(userId);

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
    res.json({ message: 'Profile updated successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Backend server jalan');
});
app.post('/register', async (req, res) => {
  const { name, username, email, telp, password } = req.body;

  if (!name || !username || !email || !telp || !password) {
    console.error('Missing fields:', req.body);
    return res.status(400).send('Missing fields');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO user (name, username, email, telp, password) VALUES (?, ?, ?, ?, ?)';
    const values = [name, username, email, telp, hashedPassword];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('Error inserting user');
      } else {
        console.log('User added:', results);
        return res.status(200).send({ message: 'User added!' });
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).send('Error hashing password');
  }
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt with email:', email);

  const sql = 'SELECT * FROM user WHERE email = ?';
  const values = [email.toLowerCase()];

  db.query(sql, values, async (err, results) => {
    if (err) {
      console.error('Error authenticating user:', err);
      return res.status(500).send('Error authenticating user');
    }

    if (results.length > 0) {
      const user = results[0];
      console.log('User found:', user);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.iduser }, 'your_secret_key', { expiresIn: '1h' });
        console.log('Token generated:', token);
        return res.status(200).send({ message: 'Authentication successful', token, username: user.username });
      } else {
        console.error('Invalid email or password');
        return res.status(401).send('Invalid email or password');
      }
    } else {
      console.error('Invalid email or password');
      return res.status(401).send('Invalid email or password');
    }
  });
});
    
app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', authenticateToken, require('./routes/profileRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});