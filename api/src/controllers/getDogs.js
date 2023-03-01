const axios = require('axios');

const getDogs = async (req, res) => {
    try {
        const response = await axios(`https://api.thedogapi.com/v1/breeds`);
        const data = response.data;
        const dogs = data.map(dog => {
            return {
                Nombre: dog.name
            }
        })
        res.status(200).json(dogs);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDogs;
