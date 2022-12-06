import { csrfFetch } from './csrf';

const GET_BOOKINGS_CUR = 'booking/get_bookings'
const GET_BOOKINGS_ID='booking/get_bookings_id'
const ADD_BOOKING = 'booking/add'
const REMOVE_BOOKINGS ='booking/remove'


const loadBooking =(data) =>({
    type:GET_BOOKINGS_CUR,
    data
})

const loadBookingById = (data) => ({
    type:GET_BOOKINGS_ID,
    data
})

const addBooking = (data,spotId) =>({
    type:ADD_BOOKING,
    spotId,
    data
})

const removeBooking = (bookingId) => ({
    type:REMOVE_BOOKINGS,
    bookingId
})


export const getCurUserBooking =() => async(dispatch) =>{
    const res = await csrfFetch('/api/bookings/current')
    if(res.ok) {
        const data = await res.json();
        dispatch(loadBooking(data))
    }
}


export const getBookingId = (bookingId) => async dispatch => {
    const res = await fetch(`/api/spots/${bookingId}/bookings`);
    if(res.ok){
        const data = await res.json()
        dispatch(loadBookingById(data))
    }

}

export const addSpotBooking =(dateInfo,spotId) => async dispatch =>{
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dateInfo)
    });
    if(res.ok){
        const date = await res.json();
        dispatch(addBooking(date,spotId))
        return date
    }
}

export const deleteBooking = (bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method:'delete'
    })
    if(res.ok) {
        const {id: deletedBookingId} = await res.json();
        dispatch(removeBooking(deletedBookingId))
    }
}

const bookReducer = (state ={}, action) => {
    switch(action.type){
        case GET_BOOKINGS_CUR:
            const allBookings ={};
            action.data.Bookings.forEach(booking =>{
                allBookings[booking.id] = booking
            });

            return {
                ...allBookings,
                ...state
            }
        case GET_BOOKINGS_ID:
            const bookings = {};
            action.data.Bookings.forEach(booking => {
                bookings[booking.id] = booking
            });

            return {
                ...bookings,
                ...state
            }

        case ADD_BOOKING:{
            const newState = {...state};
            newState[action.spotId] = action.data;
            return newState
        }     

        case removeBooking:{
            const newState = {...state};
            delete newState [action.bookingId]
            return newState
        }

        default:
            return state
    }
}


export default bookReducer