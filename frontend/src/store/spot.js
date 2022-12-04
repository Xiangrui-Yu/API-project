import { csrfFetch } from './csrf';
const LOAD_SPOTS = 'spot/load_spots';
const LOAD_ID = 'spot/load_spot_id';
const LOAD_SPOTS_CUR = 'spot/load_current';
const UPDATE_SPOTS = 'spot/update_spots';
const REMOVE_SPOTS = 'spot/remove_spots';
const ADD_SPOTS = 'spot/add_spots';
const ADD_IMG = 'spot/add_images';


const load = (data) => ({
    type: LOAD_SPOTS,
    data
});

const loadCurSpot = (curData) => ({
    type: LOAD_SPOTS_CUR,
    curData
});

const loadId = (spotData) => ({
    type: LOAD_ID,
    spotData
});

const addSpot = (spot) => ({
    type: ADD_SPOTS,
    spot
})
const addImg = (image) => ({
    type: ADD_IMG,
    image,
});
const updateSpot = (spot ) =>({
    type:UPDATE_SPOTS,
    spot
})

const removeSpot = (spotId) => ({
    type:REMOVE_SPOTS,
    spotId
})


export const getAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    if (res.ok) {
        const data = await res.json();
        dispatch(load(data))
    }

}

export const getCurUserSpot = () => async (dispatch) => {
    const res = await fetch('/api/spots/current');
    if (res.ok) {
        const curData = await res.json();
        dispatch(loadCurSpot(curData))
    }
}

export const getSpotsId = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spotData = await res.json()
        dispatch(loadId(spotData))
    }
}

export const addNewSpot = (spotData) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData)
    })

    if(res.ok){
        const spot = await res.json();
        dispatch(addSpot(spot))
        return spot
    }
}

export const addNewImg = (image,spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`,{
        method:'post',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(image)
    });

    if(res.ok){
        const image = await res.json();
        dispatch(addImg(image));
        return image
    };

}

export const editSpot = (editData,editId) => async dispatch =>{
    const res = await csrfFetch(`/api/spots/${editId}`,{
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(editData)
    });

    if(res.ok){
        const updateData = await res.json();
        dispatch(updateSpot(updateData));
        return updateData
    }

}

export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method:'delete'
    });
    if(res.ok) {
        const {id:deletedSpotId} = await res.json();
        dispatch(removeSpot(deletedSpotId));
        
    }
}


const spotReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            console.log('this is action data', action.data)

            action.data.Spots.forEach((spot) => {
                allSpots[spot.id] = spot
            });
            return {
                ...allSpots,
                ...state
            };

        case LOAD_ID: {
            const newState = { ...state };
            newState.spot = action.spotData;
            return newState;
        };
        case LOAD_SPOTS_CUR: {
            const spots = {};
            action.curData.Spots.forEach(spot => {
                spots[spot.id] = spot
            });
            return {
                ...spots,
                ...state
            }
        }
        case UPDATE_SPOTS:
        case ADD_SPOTS:{
            const newState = {...state};
            newState[action.spot.id] = action.spot;
            return newState
        };

        case ADD_IMG:{

            // console.log("this is triggered")
            const newState = {...state};
            // console.log('this is action.spot',action.spotId)
            // console.log('this is action.image', action.image)

            newState[action.image.id] = action.image;
            return newState
        }
        case removeSpot:{
            const newState = {...state};
            delete newState[action.spotId];
            return newState
        }

        default:
            return state
    }
}

export default spotReducer