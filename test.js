const fetchIBGECities = require('./api/ultremare/content/data');
const { getContentByRegion } = require('./api/ultremare/content/utils');

(async () => {
  const regionalContent = await fetchIBGECities();

  // Exibe os dados carregados
  console.log('Dados carregados:', regionalContent.slice(0, 10)); // Apenas os primeiros 10 itens

  // Verifica se São Paulo está presente nos dados
  const spData = regionalContent.find(item => item.state === 'sp' && item.city === 'sao-paulo');
  console.log('São Paulo nos dados:', spData);

  // Testa a busca manual
  const result = getContentByRegion(regionalContent, 'sp', 'sao-paulo');
  console.log('Resultado da busca manual:', result);
})();
