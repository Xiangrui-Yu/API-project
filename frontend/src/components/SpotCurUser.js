import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getCurUserSpot, deleteSpot } from '../store/spot';

export const SpotCurUser = () => {
    const dispatch = useDispatch();

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
        <div className='cur-user-spot-container'>

            {allSpots.map(spot => {
                return (
                    <>
                        <a href={`/spots/${spot.id}`}>

                            <img className='cur-spot-img' key={spot.id} src={spot.previewImage}></img>
                            <ul className='cur-Spot-info'>
                                <li key={spot.city}>city: {spot.city}</li>
                                <li key={spot.state}>state:  {spot.state}</li>
                                <li key={spot.country}>country: {spot.country}</li>
                                <li key={spot.price}>price: ${spot.price}</li>
                            </ul>
                        </a>
                        <div className='cur-spot-buttons'>
                            <button style={{ fontSize: 16, color: 'gray' }}
                                onClick={() => {
                                    dispatch(deleteSpot(spot.id))
                                    history.push('/user/spots')
                                }}
                            >
                                delete-spot
                            </button>
                            <NavLink style={{ color: 'grey', textDecoration: 'none' }} to={`/spots/${spot.id}/edit`}>edit-Spot</NavLink> -
                            <NavLink style={{ color: 'grey', textDecoration: 'none' }} to={`/spots/${spot.Id}/images`}>add images</NavLink>    -
                        </div>
                    </>
                )
            })}


        </div>
    )
}