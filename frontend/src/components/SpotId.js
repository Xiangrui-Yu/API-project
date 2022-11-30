import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpotsId } from '../store/spot';

export const SpotId = () =>{
    const {spotId} = useParams();
    const spotData = useSelector(state => state.spot)
    console.log('this is spotData',spotData)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getSpotsId(spotId))
    },[dispatch])

    return null

}