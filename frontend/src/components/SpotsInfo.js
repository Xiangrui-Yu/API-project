import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import  { getAllSpots }  from '../store/spot';

export const SpotsInfo = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const spots = useSelector(state => {
        console.log('this is state',state)

        return state.spot});

    console.log('this is spots',spots)

    if (!spots) {
        return null;
    }

    return (
        <>
            <ul>
                {spots.map(spot => {
                    return <li key={spot.id}>{spot}</li>
                })}

            </ul>
        </>
    )
}