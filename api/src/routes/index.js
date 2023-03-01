const { Router } = require('express');
const dogPost = require('../controllers/dogPost');
const getDogs = require('../controllers/getDogs');
const getDogsById = require('../controllers/getDogsById');
const getDogsName = require('../controllers/getDogsName');
const getTemperaments = require('../controllers/getTemperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogsById);
router.post('/dogs', dogPost);
router.get('/dogs', getDogsName)
router.get('/temperaments', getTemperaments)

module.exports = router;
