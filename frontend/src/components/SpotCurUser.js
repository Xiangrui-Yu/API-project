import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getCurUserSpot } from '../store/spot';

export const SpotCurUser = () =>{
    const dispatch = useDispatch();

    const allSpotsObj = useSelector(state =>state?.spot)


    const allSpots = Object.values(allSpotsObj);

    console.log('allSpots',allSpots)

    useEffect(()=>{
        dispatch(getCurUserSpot())
    },[dispatch]);

    if(!allSpots){
        return null
    }

    return (
        <div>
            {allSpots.map(spot =>{
                return <img key={spot.id} src={spot.previewImage}></img>
            })}
        </div>
    )
}