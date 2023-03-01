// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

const axios = require('axios');
const { Dog } = require('../db');


const getDogsById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios(`https://api.thedogapi.com/v1/breeds/${id}`);
        const data = response.data;
        if(id){
            const dog = {
                Nombre: data.name,
                Altura: data.height.metric,
                Peso: data.weight.metric,
                Años_de_vida: data.life_span,
                Temperamento: data.temperament
            }

            const dogsDB = await Dog.findAll({
                where: {
                    Nombre: data.name
                }
            })

            res.status(200).json(dog);
            res.status(200).json(dogsDB);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDogsById;