const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Credenciais do admin (em produção, use banco de dados!)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Hash da senha (execute uma vez e salve o hash)
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// POST /api/auth/login - Login do admin
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username é obrigatório'),
  body('password').trim().notEmpty().withMessage('Senha é obrigatória'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar credenciais
    const isUsernameValid = username === ADMIN_USERNAME;
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isUsernameValid || !isPasswordValid) {
      return res.status(401).json({ 
        error: 'Credenciais inválidas' 
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        username,
        role: 'admin',
        id: 1
      },
      process.env.JWT_SECRET || 'fallback-secret-change-in-production',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        username,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/auth/verify - Verificar token
router.post('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-change-in-production', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    res.json({
      valid: true,
      user: decoded
    });
  });
});

// POST /api/auth/logout - Logout (client-side apenas)
router.post('/logout', (req, res) => {
  res.json({ 
    success: true,
    message: 'Logout realizado com sucesso' 
  });
});

module.exports = router;

