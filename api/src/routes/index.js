const { Router } = require('express');
const dogPost = require('../controllers/dogPost');
const getDogs = require('../controllers/getDogs');
const getDogsById = require('../controllers/getDogsById');
const getTemperaments = require('../controllers/getTemperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', getDogs);
router.get('/dogs/:idRaza', getDogsById);
router.post('/dogs', dogPost);
router.get('/temperaments', getTemperaments)

module.exports = router;
