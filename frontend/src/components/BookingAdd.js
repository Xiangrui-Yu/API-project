import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addSpotBooking } from '../store/booking';
import { getSpotsId } from '../store/spot';

export const BookingAdd = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    

    const checkstate = useSelector(state => state.booking);



    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setError] = useState([]);
    const spotPreviewImage = useSelector(state =>state?.spot?.spotId?.previewImage);

    useEffect(()=>{
        if(spotId) dispatch(getSpotsId(spotId))
    },[spotId])

    // useEffect(() => {
    //     const validation = [];
    //     if(startDate.length === 0) validation.push('startDate field is required')
    //     if(endDate.length === 0) validation.push('endDate field is required')
    //     setError(validation)
    // },[startDate,endDate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate,
            endDate,
        }

        let createDates;

        createDates = await dispatch(addSpotBooking(payload, spotId,spotPreviewImage)).catch(async (res) => {
            setError([])
            const error = await res.json();
            if (error) setError([error])
            // console.log(error.errors)

        })
        console.log(errors)

        if (createDates) {
            history.push(`/user/bookings`)
        }
    }
    console.log(errors)
    return (
        <form
            className='BookingAdd-dateform'
            onSubmit={handleSubmit}
        >
            <div className='BookingAdd-error'>
                {errors?.map((error, idx) => <li key={idx}>{error.message}</li>)}

            </div>

            <label>
                startDate
                <input
                    type='date'
                    name='startDate'
                    onChange={e => setStartDate(e.target.value)}
                    value={startDate}
                    required
                />
            </label>
            <label>
                end Date
                <input
                    type='date'
                    name='endDate'
                    onChange={e => setEndDate(e.target.value)}
                    value={endDate}
                    required
                />
            </label>

            <button
                className='BookingAdd-button'
                type='submit'
                style={{ fontSize: !6 }}
            >
                book it!
            </button>

        </form>

    )

}