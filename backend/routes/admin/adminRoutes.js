const express = require('express')

const router = express.Router()
const {getMe, registerAdmin, loginAdmin, getPendingResuests, approveRestaurant } = require('../../controllers/adminController')
const {protectAdmin } = require('../../middleware/adminAuthmiddleware')



router.post('/', registerAdmin) // Adding a user ==> registration
router.post('/login', loginAdmin) // authenticate a user ==> registration
router.get('/me',protectAdmin, getMe) // get a user data ==> registration // Added protect middleware, so before doing get me it will first verify the token using the protect function

// Show pending requests for restaurant approval

router.get('/pending', getPendingResuests)


// Approve restaurant   
// Admin approves the restaruant so that it can be shown in the restaurant list

router.put('/approve/:id', approveRestaurant)

// Disapprove restaurant
// router.put('/disapprove/:id', protectAdmin, disapproveRestaurant)   // Not needed for now
module.exports = router

