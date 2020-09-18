const express = require('express')
const userRoutes = express.Router()
const User = require('../models/use.model')
const uploader = require('../configs/cloudinary.config')
const {transporter, goodbye} = require('../configs/nodemailer.config');

// GET CONCRET USER INFORMATION
userRoutes.get('/:id', async(req, res, next) => {
    // Return the user with the id sent as a parameter in the URL
    try {
        const user = await User
            .findOne({_id: req.params.id})
            .populate({
                path: "report",
                populate: {
                    path: "user"
                }
            })
           
        
        // Checking if there is the specified user in the database
        if(user.length === {}){
            res.
                status(404)
                .json({message: 'This user does not exist'})
            return
        }

        res
            .status(200)
            .json(user)
    } catch (error) {
        res
            .status(500)
            .json({message: 'Error while trying to retrieve the user information'})
        next(error)
    }
})

// UPDATE USERPROFILE ROUTE
userRoutes.put('/:id', uploader.single("imageUrl"), async(req, res, next) => {
    // Saving the required data into variables
    const updatedData = req.body
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    
    // Necessary transformation because of the new FormData in the frontend
    const socials = JSON.parse(req.body.socials)
    updatedData.socials = socials

    //Checking if the required data has been sent
    if (name === '' || surname === '' || email === '' ) {
        res
            .status(400)
            .json({message: 'Please, provide all the required information'})
        return
    }

    // Checking if the email has the required format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        res
            .status(400)
            .json({message: "The email has an incorrect format, please submit a valid email"})
            return;
    }

    // Checking if the socials are empty or have the required format (FACEBOOK)
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/
    if(updatedData.socials.facebook !== ''){
        if(!facebookRegex.test(updatedData.socials.facebook)){
            res
                .status(400)
                .json({message: "The facebook URL submited was incorrect. It must start with www.facebook.com/"})
                return;
        }
    }
    
    // Checking if the socials are empty or have the required format (TWITTER)
    const twitterRegex = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/
    if(updatedData.socials.twitter !== ''){
        if(!twitterRegex.test(socials.twitter)){
            res
                .status(400)
                .json({message: "The twitter URL submited was incorrect. It must start with www.twitter.com/"})
                return;
        }
    }
    
    // Checking if the socials are empty or have the required format (INSTAGRAM)
    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9(\.\?)?]/
    if(updatedData.socials.instagram !== ''){
        if(!instagramRegex.test(socials.instagram)){
            res
                .status(400)
                .json({message: "The instagram URL submited was incorrect. It must start with www.instagram.com/"})
                return;
        }
    }

    // Checking if the socials are empty or have the required format (INSTAGRAM)
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin.com\/[a-zA-Z0-9(\.\?)?]/
    if(updatedData.socials.linkedin !== ''){
        if(!linkedinRegex.test(socials.linkedin)){
            res
                .status(400)
                .json({message: "The linkedin URL submited was incorrect. It must start with www.linkedin.com/"})
                return;
        }
    }
    
    // Checking if an image has been sent and updating the image if there is
    if (req.file) {
        updatedData.imageUrl = req.file.path
    }

    // Finding the user and updating the data with the information sent
    try {
        const updateUser = await User.findOneAndUpdate({
            _id: req.params.id
        }, updatedData, {new: true})
        res
            .status(200)
            .json(updateUser)
    } catch (error) {
        res
            .status(500)
            .json({message: "Error while updating the user's information"})
        next(error)
    }
})

// DELETE USERPROFILE ROUTE
userRoutes.delete('/:id/delete', async(req, res, next) => {
    //Finding the user with the URL parameters and sending an goodbye email
    const user = await User.findOne({_id: req.params.id})
    const mailG = await transporter.sendMail({
        from: process.env.GMAIL_ACCOUNT,
        to: user.email,
        subject: "We are sad to see you go...",
        html: goodbye(user)
    }, (error, info) => error ? console.log(error) : console.log('Email sent: ' + info.response))
    
    // Finding the user with the URL parameters and errasing it from the DB
    const erraseUser = await User.findOneAndDelete({
        _id: req.params.id
    }, (err, docs) => {
        if (err) {
            res
                .status(500)
                .json({message: "Error while trying to delete the user"})
            return
        } else {
            res
                .status(200)
                .json({message: "The following user has been errased: ", docs})
            return
        }
    }, {new: true})
})

module.exports = userRoutes