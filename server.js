// Importações necessárias
const express = require('express');
const path = require('path');
const session = require('express-session'); // Sessões para autenticação do dashboard

// Inicializa o app Express
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;

// Middleware para lidar com JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
  secret: 'segredo-para-sessao',
  resave: false,
  saveUninitialized: true
}));

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Renderização de views (caso use templates como EJS)
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/partials') // Adiciona o diretório de partials
]);
app.set('view engine', 'ejs');

// Rotas de API
const apiRoutes = require('./api');
app.use('/api', apiRoutes); // Modularização para rotas da API

// Rotas para o Dashboard
const isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Verificação de usuário e senha (hardcoded para exemplo)
  if (username === 'admin' && password === '1234') {
    req.session.isLoggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Usuário ou senha incorretos' });
  }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Painel de Controle' });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Rota padrão
app.get('/', (req, res) => {
  res.render('index', { title: 'Bem-vindo à Ultremare' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
