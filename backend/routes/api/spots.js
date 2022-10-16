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


    for (let i = 0; i < newSpots.length; i++) {
        let totalStars = 0;
        let totalLength = 0;

        if (newSpots[i].Reviews.length) {

            newSpots[i].Reviews.forEach(review => {
                totalStars += review.stars;
                totalLength++

            })
            newSpots[i].avgRating = totalStars / totalLength
        } else {
            newSpots[i].avgRating = 'no review'
        }
        delete newSpots[i].Reviews

    }


    newSpots.forEach(spot => {

        if (spot.SpotImages.length) {
            if (spot.SpotImages[0].preview) {
                spot.previewImage = spot.SpotImages[0].url

            } else {
                spot.previewImage = 'no spotImage'

            }
        } else {
            spot.previewImage = 'no spotImage'
        }
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


    for (let i = 0; i < newSpots.length; i++) {
        let totalStars = 0;
        let totalLength = 0;

        if (newSpots[i].Reviews.length) {

            newSpots[i].Reviews.forEach(review => {
                totalStars += review.stars;
                totalLength++

            })
            newSpots[i].avgRating = totalStars / totalLength
        } else {
            newSpots[i].avgRating = 'no review'
        }
        delete newSpots[i].Reviews

    }


    newSpots.forEach(spot => {

        if (spot.SpotImages.length) {
            if (spot.SpotImages[0].preview) {
                spot.previewImage = spot.SpotImages[0].url

            } else {
                spot.previewImage = 'no spotImage'

            }
        } else {
            spot.previewImage = 'no spotImage'
        }
        delete spot.SpotImages
    })




    res.json({
        Spots: newSpots
    })
})

// Get details of a Spot from an id


router.get('/:spotId',  async (req, res, next) => {



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
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const newSpots = [allSpots.toJSON()];

    const reviewNum = newSpots[0].Reviews.length;

    let totalStars = 0;
    
    if(reviewNum){
        for (let i = 0; i < newSpots[0].Reviews.length; i++) {
            let cur = newSpots[0].Reviews[i].stars;
            totalStars += cur
        }
    
        newSpots[0].numReviews = reviewNum;
        newSpots[0].avgStartRating = totalStars / newSpots[0].Reviews.length
    }else{
        newSpots[0].numReviews = '0 review';
        newSpots[0].avgStartRating = 'no review yet'

    }

   

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
        res.status(400);
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

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const userId = req.user.id;



    const { url, preview } = req.body;

    const theSpot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            exclude: ['address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
        },
        include: {
            model: SpotImage
        }
    })

    if (!theSpot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    

    if (theSpot.ownerId === userId) {
        const newSpot = theSpot.toJSON()
        const newImage = await SpotImage.create({
            spotId: req.params.spotId,
            url,
            preview
        })

        newSpot.url = newImage.url;
        newSpot.preview = newImage.preview

        delete newSpot.SpotImages;
        delete newSpot.ownerId

        res.json(newSpot)
    } else {
        res.status(403);
        res.json( {
            "message": "Forbidden",
            "statusCode": 403
          })
    }


})


//Edit a Spot

router.put('/:spotId', requireAuth, async (req, res, next) => {

    const userId = req.user.id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const theSpot = await Spot.findByPk(req.params.spotId);

    if (!theSpot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (userId === theSpot.ownerId) {
        try {
            theSpot.set({
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price
            })

            await theSpot.save();

            res.json(theSpot)
        } catch (error) {
            res.status(400)
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
    } else {
        res.status(403);
        res.json(   {
            "message": "Forbidden",
            "statusCode": 403
          })
    }


})

//### Delete a Spot

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const theSpot = await Spot.findByPk(req.params.spotId)
    console.log(theSpot)
    if (!theSpot) {
        res.status(404),
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    }

    if (userId === theSpot.ownerId) {

        await theSpot.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.status(403);
        res.json(  {
            "message": "Forbidden",
            "statusCode": 403
          })
    }

})

module.exports = router;