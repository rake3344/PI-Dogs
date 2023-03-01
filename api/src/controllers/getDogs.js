const axios = require('axios');
const { getDogsMixed } = require('./saveApi')

// En esta ruta tambien va a servir para buscar por query

const getDogs = async (req, res) => {
    try {
        const { name } = req.query;
        const allDogs = await getDogsMixed();
        if(name){
            const dogs = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            dogs.length ? res.status(200).json(dogs) : res.status(404).send("Dog not found")
        } else {
            res.status(200).json(allDogs)
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDogs;
