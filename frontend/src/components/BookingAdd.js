import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addSpotBooking } from '../store/booking';

export const BookingAdd = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const checkstate = useSelector(state=>state.booking);

    console.log('check state', checkstate)


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setError] = useState([])

    useEffect(() => {
        const validation = [];
        if(startDate.length === 0) validation.push('startDate field is required')
        if(endDate.length === 0) validation.push('endDate field is required')
        setError(validation)
    },[startDate,endDate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate,
            endDate
         }

        let createDates;
        try {
            createDates = await dispatch(addSpotBooking(payload, spotId))
        } catch (error) {
            throw new Error('something is wrong with booking a date')
        }

        if (createDates) {
            history.push(`/spots/${spotId}`)
        }
    }

    return (
        <form
            className='date-form'
            onSubmit={handleSubmit}
        >
            <label>
                startDate
                <input
                    type='date'
                    name='startDate'
                    onChange={e => setStartDate(e.target.value)}
                    value={startDate}
                />
            </label>
            <label>
                endDate
                <input
                    type='date'
                    name='endDate'
                    onChange={e => setEndDate(e.target.value)}
                    value={endDate}
                />
            </label>

            <button
                type='submit'
                disabled={errors.length >0}
                style={{fontSize:!6}}
            
            >
                book it!
            </button>

        </form>

    )

}