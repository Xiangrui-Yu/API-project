import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import { deleteSpot } from '../store/spot';

export const RemoveSpot = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    // if(spotId){
    //     history.push('/spots')
    // }

    return (
        <button 
            onClick = {() =>{
                dispatch(deleteSpot(spotId))
                history.push('/spots')
            } }
        >
            delete
        </button>
    )
}