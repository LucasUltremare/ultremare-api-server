# Ultremare API Server
Ultremare API Server é um servidor robusto projetado para gerenciar APIs avançadas, com hospetagem na vercel.

## Funcionalidades Principais
A API de Linguagem Natural serve como um primeiro passo na arquitetura de sistema neural, mesmo sendo simples, te ajuda a entender pricipios basicos, como uma simples pergunta de "oi tudo, tudo bem?", tendo a possibilidade de varias respostas. Este projeto fornece um ambiente escalável e eficiente para aplicações simples a mais avançadas.

- API de Linguagem Natural:
Oferece funcionalidades como:
  - Detecção de intenções: Identifica o propósito de um texto ou comando recebido.
  - Análise de sentimentos: Determina o tom emocional do texto (positivo, negativo ou neutro).
  - Extração de entidades: Reconhece nomes, locais, datas, e outras entidades em um texto.

### Como Usar
[Insira instruções para instalar e usar o servidor, incluindo como acessar a API de linguagem natural]

Inicialização:
``` js 
node app.js
```

Requisição à API de Linguagem Natural:
``` bash
curl -X POST http://localhost:5000/nlp \
-H "Content-Type: application/json" \
-d '{"texto": "Qual é a previsão do tempo para amanhã?"}'
```
Resposta esperada:
```json
{
  "intencao": "consulta_previsao",
  "entidades": {
    "data": "amanhã"
  }
}
```
