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

    console.log(address)

    const [addressnew, setAddress] = useState(address);
    const [citynew, setCity] = useState(city);
    const [statenew, setState] = useState(state);
    const [countrynew, setCountry] = useState(country);
    const [latnew, setLat] = useState(lat);
    const [lngnew, setLng] = useState(lng);
    const [namenew, setName] = useState(name);
    const [descriptionnew, setDescription] = useState(description);
    const [pricenew, setPrice] = useState(price);

    const [errors, setError] = useState([]);

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
            address:addressnew,
            city:citynew,
            state:statenew,
            country:countrynew,
            lat:latnew,
            lng:lngnew,
            name:namenew,
            description:descriptionnew,
            price:pricenew

        };

        let editNewSpot = await dispatch(editSpot(payload, spotId))

        if (editNewSpot) {
            history.push(`/user/spots`)
        }


    }
    return (
        <form
            className='spot-form'
            onSubmit={handleSubmit}
        >
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
                type='submit'
                disabled={errors.length > 0}
                style={{ fontSize: 16 }}
            >
                Submit
            </button>

        </form >
    )
}