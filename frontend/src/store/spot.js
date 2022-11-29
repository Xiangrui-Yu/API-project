
const LOAD_SPOTS = 'spot/load_spots';
const UPDATE_SPOTS = 'spot/update_spots';
const REMOVE_SPOTS = 'spot/remove_spots';
const ADD_SPOTS = 'spot/add_spots';

const load = (data) =>({
    type:LOAD_SPOTS,
    data
});


export const getAllSpots = () => async(dispatch) =>{
    const res = await fetch('/api/spots');
    
    if(res.ok){
        const data = await res.json();

        dispatch(load(data))
    }

}

const initialState = {};

export const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:{
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state
    }
}