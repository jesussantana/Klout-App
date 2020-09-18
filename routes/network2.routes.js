const express = require('express')
const reportRoutes = express.Router()
const uploader = require('../configs/cloudinaryconfig')
const User = require('../models/usermodel')
const Report = require('../models/report.model')
const {transporter, offerSend, offerMade, offerDelete, offerWarning} = require('../configs/nodemailer-config');

// reportS ROUTE
reportRoutes.get('/', async(req, res, next) => {
    // Return all the reports in the database
    try {
        const report = await Report
            .find()
            .populate('user');

        if (report.length < 0) {
            res
                .status(404)
                .json({message: "There are no report available at the moment"})
            return
        }

        res
            .status(200)
            .json(reports)
    } catch (error) {
        res
            .status(500)
            .json({message: "Error when trying to retrieve all the report available"})
        next(error)
    }
})

// SPECIFIC report ROUTE
reportRoutes.get('/:id', async(req, res, next) => {
    // Return the report with the id sent as a parameter on the URL
    try {
        const report = await report
            .findOne({_id: req.params.id})
            .populate("user")

        if (report === {}) {
            res
                .status(500)
                .json({message: 'Error while trying to retrieve the report information'})
            return
        }

        res
            .status(200)
            .json(report)
    } catch (error) {
        res
            .status(500)
            .json({message: 'Error while trying to retrieve the report information'})
        next(error)
    }
})

// ADD report ROUTE
reportRoutes.post('/add', uploader.array('images'), async(req, res, next) => {
    // Putting the paths of the images inside an array
    const images = []
    if (req.files) {
        const files = req.files
        for (let i = 0; i < files.length; i++) {
            images.push(files[i].path)
        }
    }

    // Checking if the body of the images is empty and pushing a default picture if
    // it is
    if (req.body.images == []) {
        images.push('https://res.cloudinary.com/agustems/image/upload/v1598881434/roomer/no-image_klm' +
                'dah.png')
    }

    // Saving the required data into variables
    const user = req.body.user
    const facebook = req.body.facebook
    const twitter = req.body.twitter
    const instagram = req.body.instagram
    const linkedin = req.body.linkedin
   

    // Sending feedback if the required data is missing
    if (user === '' || facebook === '' || twitter === '' || instagram === '' || linkedin === '') {
        res
            .status(400)
            .json({message: 'Please, provide all the required information'})
        return
    }

    

  

    // Creation of the new report
    const newreport= new report({
        user: user,
        facebook: facebook,
        twitter: location,
        instagram: instagram,
        linkedin: linkedin,
      
    })

    // Saving the new report into the database
    await newreport.save(err => {
        if (err) {
            console.log(err)
            res
                .status(500)
                .json({message: 'Something went wrong while saving the report into de database'})
            return;
        }

        // Sending the room information to the frontend
        res
            .status(200)
            .json(newreport)
    })

    // Updating the user information of the rooms array
    try {
        // Find the reports that the user has created the room
        const findreports = await reportfind({user: user})
        const reportIds = []
        findreports.map(item => reportIds.push(item._id))

        // Updating the user with the new info
        const updateUser = await User.findOneAndUpdate({
            _id: user
        }, {
            adverts: reportIds
        }, {new: true})
    } catch (err) {
        res
            .status(500)
            .json({message: "Error while updating the user's information"})
        next(error)
    }
})

// PATCH report ROUTE
reportRoutes.patch('/:id', async(req, res, next) => {
    const userId = req.body.userId
    

    const user = await User.findOne({_id: userId})

    try {
        

        const updateUser = await User.findOneAndUpdate({
            _id: userId
        }, 

        res
            .status(200)
            .json(updateUser)
    } catch (error) {
        res
            .status(500)
            .json({message: "Error while updating the favourites information"})
        next(error)
    }

})

// UPDATE report ROUTE
reportRoutes.put('/:id/edit', uploader.array("images"), async(req, res, next) => {
    // Checking if more images have been sent and adding the new ones
    let images = JSON.parse(req.body.oldImages)

    if (req.files) {
        if (images[0] === 'https://res.cloudinary.com/agustems/image/upload/v1598881434/reporter/no-image_klm' +
                'dah.png') {
            images = []
        }
        const files = req.files
        for (let i = 0; i < files.length; i++) {
            images.push(files[i].path)
        }
    }

    // Saving the required data into variables
    const updateData = req.body
    const facebook = req.body.facebook
    const twitter = req.body.twitter
    const instagram = req.body.instagram
    const linkedin = req.body.linkedin
  

   

    //Checking if the required data has been sent
    if (facebook === '' || twiiter === '' || instagram === '' || linkein === ''{
        res
            .status(400)
            .json({message: 'Please, provide all the required information'})
        return
    }


    // Finding the report and updating it with the information sent
    try {
        const updatereport = await report.findOneAndUpdate({
            _id: req.params.id
        }, updateData, {new: true})
        res
            .status(200)
            .json(updatereport)
    } catch (error) {
        res
            .status(500)
            .json({message: "Error while updating the report's information"})
        next(error)
    }
})

// DELETE report ROUTE
reportRoutes.delete('/:id/delete', (req, res, next) => {
    report.findOneAndDelete({
        _id: req.params.id
    }, (err, docs) => {
        if (err) {
            res
                .status(500)
                .json({message: "Error while trying to delete the report"})
            return
        } else {
            res
                .status(200)
                .json({message: "The following report has been errased: ", docs})
        }
    }, {new: true})
})

// SEARCH FOR ALL THE reportS THAT AN SPECIFIC USER POSTED
reportRoutes.get('/userAds/:id', async(req, res, next) => {
    try {
        const findAds = await report
            .find({user: req.params.id})
            .populate("user")
            .populate({
                path: "offers",
                populate: {
                    path: "offeror"
                }
            })

        res
            .status(200)
            .json(findAds)
    } catch (error) {
        res
            .status(500)
            .json({message: 'Error while trying to retrieve the ads information'})
    }
})

// SEARCH FOR THE OFFERS THAT AN SPECIFIC USER MADE
reportRoutes.get('/userOffers/:id', async(req, res, next) => {
    try {
        const findOffers = await report
            .find({"offers.offeror": req.params.id})
            .populate("user")

        res
            .status(200)
            .json(findOffers)
    } catch (error) {
        res
            .status(500)
            .json({message: 'Error while trying to retrieve the offers information'})
        next(error)
    }
})

// POST AN OFFER AND SEND AN EMAIL
reportRoutes.put('/:id/newOffer', async(req, res, next) => {
    try {
        // Save the required data into variables and checking if it's correct
        const offerorData = req.body.userId
        const offerorMessage = req.body.message

        if (offerorData === '' || offerorMessage === '') {
            res
                .status(400)
                .json({message: 'Please, provide all the required information'})
            return
        }

        // Save the data for the offer (userId and message)
        const newOffer = {
            offeror: offerorData,
            message: offerorMessage
        }

        // Find the offeror data
        const offeror = await User.findOne({_id: req.body.userId})

        // Find the advertised report data push the offer
        const report = await report
            .findOne({_id: req.params.id})
            .populate("user")
            

        // Check if the user has already made an offer
        let offerIndex = -1;

        for (let i = 0; i < report.offers.length; i++) {
            if (report.offers[i].offeror == req.body.userId) {
                offerIndex = i
            }
        }

        if (offerIndex === -1) {
            report
                .offers
                .push(newOffer)
        } else {
            res
                .status(400)
                .json({message: 'You already posted an offer for this advert'})
            return
        }

        // Update the report array of offers
        const reportUpdate = await report.findOneAndUpdate({
            _id: req.params.id
        }, report, {new: true}).populate("user")

        // Send email to the report user
        const mailR = await transporter.sendMail({
            from: process.env.GMAIL_ACCOUNT,
            to: report.user.email,
            subject: "Someone is interested in your report!",
            html: offerSend(offeror, report, req.body.message)
        }, (error, info) => error
            ? console.log(error)
            : console.log('Email sent: ' + info.response))

        // Send email to the offeror to have the data
        const mailO = await transporter.sendMail({
            from: process.env.GMAIL_ACCOUNT.email,
            to: offeror.email,
            subject: "You sent an offer for a report!",
            html: offerMade(offeror, report, req.body.message)
        }, (error, info) => error
            ? console.log(error)
            : console.log('Email sent: ' + info.response))

        // Send the updated data to the frontend
        res
            .status(200)
            .json(reportUpdate)
    } catch (error) {
        res
            .status(500)
            .json({message: 'Error while trying to post the offer'})
        next(error)
    }
})

// ERRASE-REMOVE AN OFFER MADE
reportRoutes.put('/:id/deleteOffer', async(req, res, next) => {
    try {
        // Search for the report that the user did the offer
        const report = await report
            .findOne({_id: req.params.id})
            .populate("user")

        // Search for the user that wants to retrieve the offer
        const user = await User.findOne({_id: req.body.userId})

        // Search for the index of the offer that the user did
        let offerIndex = -1;

        for (let i = 0; i < report.offers.length; i++) {
            if (report.offers[i].offeror == req.body.userId) {
                offerIndex = i
            }
        }

        // Sent an error if the user's offer was not found
        if (offerIndex === -1) {
            res
                .status(400)
                .json({message: "The report offer was not found"})
            return
        }

        // Take out the offer from the offers array
        report
            .offers
            .splice(offerIndex, 1)

        // Update the report with the new array
        const reportUpdate = await report.findByIdAndUpdate({
            _id: req.params.id
        }, report, {new: true}).populate("user")

        // Send an email to the advertiser warning him
        const mailAD = await transporter.sendMail({
            from: process.env.GMAIL_ACCOUNT,
            to: report.user.email,
            subject: "The offer that you made was retrieved",
            html: offerDelete(reportUpdate)
        }, (error, info) => error
            ? console.log(error)
            : console.log('Email sent: ' + info.response))

        // Send an email to the offeror warning him
        const mailOD = await transporter.sendMail({
            from: process.env.GMAIL_ACCOUNT,
            to: user.email,
            subject: "An offer to your advert was retrieved",
            html: offerWarning(user, reportUpdate)
        }, (error, info) => error
            ? console.log(error)
            : console.log('Email sent: ' + info.response))

        //Send the updated data to the frontend
        res
            .status(200)
            .json(reportUpdate)

    } catch (error) {
        res
            .status(500)
            .json({message: 'Error while trying to remove the offer'})
        next(error)
    }
})

module.exports = reportRoutes