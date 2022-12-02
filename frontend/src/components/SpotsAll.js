import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../store/spot';


export const SpotsAll = () => {
    const dispatch = useDispatch();

    const allSpotsObj = useSelector(state => {
        console.log('this is state', state)
        return state?.spot

    });

    const allSpots = Object.values(allSpotsObj)
    
    console.log('this is allSpots', allSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    if (!allSpots) {
        return null;
    }


        return (
            <>
                <ul>
                    {allSpots && allSpots.map(spot => {
                       return <div key={spot.id}>
                                <img className='previewImage' src={spot.previewImage}></img>
                                <p>{spot.city},{spot.state}</p>
                                <p>{spot.createdAt}</p>
                                <p>{spot.price}</p>
                            </div>
                    })}
    
                </ul>
            </>
        )
    

}