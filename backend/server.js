const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const orcamentosRoutes = require('./routes/orcamentos');
const mensagensRoutes = require('./routes/mensagens');
const projetosRoutes = require('./routes/projetos');
const authRoutes = require('./routes/auth');
const depoimentosRoutes = require('./routes/depoimentos');
const configRoutes = require('./routes/config');

// Criar app Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Middleware de logging (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS - Permitir acesso do frontend
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API WebPro Sites está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/orcamentos', orcamentosRoutes);
app.use('/api/mensagens', mensagensRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/depoimentos', depoimentosRoutes);
app.use('/api/config', configRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path 
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS permitido: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});

