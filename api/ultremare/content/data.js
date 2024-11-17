const fetch = require('node-fetch');

async function fetchIBGECities() {
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do IBGE: ${response.statusText}`);
    }

    const cities = await response.json();

    const structuredData = cities.map(city => ({
      state: city.microrregiao.mesorregiao.UF.sigla.toLowerCase(),
      city: city.nome.toLowerCase().replace(/\s/g, '-'),
      title: `Serviços de Produção em ${city.nome}`,
      description: `Produção audiovisual em ${city.nome}, ${city.microrregiao.mesorregiao.UF.nome}.`,
      services: ['Produção Audiovisual', 'Criação de Conteúdo', 'Programação']
    }));

    console.log('Dados carregados com sucesso! Exemplos:', structuredData.slice(0, 5)); // Mostra os 5 primeiros itens

    const saoPauloData = structuredData.filter(item => item.state === 'sp');
    console.log('Todos os itens do estado SP:', saoPauloData);
    

    return structuredData;
  } catch (error) {
    console.log('Dados carregados (detalhados):', structuredData.slice(0, 10)); // Exibir os 10 primeiros itens
    return [];
  }
}

// Exporta a função
module.exports = fetchIBGECities;