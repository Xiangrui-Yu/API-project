
const LOAD_SPOTS = 'spot/load_spots';
const LOAD_ID ='spot/load_spots';
const UPDATE_SPOTS = 'spot/update_spots';
const REMOVE_SPOTS = 'spot/remove_spots';
const ADD_SPOTS = 'spot/add_spots';

const load = (data) =>({
    type:LOAD_SPOTS,
    data
});

const loadId = (spotData) =>({
    type:LOAD_ID,
    spotData
});


export const getAllSpots = () => async(dispatch) =>{
    const res = await fetch('/api/spots');
    if(res.ok){
        const data = await res.json();
        dispatch(load(data))
    }

}

export const getSpotsId =(spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`);
    if(res.ok){
        const spotData = await res.json()
        dispatch(loadId(spotData))
    }
}


const spotReducer = (state = {}, action) => {
    let newState
    switch(action.type){
        case LOAD_SPOTS:
            // const allSpots = {};
            // console.log('this is action data', action.data)
            
            // action.data.Spots.forEach((spot) =>{
            //     allSpots[spot.id] = spot
            // });
            // return{
            //     ...allSpots,
            //     ...state
            // };

            return {
                ...action.data,
                ...state
            }
        case LOAD_ID:{
            newState = {...state};
            newState[action.spotData.id] = action.spotData;
            return newState
        }

        default:
            return state
    }
}

export default spotReducer