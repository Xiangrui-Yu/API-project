import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getBookingId, deleteBooking } from '../store/booking';

export const BookingId = () => {
    const { spotId } = useParams();

    const bookingDataObj = useSelector(state => {
        return state?.booking
    })

    // const bookingId = useSelector(state => state?.booking)
    // console.log('booking id',bookingId)

    // console.log(bookingDataObj)

    const bookingData = Object.values(bookingDataObj)

    console.log(bookingData)


    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch(getBookingId(spotId))
    }, [dispatch])

    if (!bookingData) {
        return null
    }

    return (
        <div>
            {bookingData.map(booking => {
                return <>
                    <div>startDate: {booking.startDate}</div>
                    <div>endDate:  {booking.endDate}</div>
                    <button
                        style={{ fontSize: 16, color: 'red' }}
                        onClick={() => {
                            dispatch(deleteBooking(booking.id))
                        }}
                    >
                        delete reservation!

                    </button>
                </>
            })}
        </div>
    )
}