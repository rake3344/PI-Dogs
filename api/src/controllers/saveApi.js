const { API_KEY } = process.env;
const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const { Dog, Temperament } = require('../db')
const axios = require('axios');


const saveApi = async () => {

    const info = await axios(url);
    const response = info.data
    const dataInfo = await response.map(dog => {
        let temperaments = [];
        let heightArr = [];
        let weightArr = [];

        if(dog.temperament) temperaments = dog.temperament.split(', ');
        if(dog.height.metric) heightArr = dog.height.metric.split(' - ');
        if(dog.weight.metric) weightArr = dog.weight.metric.split(' - ');

        return {
            id: dog.id,
            name: dog.name,
            height: heightArr,
            weight: weightArr,
            temperaments: temperaments,
            life_span: dog.life_span,
            image: dog.image.url,
        }
    })
    return dataInfo;
}

const getFromDB = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getDogsMixed = async () => {
    const dogsApi = await saveApi();
    const dogsDB = await getFromDB();
    const mixed = [...dogsApi, ...dogsDB];
    return mixed;
}

module.exports = {
    saveApi,
    getFromDB,
    getDogsMixed
}