import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addNewSpot, editSpot } from '../store/spot';



export const SpotBrowser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()


    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     const validation = [];
    //     if (address.length === 0) validation.push('address field is required')
    //     if (city.length === 0) validation.push('city field is required')
    //     if (state.length === 0) validation.push('state.length ===0')
    //     if (country.length === 0) validation.push('country field is required')
    //     if (lat.length === 0) validation.push('lat field is required')
    //     if (lng.length === 0) validation.push('lng field is required')
    //     if (name.length === 0) validation.push('name field is required')
    //     if (description.length === 0) validation.push('description field is required')
    //     if (price.length === 0) validation.push('price field is required')

    //     setError(validation)
    // }, [address, city, state, country, lat, lng, name, description, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price

        };

        let createNewSpot;

        createNewSpot = await dispatch(addNewSpot(payload)).catch(async (res) => {
            setErrors([])
            const error = await res.json();
            console.log(error)
            if (error) setErrors([error])
        });


        if (createNewSpot) {
            history.push('/user/spots')
        }


    }
    return (
        <form
            className='spot-form'
            onSubmit={handleSubmit}
        >
            <div className='BookingAdd-error'>
                {errors?.map((error, idx) => <li key={idx}>{error.message}</li>)}

            </div>
            <h2></h2>
            {/* <ul className='errors'>
                {errors.map(error => {
                    return <li key={error}>{error}</li>
                })}
            </ul> */}
            <label>
                Address
                <input
                    type='text'
                    name='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type='text'
                    name='city'
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    required
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    name='state'
                    onChange={e => setState(e.target.value)}
                    value={state}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type='text'
                    name='country'
                    onChange={e => setCountry(e.target.value)}
                    value={country}
                    required
                />
            </label>
            <label>
                Lat
                <input
                    type='number'
                    name='lat'
                    onChange={e => setLat(e.target.value)}
                    value={lat}
                    required
                />
            </label>
            <label>
                Lng
                <input
                    type='number'
                    name='lng'
                    onChange={e => setLng(e.target.value)}
                    value={lng}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type='text'
                    name='name'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    name='description'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type='number'
                    name='price'
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                    required
                />
            </label>
            <button
                className='SpotBroweer-submit'
                type='submit'
                // disabled={errors.length > 0}
                style={{ fontSize: 16 }}
            >
                Submit
            </button>

        </form >
    )
}

