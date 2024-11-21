const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Função para carregar os comandos do JSON
function carregarComandos() {
    const rawData = fs.readFileSync('comandos.json');
    return JSON.parse(rawData);
}

// Função para identificar o comando baseado nas palavras-chave
function identificarComando(comando, acoes) {
    for (const acao of acoes) {
        for (const keyword of acao.keywords) {
            if (comando.includes(keyword)) {
                return acao.resposta;
            }
        }
    }
    return "Comando não reconhecido."; // Resposta padrão para comandos inválidos
}

// Rota para processar comandos
app.post('/comando', (req, res) => {
    const comando = (req.body.comando || '').trim().toLowerCase(); // Padroniza o comando
    console.log(`Comando recebido: ${comando}`);

    const acoes = carregarComandos(); // Carrega comandos do JSON
    const resposta = identificarComando(comando, acoes); // Busca a resposta
    console.log(`Resposta enviada: ${resposta}`);

    res.json({ mensagem: resposta }); // Retorna a resposta
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
