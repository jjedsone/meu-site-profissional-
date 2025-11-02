const express = require('express');
const Storage = require('../models/Storage');
const { validateDepoimento } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const storage = new Storage('depoimentos');

// GET /api/depoimentos - Listar todos os depoimentos (público)
router.get('/', async (req, res) => {
  try {
    const { categoria } = req.query;
    let depoimentos = await storage.findAll();

    // Filtrar por categoria
    if (categoria && categoria !== 'todos') {
      depoimentos = depoimentos.filter(d => d.categoria === categoria);
    }

    // Ordenar por data (mais recente primeiro)
    depoimentos.sort((a, b) => new Date(b.data || b.createdAt) - new Date(a.data || a.createdAt));

    res.json({
      success: true,
      count: depoimentos.length,
      data: depoimentos
    });
  } catch (error) {
    console.error('Erro ao listar depoimentos:', error);
    res.status(500).json({ error: 'Erro ao listar depoimentos' });
  }
});

// GET /api/depoimentos/:id - Obter depoimento específico (público)
router.get('/:id', async (req, res) => {
  try {
    const depoimento = await storage.findById(parseInt(req.params.id));
    
    if (!depoimento) {
      return res.status(404).json({ error: 'Depoimento não encontrado' });
    }

    res.json({
      success: true,
      data: depoimento
    });
  } catch (error) {
    console.error('Erro ao obter depoimento:', error);
    res.status(500).json({ error: 'Erro ao obter depoimento' });
  }
});

// POST /api/depoimentos - Criar novo depoimento (admin only)
router.post('/', authenticateToken, requireAdmin, validateDepoimento, async (req, res) => {
  try {
    const depoimento = await storage.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Depoimento criado com sucesso',
      data: depoimento
    });
  } catch (error) {
    console.error('Erro ao criar depoimento:', error);
    res.status(500).json({ error: 'Erro ao criar depoimento' });
  }
});

// PUT /api/depoimentos/:id - Atualizar depoimento (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateDepoimento, async (req, res) => {
  try {
    const depoimento = await storage.update(parseInt(req.params.id), req.body);

    if (!depoimento) {
      return res.status(404).json({ error: 'Depoimento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Depoimento atualizado com sucesso',
      data: depoimento
    });
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error);
    res.status(500).json({ error: 'Erro ao atualizar depoimento' });
  }
});

// DELETE /api/depoimentos/:id - Deletar depoimento (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await storage.delete(parseInt(req.params.id));

    if (!deleted) {
      return res.status(404).json({ error: 'Depoimento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Depoimento deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar depoimento:', error);
    res.status(500).json({ error: 'Erro ao deletar depoimento' });
  }
});

module.exports = router;

