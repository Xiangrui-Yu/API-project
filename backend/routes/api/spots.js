const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');


// Get all Spots
router.get('/', async (req, res, next) => {

    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]

    });

    const newSpots = [];

    allSpots.forEach(ele => {

        newSpots.push(ele.toJSON())
    })

    newSpots.forEach(spot => {
        spot.avgRating = spot.Reviews[0].stars;
        spot.previewImage = spot.SpotImages[0].url;
        delete spot.Reviews;
        delete spot.SpotImages
    })

    res.json({
        Spot: newSpots


    })
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const currentUser = req.user.id;
    const theSpot = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],

        where: {
            ownerId: currentUser
        }
    })

    const newSpots = [];

    theSpot.forEach(ele => {

        newSpots.push(ele.toJSON())
    })

    newSpots.forEach(spot => {
        spot.avgRating = spot.Reviews[0].stars;
        spot.previewImage = spot.SpotImages[0].url;
        delete spot.Reviews;
        delete spot.SpotImages
    })



    res.json({
        Spots: newSpots
    })
})

// Get details of a Spot from an id


router.get('/:spotId', requireAuth, async (req, res, next) => {



    const allSpots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'spotId']
                }
            },
            {
                model: User, as: 'Owner',
                attributes: {
                    include: ['id', 'firstName', 'lastName'],
                    exclude: ['createdAt', 'updatedAt', 'username', 'email', 'hashedPassword']
                }
            }
        ]

    });

    if (!allSpots) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const newSpots = [allSpots.toJSON()];

    const reviewNum = newSpots[0].Reviews.length;

    let totalStars = 0;


    for (let i = 0; i < newSpots[0].Reviews.length; i++) {
        let cur = newSpots[0].Reviews[i].stars;
        totalStars += cur
    }

    newSpots[0].numReviews = reviewNum;
    newSpots[0].avgStartRating = totalStars / newSpots[0].Reviews.length

    delete newSpots[0].Reviews



    res.json(newSpots)
})



// Create a Spot

router.post('/', requireAuth, async (req, res, next) => {
    const { id, address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id

    try {
        const newSpot = await Spot.create({
            id,
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        res.json(newSpot)
    } catch (error) {
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }

})

// add an image based on the Spot's id

router.post('/:spotId/images',requireAuth,async(req,res,next)=>{
    const userId = req.user.id;

    

    const {url,preview} = req.body;

    const theSpot = await Spot.findByPk(req.params.spotId,{
        attributes:{
            exclude:['address','city','state','country','lat','lng','name','description','price','createdAt','updatedAt']
        },
        include:{
            model:SpotImage
        }
    })

    if(!theSpot){
        res.json(  {
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    };

    console.log('this is spotOwner', theSpot);

    if(theSpot.ownerId === userId){
        const newSpot = theSpot.toJSON()
        const newImage = await SpotImage.create({
            spotId:req.params.spotId,
            url,
            preview
        })
    
        newSpot.url = newImage.url;
        newSpot.preview = newImage.preview
        
        delete newSpot.SpotImages;
        // delete newSpot.ownerId
    
        res.json(newSpot)
    }else{
        throw new Error('not the owner')
    }


})
 

//Edit a Spot

router.put('/:spotId',requireAuth, async(req,res,next) =>{
    


})

module.exports = router;