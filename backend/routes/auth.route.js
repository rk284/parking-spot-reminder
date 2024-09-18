require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const router = express.Router();

//  Register API
router.post('/register', async (req,res) =>{
    try{
        const {username, password} = req.body;

        // if user already exists
        const userExists = await User.findOne({username});
        if(userExists){
           return res.send({error: 'Username Already Exists'});
        }

        const hashedpassword = await bcrypt.hash(password,10);
        const user = new User({username : username, password: hashedpassword});
        await user.save();
        return res.status(200).send({message : 'Registration Successfull!'});
    
    } catch(error){
        return res.send({error : 'Registration Failed!'});
    }
});


//  Login API
router.post('/login', async (req,res) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
          
           return res.send({error : 'Invalid Username'});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
           
           return res.send({error : 'Incorrect Password'});
        }
      
       req.session.userId = user._id;
       req.session.username = user.username;

       req.session.save();
 
      

      return res.status(200).send({message : 'Login Sucessfull', user: user._id});
    } catch(error){
       
       return res.send({error : 'Login Failed. Please try again later.'});
    
    }

});


//Logout API
router.post('/logout', (req,res) =>{
    try{ 
    req.session.destroy(err =>{
        if(err){
            return res.send({error : 'Logout Failed'});
        }
        return res.status(200).send({message : 'Logout Successfull!'});
    });
   } catch(error){
    console.log(error);
    return res.send({error : 'An error occured. Please try again later.'});
   }

});





// Middleware function
 const  authentication =  (req,res,next) => {
    try{
       
    if(req.session.userId){
        return next();
         }
    res.redirect('/login');
 } catch(error){
    console.log(error)
    return res.status(401).send({error : 'An error occured. Please try again later.'});
   }

};


module.exports = {
    router,
    authentication,
};

