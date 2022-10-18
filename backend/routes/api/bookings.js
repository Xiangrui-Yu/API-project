const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();

const sequelize = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');


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














module.exports = router;