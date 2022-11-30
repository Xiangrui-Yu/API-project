import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../store/spot';


export const SpotsAll = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])



    const allSpots = useSelector(state => state.spot.Spots);
    console.log('this is allSpots', allSpots)

    // allSpots = Object.values(allSpots)
    // if(!allSpots){
    //     return null
    // }
    // const allSpotsArray = allSpots['Spots']
    // console.log('this is allspotsArray', allSpotsArray)

    if (!allSpots) {
        return null;
    }

    if(allSpots.length >0){
        return (
            <>
                <ul>
                    {allSpots.map(spot => {
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

}