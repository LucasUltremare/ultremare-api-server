const express = require('express');
const router = express.Router();
const contentRoutes = require('./content');

// Adiciona rotas relacionadas ao conteúdo regionalizado
router.use('/content', contentRoutes);

router.get('/:state/:city', async (req, res) => {
    const state = req.params.state.toLowerCase();
    const city = req.params.city.toLowerCase().replace(/\s/g, '-');
  
    console.log('Parâmetros normalizados:', { state, city });
  
    const content = getContentByRegion(regionalContent, state, city);
  
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: 'Conteúdo não encontrado para esta região.' });
    }
  });
  


module.exports = router;
