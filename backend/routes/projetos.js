const express = require('express');
const Storage = require('../models/Storage');
const { validateProjeto } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const storage = new Storage('projetos');

// GET /api/projetos - Listar todos os projetos (público, mas filtrado)
router.get('/', async (req, res) => {
  try {
    const { categoria, search } = req.query;
    let projetos = await storage.findAll();

    // Filtrar por categoria
    if (categoria && categoria !== 'todos') {
      projetos = projetos.filter(p => p.categoria === categoria);
    }

    // Buscar por texto (título, descrição)
    if (search) {
      const searchLower = search.toLowerCase();
      projetos = projetos.filter(p => 
        p.titulo?.toLowerCase().includes(searchLower) ||
        p.descricao?.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data (mais recente primeiro)
    projetos.sort((a, b) => new Date(b.dataCriacao || b.createdAt) - new Date(a.dataCriacao || a.createdAt));

    res.json({
      success: true,
      count: projetos.length,
      data: projetos
    });
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).json({ error: 'Erro ao listar projetos' });
  }
});

// GET /api/projetos/:id - Obter projeto específico (público)
router.get('/:id', async (req, res) => {
  try {
    const projeto = await storage.findById(parseInt(req.params.id));
    
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json({
      success: true,
      data: projeto
    });
  } catch (error) {
    console.error('Erro ao obter projeto:', error);
    res.status(500).json({ error: 'Erro ao obter projeto' });
  }
});

// POST /api/projetos - Criar novo projeto (admin only)
router.post('/', authenticateToken, requireAdmin, validateProjeto, async (req, res) => {
  try {
    const projeto = await storage.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Projeto criado com sucesso',
      data: projeto
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ error: 'Erro ao criar projeto' });
  }
});

// PUT /api/projetos/:id - Atualizar projeto completo (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateProjeto, async (req, res) => {
  try {
    const projeto = await storage.update(parseInt(req.params.id), req.body);

    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json({
      success: true,
      message: 'Projeto atualizado com sucesso',
      data: projeto
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: 'Erro ao atualizar projeto' });
  }
});

// PATCH /api/projetos/:id - Atualizar projeto parcial (admin only)
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const projeto = await storage.update(parseInt(req.params.id), req.body);

    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json({
      success: true,
      message: 'Projeto atualizado com sucesso',
      data: projeto
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: 'Erro ao atualizar projeto' });
  }
});

// DELETE /api/projetos/:id - Deletar projeto (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await storage.delete(parseInt(req.params.id));

    if (!deleted) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json({
      success: true,
      message: 'Projeto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ error: 'Erro ao deletar projeto' });
  }
});

module.exports = router;

