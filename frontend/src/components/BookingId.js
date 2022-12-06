import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getBookingId } from '../store/booking';

export const BookingId = () => {
    const { bookingId } = useParams();

    const bookingDataObj = useSelector(state => state?.booking)

    const bookingData = Object.values(bookingDataObj)


    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getBookingId(bookingId))
    }, [dispatch])

    if (!bookingData) {
        return null
    }

    return (
        <div>
            {bookingData.map(booking => {
                return <div>
                    <ul>
                        <li key={booking.id && booking.startDate}>{booking.startDate}</li>
                        <li key={booking.id && booking.endDate}>{booking.endDate}</li>

                    </ul>

                </div>
            })}
        </div>
    )
}