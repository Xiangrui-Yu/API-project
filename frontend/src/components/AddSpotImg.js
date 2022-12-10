import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addNewImg } from '../store/spot';

export const AddSpotImg = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log(spotId)
    const history = useHistory()

    const Spot = useSelector(state => state?.spot);
    console.log(Spot)

    const [url, setUrl] = useState('');
    const [errors, setError] = useState([])

    useEffect(() => {
        const validation = [];
        if (url.length === 0) validation.push('url field is required');
        setError(validation)
    }, [url]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            url,
            preview: true
        }

        let createImg;

        createImg = await dispatch(addNewImg(payload, spotId)).catch(async (res) => {
            setError([])
            const error = await res.json();
            console.log(error)
            if (error) setError([error])
        });


        if (createImg) {
            history.push(`/user/spots`)
        }
    }

    return (
        <form
            className='AddSpotImg-image'
            onSubmit={handleSubmit}
        >
            <div className='BookingAdd-error'>
                {errors?.map((error, idx) => <li key={idx}>{error.message}</li>)}
            </div>

            <h2 className='AddSpotImg-h2' >add an Image</h2>
            <label>
                url
                <input
                    type='text'
                    name='url'
                    onChange={e => setUrl(e.target.value)}
                    value={url}
                    required
                />
            </label>

            <button
                style={{ fontSize: 16, color: 'gray' }}
                className='AddSpotImg-submit'
                type='submit'
            // disabled={errors.length >0}
            >
                submit
            </button>
        </form>
    )








}