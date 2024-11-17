function getContentByRegion(contentList, state, city) {
    console.log('Buscando por:', { state, city });
    const result = contentList.find(item => {
      console.log('Comparando com:', { state: item.state, city: item.city });
      return item.state === state && item.city === city;
    });
  
    console.log('Resultado da busca:', result);
    return result;
  }
  
  module.exports = { getContentByRegion };
  