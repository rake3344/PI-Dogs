// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

const { Dog, Temperament } = require('../db');

const dogPost = async (req, res) => {

    try {
        const { name, min_height, max_height, min_weight, max_weight, temperaments, life_span, image } = req.body;

        const heightTotal = [];
        heightTotal.push(min_height, max_height);
        
        const weightTotal = [];
        weightTotal.push(min_weight, max_weight);

        const dog = await Dog.create({
            name: name,
            height: heightTotal,
            weight: weightTotal,
            life_span,
            image: image ? image : "https://img.freepik.com/vector-premium/adorable-perro-sentado-dibujos-animados_74769-13.jpg"
        })

        const tempAssociated = await Temperament.findAll({
            where: {
                name: temperaments
            }
        });

        dog.addTemperament(tempAssociated);

        res.status(200).send("Dog created succesfully!")
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = dogPost;