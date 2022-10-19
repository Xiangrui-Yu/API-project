const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();

const {Op} = require('sequelize');


const sequelize = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');
const { DATEONLY } = require('sequelize');


//### Get all of the Current User's Bookings




router.get('/current',requireAuth, async(req,res,next) => {
    const userId = req.user.id

    const currentBooking = await Booking.findAll({
        where:{
            userId:userId
        },
        
        include:[
            {
                model:Spot,
                attributes:{
                    exclude:['description','createdAt','updatedAt'],
                
                },
                include:{
                    model:SpotImage
                }
            }
           
        ]
    })
    console.log(currentBooking)
    const currentBookingPojo = []

    currentBooking.forEach(booking => {
        currentBookingPojo.push(booking.toJSON())
    });


    
    currentBookingPojo.forEach(booking => {
        if(booking.Spot.SpotImages.length > 0){
            if(booking.Spot.SpotImages[0].preview){
                booking.Spot.previewImage = booking.Spot.SpotImages[0].url
            }else{
                booking.Spot.previewImage = 'no preview Image'
            }
        }else{
            booking.Spot.previewImage = 'no preview Image'
        }

        delete booking.Spot.SpotImages
    })



    res.json({
        Bookings:currentBookingPojo
    })
})



//### Edit a Booking

router.put('/:bookingId',requireAuth, async(req,res,next) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const {startDate,endDate} = req.body;

    const theBooking = await Booking.findByPk(bookingId);

    if(!theBooking){
        res.status(404)
        return res.json(   {
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    if(theBooking.userId !== userId){
        res.status(403);
        res.json(  {
            "message": "Forbidden",
            "statusCode": 403
          })
    }

    if(endDate < startDate){
        res.status(400)

        return res.json( {
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }


    

    let today = new Date().toString();
    console.log(today)

    if(today < endDate){
        res.status(403)
        return res.json( {
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }

    const checkBooking = await Booking.findAll({
        where:{
            [Op.or]:[
                {startDate:startDate},
                {endDate:endDate}
            ]
        }
    })    

    

    if(checkBooking.length >0){
        res.status(403);
        return res.json(   {
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          })
    }

    theBooking.set({
        startDate:startDate,
        endDate:endDate
    }),


    res.json(theBooking)

})










module.exports = router;