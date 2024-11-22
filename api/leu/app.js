const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Carregar os comandos do JSON
const comandosPath = path.join(__dirname, 'comandos.json');
let comandos = [];

// Função para carregar os comandos do arquivo
function carregarComandos() {
  try {
    const data = fs.readFileSync(comandosPath, 'utf8');
    comandos = JSON.parse(data).comandos;
  } catch (err) {
    console.error('Erro ao carregar comandos:', err.message);
    comandos = [];
  }
}

// Carregar os comandos na inicialização do servidor
carregarComandos();

// Função para encontrar o comando correspondente
function encontrarResposta(comando) {
  const comandoLower = comando.toLowerCase();
  for (const item of comandos) {
    if (item.variacoes.some(variacao => variacao.toLowerCase() === comandoLower)) {
      // Selecionar uma resposta aleatória do array de respostas
      const respostas = item.respostas;
      return respostas[Math.floor(Math.random() * respostas.length)];
    }
  }
  return null; // Não encontrou uma correspondência
}

// Endpoint para processar comandos
app.post('/comando', (req, res) => {
  const { comando } = req.body;

  if (!comando) {
    return res.status(400).json({ error: 'Comando não enviado.' });
  }

  const resposta = encontrarResposta(comando);
  if (resposta) {
    return res.json({ resposta });
  } else {
    return res.json({ resposta: "Desculpe, não entendi o comando." });
  }
});

// Endpoint para recarregar os comandos manualmente
app.get('/recarregar', (req, res) => {
  carregarComandos();
  res.json({ message: 'Comandos recarregados com sucesso!' });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


