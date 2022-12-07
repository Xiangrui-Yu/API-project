import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getCurUserBooking, deleteBooking } from '../store/booking';

export const BookingCurUser = () => {
    const dispatch = useDispatch();

    const allBookingObj = useSelector(state => state?.booking)

    const allBookings = Object.values(allBookingObj);

    console.log(allBookingObj)

    useEffect(() => {
        dispatch(getCurUserBooking())
    }, [dispatch])

    if (!allBookings) {
        return null
    }

    return (
        <>
            {allBookings.map(booking => {
                return (
                    <div>
                        <div>
                            From: {booking.startDate}
                            To: {booking.endDate}
                        </div>
                        <img className='cur-user-bookings-img' key={booking.id} src={booking.Spot.previewImage}></img>

                        <button
                        style={{ fontSize: 16, color: 'red' }}
                        onClick={() => {
                            dispatch(deleteBooking(booking.id))
                        }}
                    >
                        delete reservation!

                    </button>
                    </div>
                )




            })}
        </>
    )
}