import axios from 'axios';
const url = "http://localhost:3001";

export function getDogs() {
    return async function (dipatch){
        const dogs = await axios.get(`${url}/dogs`);
        return dipatch({
            type: "GET_DOGS",
            payload: dogs.data
        });
    }
}

export function getTemperaments() {
    return async function(dispatch){
        const temperaments = await axios.get(`${url}/temperaments`);
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: temperaments.data
        })
    }
}

export function filterByTemperament(payload) {
    return {
        type: "FILTER_BY_TEMPERAMENT",
        payload
    }
}


export function getDogsByName(payload) {
    return async function(dispatch){
        try {
            const dogs = await axios.get(`${url}/dogs/${payload}`);
            return dispatch({
                type: "GET_DOGS_BY_NAME",
                payload: dogs.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}

export function getDogById(id){
    return async function(dispatch){
        try {
            const dog = await axios.get(`${url}/dogs/${id}`);
            return dispatch({
                type: "GET_DOGS_BY_ID",
                payload: dog.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export function postDog(payload){
    return async function(){
        const dogPost = await axios.post(`${url}/dogs`, payload);
        return dogPost;
    }
}