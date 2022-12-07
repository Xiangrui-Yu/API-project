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

const addBooking = (booking) =>({
    type:ADD_BOOKING,
    booking,
    
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


export const getBookingId = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if(res.ok){
        const data = await res.json()
        console.log('thunk',data)
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
        const booking = await res.json();
        dispatch(addBooking(booking))
        return booking
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
                ...allBookings
                
            }
        case GET_BOOKINGS_ID:
            const bookings = {};
            console.log('action.data', action.data)
            action.data.Bookings.forEach(booking => {
                bookings[booking.id] = booking
            });

            return bookings

        case ADD_BOOKING:{
            const newState = {...state};
            // console.log('action.spotId', action.spotId)
            // console.log('action.data', action.data.startDate)
            newState[action.booking.id] = action.booking
            
   
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