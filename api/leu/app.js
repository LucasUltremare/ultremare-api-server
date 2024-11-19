const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote CORS

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota para processar comandos
app.post('/comando', (req, res) => {
    const comando = (req.body.comando || '').trim().toLowerCase(); // Padroniza o comando
    console.log(`Comando recebido: ${comando}`); // Log para monitorar

    // Mapeamento de comandos para respostas
    const acoes = {
        "ligar_luz": "Luz ativada",
        "desligar_luz": "Luz desligada",
        "qual_temperatura": "A temperatura é 25°C"
    };

    // Busca a resposta para o comando ou define como "não reconhecido"
    const resposta = acoes[comando] || "Comando não reconhecido.";
    console.log(`Resposta enviada: ${resposta}`); // Log para conferir a resposta

    // Retorna a resposta como JSON
    res.json({ mensagem: resposta });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Habilitar o CORS para todas as origens
// app.use(cors());

// app.use(express.json());

// const acoes = {
//   "ligar_luz": "Luz ativada",
//   "desligar_luz": "Luz desligada",
//   "qual_temperatura": "A temperatura é 25°C"
// };

// app.post('/comando', (req, res) => {
//     const comando = req.body.comando;
//     console.log("Comando recebido:", comando); // Exibe o comando recebido
//     const resposta = acoes[comando];
//     console.log("Resposta encontrada:", resposta); // Exibe a resposta encontrada no objeto `acoes`
  
//     if (resposta) {
//       res.json({ mensagem: resposta });
//     } else {
//       res.status(400).json({ error: "Comando não reconhecido." });
//     }
//   });
  

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });
