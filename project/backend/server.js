const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Crear tabla de usuarios
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  )
`);

// Registro
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, 'user'],
    function (err) {
      if (err) return res.status(400).json({ error: 'Email ya registrado' });
      res.status(201).json({ message: 'Usuario registrado' });
    }
  );
});

// Inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Usuario no encontrado' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.json({ email: user.email, role: user.role, token });
  });
});

// Middleware para verificar token (para rutas protegidas)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Ejemplo de ruta protegida
app.get('/api/account', authenticateToken, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));