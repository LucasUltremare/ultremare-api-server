const express = require('express');
const router = express.Router();

// Importar APIs dos diferentes módulos
router.use('/ultremare', require('./ultremare'));
//router.use('/projetoX', require('./projetoX'));
//router.use('/EVA'), require('./EVA')
// Adicione outras APIs conforme necessário



module.exports = router;
