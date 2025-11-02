const express = require('express');
const Storage = require('../models/Storage');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const storage = new Storage('config');

// GET /api/config/cores - Obter cores personalizadas
router.get('/cores', async (req, res) => {
  try {
    const config = await storage.findBy({ tipo: 'cores' });
    const cores = config[0] || {
      tipo: 'cores',
      primary: '#2563eb',
      accent: '#06b6d4',
      gradientStart: '#2563eb',
      gradientEnd: '#06b6d4',
      bodyBackground: '#f5f7fa',
      bodyText: '#1f2937',
      navbarBackground: '#ffffff',
      navbarText: '#475569',
      cardBackground: '#ffffff',
      cardText: '#1e293b'
    };

    res.json({
      success: true,
      data: cores
    });
  } catch (error) {
    console.error('Erro ao obter cores:', error);
    res.status(500).json({ error: 'Erro ao obter cores' });
  }
});

// PUT /api/config/cores - Atualizar cores (admin only)
router.put('/cores', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const coresAtualizadas = {
      tipo: 'cores',
      ...req.body
    };

    // Verificar se já existe
    const existing = await storage.findBy({ tipo: 'cores' });
    
    let cores;
    if (existing.length > 0) {
      cores = await storage.update(existing[0].id, coresAtualizadas);
    } else {
      cores = await storage.create(coresAtualizadas);
    }

    res.json({
      success: true,
      message: 'Cores atualizadas com sucesso',
      data: cores
    });
  } catch (error) {
    console.error('Erro ao atualizar cores:', error);
    res.status(500).json({ error: 'Erro ao atualizar cores' });
  }
});

module.exports = router;

