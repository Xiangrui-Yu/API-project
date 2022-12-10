import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getCurUserSpot, deleteSpot } from '../store/spot';

export const SpotCurUser = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])


    const allSpotsObj = useSelector(state => state?.spot)


    const allSpots = Object.values(allSpotsObj);
    const history = useHistory();

    console.log('allSpots', allSpots)

    useEffect(() => {
        dispatch(getCurUserSpot())
    }, [dispatch]);

    if (!allSpots) {
        return null
    }

    return (
        <div className='SpotCurUser-container'>

            {allSpots.map((spot) => {
                return (
                    <>
                        <div className='BookingAdd-error'>
                            {errors?.map((error, idx) => <li key={idx}>{error.message}</li>)}

                        </div>

                        <a className='SpotCurUser-links' href={`/spots/${spot.id}`}>

                            <img className='SpotCurUser-img' key={spot.id} src={spot.previewImage}></img>
                            <ul className='SpotCurUser-info'>
                                <li key={spot.city}>city: {spot.city}</li>
                                <li key={spot.state}>state:  {spot.state}</li>
                                <li key={spot.country}>country: {spot.country}</li>
                                <li key={spot.price}>price: ${spot.price}</li>
                            </ul>
                        </a>
                        <div className='SpotCurUser-buttons'>
                            <button className='SpotCurUser-delete' style={{ fontSize: 16, color: 'gray' }}
                                onClick={() => {
                                    dispatch(deleteSpot(spot.id)).catch(async (res) => {
                                        setErrors([])
                                        const error = await res.json();
                                        console.log('this is error', error)
                                        if (error) setErrors([error])
                                    })

                                    history.push('/user/spots')
                                }}
                            >
                                delete-spot
                            </button>
                            <NavLink className='SpotCurUser-edit' style={{ color: 'grey', textDecoration: 'none' }} to={`/spots/${spot.id}/edit`}>edit-Spot</NavLink> 
                            <NavLink className='SpotCurUser-addImage' style={{ color: 'grey', textDecoration: 'none' }} to={`/spots/${spot.id}/images`}>add images</NavLink>    
                        </div>
                    </>
                )
            })}


        </div>
    )
}