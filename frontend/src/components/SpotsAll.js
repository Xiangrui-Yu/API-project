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
            <div>
                {allSpots && allSpots.map(spot => {
                    return <div className='all-spots-container' key={spot.id}>
                        <a href={`/spots/${spot.id}`}>
                            <img className='previewImage' src={spot.previewImage}></img>
                            <div className='all-spots-text-container'>
                                <div>
                                    <p>{spot.city},{spot.state}</p>
                                    <p>{spot.createdAt}</p>
                                    <p>${spot.price} night</p>

                                </div>
                                <div className='star-rating'>
                                    <i className="fa-regular fa-star"></i>
                                    <p>{spot.avgRating}</p>
                                </div>
                            </div>
                        </a>
                    </div>

                })}

            </div>
        </>
    )


}