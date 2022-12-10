import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getCurUserBooking, deleteBooking } from '../store/booking';

export const BookingCurUser = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);


    const allBookingObj = useSelector(state => state?.booking)

    const allBookings = Object.values(allBookingObj);

    console.log('allBookingObj',allBookings)

    useEffect(() => {
        dispatch(getCurUserBooking())
    }, [dispatch])

    if (!allBookings) {
        return null
    }
    console.log('errors above return', errors)
    return (
        <>
            <div className='BookingCurUser-error'>
                {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
            </div>

            <div>
                {allBookings.map((booking) => {
                    return (
                        <div className='BookingCurUser-info'>
                            <div>
                                {booking.Spot.previewImage && <img className='cur-user-bookings-img' key={booking.id} src={booking.Spot.previewImage}></img>}
                            </div>



                            <div className='BookingCurUser-dates'>
                                <div className='BookingCurUser-checkin'>
                                    CHECK-IN: {booking.startDate}
                                </div>
                                <div className='BookingCurUser-checkout'>
                                    CHECKOUT: {booking.endDate}
                                </div>
                            </div>

                            <button
                                className='BookingCurUser-cancelButton'
                                style={{ fontSize: 16, color: 'red' }}
                                onClick={() => {
                                    setErrors([]);
                                    const errorRes = dispatch(deleteBooking(booking.id)).catch(async (res) => {
                                        const error = await res.json();
                                        if (error) setErrors([error.message])
                                    })
                                }}

                            >
                                cancel
                            </button>
                        </div>
                    )

                })}

            </div>

        </>
    )
}