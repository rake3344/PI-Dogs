// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

const axios = require('axios');
const { Temperament } = require('../db');

const getTemperaments = async(req,res) => {
    let arr = []
    try {
        const response = await axios("https://api.thedogapi.com/v1/breeds");
        const data = response.data;
        data.forEach(temper => {
            if(temper.temperament){
                arr.push(
                    temper.temperament.split(',')
                )
            }
        })
        arr = arr.concat().flat();
        arr = arr.filter((item, index) => {
            return arr.indexOf(item.trim()) === index;
        })
        const temp = Temperament.bulkCreate(arr.map(e => {
            return {
                Nombre: e
            }
        }))
        res.status(200).json(temp)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getTemperaments