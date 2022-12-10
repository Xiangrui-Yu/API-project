import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { editSpot } from '../store/spot';

export const SpotEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()

    const body = useSelector(state => {
        console.log('state', state)
        return state?.spot[spotId]
    });

    // const body = Object.values(bodyObj)
    // console.log('body', body)

    const { address, city, state, country, lat, lng, name, description, price } = body


    const [addressnew, setAddress] = useState(address);
    const [citynew, setCity] = useState(city);
    const [statenew, setState] = useState(state);
    const [countrynew, setCountry] = useState(country);
    const [latnew, setLat] = useState(lat);
    const [lngnew, setLng] = useState(lng);
    const [namenew, setName] = useState(name);
    const [descriptionnew, setDescription] = useState(description);
    const [pricenew, setPrice] = useState(price);

    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address: addressnew,
            city: citynew,
            state: statenew,
            country: countrynew,
            lat: latnew,
            lng: lngnew,
            name: namenew,
            description: descriptionnew,
            price: pricenew

        };

        let editNewSpot = await dispatch(editSpot(payload, spotId)).catch(async (res) => {
            setErrors([])
            const error = await res.json();
            if (error) setErrors([error])
        })

        console.log(errors)

        if (editNewSpot) {
            history.push(`/user/spots`)
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
                    value={addressnew}
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
                    value={citynew}
                    required
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    name='state'
                    onChange={e => setState(e.target.value)}
                    value={statenew}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type='text'
                    name='country'
                    onChange={e => setCountry(e.target.value)}
                    value={countrynew}
                    required
                />
            </label>
            <label>
                Lat
                <input
                    type='number'
                    name='lat'
                    onChange={e => setLat(e.target.value)}
                    value={latnew}
                    required
                />
            </label>
            <label>
                Lng
                <input
                    type='number'
                    name='lng'
                    onChange={e => setLng(e.target.value)}
                    value={lngnew}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type='text'
                    name='name'
                    onChange={e => setName(e.target.value)}
                    value={namenew}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    name='description'
                    onChange={e => setDescription(e.target.value)}
                    value={descriptionnew}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type='number'
                    name='price'
                    onChange={e => setPrice(e.target.value)}
                    value={pricenew}
                    required
                />
            </label>
            <button
                className='SpotEdit-button'
                type='submit'
                disabled={errors.length > 0}
                style={{ fontSize: 16 }}
            >
                Submit
            </button>

        </form >
    )
}