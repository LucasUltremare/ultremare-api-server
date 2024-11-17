const express = require('express');
const router = express.Router();
const fetchIBGECities = require('./data');
const { getContentByRegion } = require('./utils'); // Certifique-se de que está importando assim

let regionalContent = [];

// Carregar os dados do IBGE ao iniciar
(async () => {
  console.log('Carregando dados do IBGE...');
  regionalContent = await fetchIBGECities();
  console.log('Dados carregados com sucesso!');
})();

// Rota para buscar conteúdo por estado e cidade
router.get('/:state/:city', (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase().replace(/\s/g, '-');

  const content = getContentByRegion(regionalContent, state, city);

  if (content) {
    res.json(content);
  } else {
    res.status(404).json({ message: 'Conteúdo não encontrado para esta região.' });
  }
});

module.exports = router;
