// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;

const getTemperaments = async(req,res) => {
    try {
        const response = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const data = response.data;
        const temperaments = data.map(t => t.temperament);
        const temp = temperaments.toString().split(",");
        temp.forEach(tem => {
            const i = tem.trim();
            Temperament.findOrCreate({
                where: {
                    name: i
                }
            })
        });

        const allTemperaments = await Temperament.findAll();
        res.send(allTemperaments)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getTemperaments