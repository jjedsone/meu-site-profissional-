const { body, validationResult } = require('express-validator');

// Middleware para validar resultados
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

// Validações para Orçamento
const validateOrcamento = [
  body('nomeCompleto').trim().notEmpty().withMessage('Nome completo é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
  handleValidationErrors
];

// Validações para Mensagem
const validateMensagem = [
  body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('mensagem').trim().notEmpty().withMessage('Mensagem é obrigatória'),
  handleValidationErrors
];

// Validações para Projeto
const validateProjeto = [
  body('titulo').trim().notEmpty().withMessage('Título é obrigatório'),
  body('categoria').trim().notEmpty().withMessage('Categoria é obrigatória'),
  body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória'),
  handleValidationErrors
];

// Validações para Depoimento
const validateDepoimento = [
  body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('texto').trim().notEmpty().withMessage('Texto do depoimento é obrigatório'),
  body('avaliacao').isInt({ min: 1, max: 5 }).withMessage('Avaliação deve ser entre 1 e 5'),
  handleValidationErrors
];

module.exports = {
  validateOrcamento,
  validateMensagem,
  validateProjeto,
  validateDepoimento,
  handleValidationErrors
};

