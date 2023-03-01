// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

const { Dog, Temperament } = require('../db');


const dogPost = async(req, res) => {
    const { Imagen, Nombre, Altura, Peso, Años_de_vida, Temperamento } = req.body;
    try {
        const dog = await Dog.findOrCreate({
            where: {
                Nombre: Nombre,
                Imagen: Imagen,
                Altura: Altura,
                Peso: Peso,
                Años_de_vida: Años_de_vida
            }
        });
        if(Temperamento){
            const te = Temperamento.split(',')
            te.map(async t => {
                try {
                    const temp = await Temperament.findOrCreate({
                        where: {
                            Nombre: t
                        }
                    });
                    dog.addTemperament(temp[0])
                } catch (error) {
                    res.status(400).json({error: error.message})
                }
            })
        }
        res.status(200).json(dog)
    } catch(error){
        res.status(400).json({error: error.message})
    }

    
}

module.exports = dogPost;