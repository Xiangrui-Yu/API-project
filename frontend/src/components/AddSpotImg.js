import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addNewImg } from '../store/spot';

export const AddSpotImg = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory()

    const Spot = useSelector(state => state?.spot);
    console.log("this is spot from addspotimage", Spot)

    const [url, setUrl] = useState('');
    const [errors,setError] = useState([])

    useEffect(()=>{
        const validation =[];
        if(url.length === 0) validation.push('url field is required');
        setError(validation)
    },[url]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            url,
            preview:true
        }
        
        let createImg;
        try{
            createImg =  await dispatch(addNewImg(payload,spotId));
        }catch(error){
            throw new Error('something is wrong of creating new Spot')
        }

        if(createImg){
            history.push(`/spots/${spotId}`)
        }
    }

    return (
        <form
            className='create-image'
            onSubmit={handleSubmit}
        >
            <h2>Create an Image to a Spot</h2>
            <label>
                url
                <input
                    type='text'
                    name='url'
                    onChange={e=>setUrl(e.target.value) }
                    value={url}
                />
            </label>

            <button
                type='submit'
                disabled={errors.length >0}
            >
                Create Img
            </button>
        </form>
    )








}