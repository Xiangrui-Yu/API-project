import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getSpotsId, deleteSpot } from '../store/spot';


export const SpotId = () => {
    const { spotId } = useParams();
    const spotData = useSelector(state => {
        // console.log('this is state',state)
        return state.spot
    })

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpotsId(spotId))
    }, [dispatch])

    if (!spotData) {
        return null
    }
    return (

        <div className='spot-detail-outmost-container'>

            <div className='spot-detail-name'>
                {spotData?.spot?.name}
            </div>
            <div className='rest-information'>
                <div>
                    <i className="fa-regular fa-star"></i>
                    {spotData?.spot?.avgStartRating}.

                    #{spotData?.spot?.numReviews}reviews
                </div>

                <div>
                    {spotData?.spot?.city},
                    {spotData?.spot?.state},
                    {spotData?.spot?.country}
                </div>

            </div>
            <div className='SpotID-image-grid'>
                <div className='firstImage-container'>
                    <img className='first-spotImage' key={spotData?.spot?.id} src={spotData?.spot?.SpotImages[0]?.url}></img>

                </div>

                <div className='spotImage-container'>
                    {spotData?.spot?.SpotImages.slice(1).map(image => {
                        return <img className='spotImage' key={image.id} src={image.url}></img>
                    })}
                </div>

            </div>

            <div className='spot-detail-owner'>
                <p>{spotData?.spot?.name} hosted by {spotData?.spot?.Owner?.firstName} {spotData?.spot?.Owner?.lastName}</p>

            </div>

            <div className='spot-detail-links'>


                <NavLink className='SpotId-makereservation' style={{ color: 'grey', textDecoration: 'none' }} to={`/spots/${spotId}/bookings/new`}>make a reservation !</NavLink> 
                <NavLink className='SpotId-checkreservation' style={{ color: 'grey', textDecoration: 'none' }} to={`/bookings/${spotId}`}>check current reservation !</NavLink>
            </div>



        </div>

    )

}