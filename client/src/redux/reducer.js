const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    dogDetail: [],
    dogsDb: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_DOGS":
            action.payload.forEach(dog => {
                if(!dog.temperaments[0]){
                    dog.temperaments[0] = "Unknown"
                }
            });
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        
        case "GET_TEMPERAMENTS":
            const temperaments = action.payload.filter(temperament => temperament.name !== "") // eliminar strings vacios
            return {
                ...state,
                temperaments: temperaments
            }
        
        case "FILTER_BY_TEMPERAMENT":
            const allDogs = state.allDogs;
            const dogsFilter = [];
            if(action.payload === "All") {
                return {
                    ...state,
                    dogs: allDogs
                }
            }
            else {
                for(let i = 0; i < allDogs.length; i++){
                    // const foundDog = allDogs[i].temperaments.find(temperament => temperament.name === action.payload);
                    const foundDog = allDogs[i].temperaments.includes(action.payload);
                    if(foundDog) dogsFilter.push(allDogs[i]);
                }
            }
            return {
                ...state,
                dogs: dogsFilter
            }

        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload
            }
        
        case "ORDER_BY_NAME":
            const orderedDogs = 
                action.payload === "A-Z" ? 
                    state.allDogs.sort((a,b) => {
                        return a.name.localeCompare(b.name);
                    })
                    :
                    state.allDogs.sort((a,b) => {
                        return b.name.localeCompare(a.name);
                    })
                return {
                    ...state,
                    dogs: orderedDogs
                }
        
        case "ORDER_BY_WEIGHT":
            const orderedWeight = 
                action.payload === "Min-Weight" ?
                    state.allDogs.sort((a,b) => {
                        return parseInt(a.weight[0]) - parseInt(b.weight[1]);
                    })
                    :
                    state.allDogs.sort((a,b) => {
                        return parseInt(b.weight[0]) - parseInt(a.weight[1]);
                    })
            return {
                ...state,
                dogs: orderedWeight
            }
        
        case "GET_DOGS_BY_ID":
            let details = action.payload;
            if(!details[0].temperaments[0]){
                details.temperaments[0] = "Unknown"
            }
            return {
                ...state,
                dogDetail: details
            }
        
        default:
            return state;
    }
}

export default rootReducer;