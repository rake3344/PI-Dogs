
const { getDogsMixed } = require('./saveApi');

const getDogsById = async (req, res) => {
    try {
        const { idRaza } = req.params;
        const dogs = await getDogsMixed();
        const dogsId = dogs.filter((dog) => dog.id === Number(idRaza));
        dogsId.length ? res.status(200).json(dogsId) : res.status(404).send("Dog not found")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getDogsById;