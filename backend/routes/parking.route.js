const express = require('express');
const router = express.Router();
const ParkingSpot = require('../models/parking.model');
const auth = require('../routes/auth.route');


router.post('/save/spot',auth.authentication, async (req,res) => {
    const {location, notes, spotName} = req.body;
    const latitude = location.lat;
    const longitude = location.lng;
    const navigated = false;
    const user = req.session.userId;


    try{
        const newSpot = new ParkingSpot({
            spotName,
            latitude,
            longitude,
            notes,
            navigated,
            user,
        });

        await newSpot.save();
        res.status(200).send({message: 'Parking spot saved!'});
    } catch(error) {
        
        res.send({error: 'An error occured. Please try again later.'});
    }
});

router.get('/view/spot',auth.authentication, async (req,res) =>{
    const user = req.session.userId;
    try{
        const spot = await ParkingSpot.find({'user': user});
        return res.status(200).json({spot: spot});
    } catch(error){
        res.send({error: 'An error occured. Please try again later.'});
    }
});

router.put('/update/spot',auth.authentication, async (req,res) =>{
    try{
        await ParkingSpot.findOneAndUpdate({'user':req.session.userId});
        return res.status(200).json({message:'Spot Updated Successfully!'});
    } catch(error){
        res.send({error: 'An error occured. Please try again later.'});
        }
});

router.delete('/delete/spot/:id',auth.authentication, async (req,res) =>{
    const id = req.params.id
    try{
        await ParkingSpot.findOneAndDelete({'_id': id });
        return res.status(200).json({message:'Spot Deleted Successfully!'});
    } catch(error){
        res.send({error: 'An error occured. Please try again later.'});
        }
});


router.delete('/delete/all/spot',auth.authentication, async (req,res) =>{

    try{
        await ParkingSpot.findOneAndDelete({'user': req.session.userId });
        return res.status(200).json({success:true});
    } catch(error){
        res.send({error: 'An error occured. Please try again later.'});
        }
});

module.exports = router;