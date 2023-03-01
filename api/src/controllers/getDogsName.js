// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const { Dog } = require('../db');
const axios = require('axios');

const getDogsName = async (req, res) => {
    try {
        const { name } = req.query;
        const response = await axios(`https://api.thedogapi.com/v1/breeds`);
        const data = response.data;
        if(name){
            const dog = data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()).map(dog => {
                return {
                    Nombre: dog.name,
                    Altura: dog.height.metric,
                    Peso: dog.weight.metric,
                    Años_de_vida: dog.life_span,
                    Temperamento: dog.temperament
                }
            }))
            res.status(200).json(dog);
            const dogs = await Dog.findAll({
                where: {
                    Nombre: name
                }
            })
            res.status(200).json(dogs);
        } else {
            res.status(404).json({ message: 'No hay razas de perros que coincidan con el nombre ingresado' })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDogsName;