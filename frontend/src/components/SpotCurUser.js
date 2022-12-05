import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getCurUserSpot } from '../store/spot';

export const SpotCurUser = () => {
    const dispatch = useDispatch();

    const allSpotsObj = useSelector(state => state?.spot)


    const allSpots = Object.values(allSpotsObj);

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
                return <>
                    <img className='cur-spot-img' key={spot.id} src={spot.previewImage}></img>
                    <ul className='cur-Spot-info'>
                        <li key={spot.id}>Id: {spot.id}</li>
                        <li key={spot.id}>city: {spot.city}</li>
                        <li key={spot.id}>state:  {spot.state}</li>
                        <li key={spot.id}>country: {spot.country}</li>
                        <li key={spot.id}>price: ${spot.price}</li>
                    </ul>
                </>
            })}


        </div>
    )
}