const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const PendingRequest = require('../models/pendingRequestModel')
const Restaurant = require('../models/restaurantModel')

//  @desc Register new users 
//  @route Post /api/users
//  @access Public
const registerAdmin = asyncHandler(async (req,res) => {
    const { name, email, password, username} = req.body // getting all the fields

    // Can make this more specific for each missing field
    if(!name || !email || !password || !username) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({email})
    if(adminExists) {
        res.status(400)
        throw new Error('Admin already exists')
    }

    // Hashing the password

    const salt = await bcrypt.genSalt(10) // to hash the pass
    const hashPassword = await bcrypt.hash(password, salt)

    // Create admin 
    const admin = await Admin.create({
        name,
        email,
        username,
        password: hashPassword,
        role: "admin",    // default role
        // Not sending any value for pendingRestaurantApproval since it's default value is false. It will be updated when a new restaurant is registered.
    })

    if(admin) {
        res.status(201).json({ // everything is OK and we send the following values back
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
            role: admin.role,
            username: admin.username,
        })
    } else {
        res.status(400)
        throw new Error('Invalid data') 
    }
    // res.json({message: 'Register Admin' })
})

//  @desc Authenticate a admin
//  @route Post /api/users/login
//  @access Public
const loginAdmin = asyncHandler(async (req,res) => {
    const {username, password} = req.body // getting the information from the admin

    // First verify that the admin exists
    const admin = await Admin.findOne({username})

    // Comparing the passwords using their hashed values 
    if(admin && (await bcrypt.compare(password, admin.password))) {
        // sending back the following fields after login successful
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
            role: admin.role,
            username: admin.username,
        })
    } else {
        // Password incorrect or admin not found or some other error
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    // res.json({message: 'Login Admin' })
})

//  @desc Get admin data
//  @route Get /api/users/me
//  @access Public
const getMe = asyncHandler(async (req,res) => {
    // Since we are getting the req.admin,  userid from our authMiddleware,we can use it here since it's redirecting us here.
    const {_id, name, email, username} = await Admin.findById(req.admin.id) // We can all fetch others fields 

    res.status(200).json({
        id: _id,
        name,   // if we want to show name:name, can just write name
        email,
        username,
    })
    // res.json({message: 'Admin Data' })
})


//  @desc Get pending requests data
//  @route Get /api/users/me
//  @access Public
const getPendingResuests = asyncHandler(async (req,res) => {
    const restaurantIDs = await PendingRequest.collection.distinct("restaurantID");
  const adminIDs = await PendingRequest.collection.distinct("adminID");

  const restaurants = await Restaurant.find({ _id: { $in: restaurantIDs } });

  const restaurantNames = restaurants.map((restaurant) => {
    return { id: restaurant._id, name: restaurant.name };
  });

  res.status(200).json({
    restaurantNames,
    adminIDs,
  });
})

//  @desc Get pending requests data
//  @route Get /api/users/me
//  @access Public
const approveRestaurant = asyncHandler(async (req,res) => {
    // Since we are getting the req.admin,  userid from our authMiddleware,we can use it here since it's redirecting us here.

    // we need to find the restaurant information from the id that  we get from the req and then update the restaurant model.
    const restaurant = await Restaurant.findById(req.params.id) // Since we are passing the id in the url, hence req.params.id


    if(restaurant) {
        restaurant.status = true
        const updatedRestaurant = await restaurant.save()
        // whhat does restaurant.save do? It saves the updated restaurant in the database. DOes it update the exisiting one or create a new one? It updates the existing one.


        // We also need to delete the restaurant from the pending request model
        const pendingRequest = await PendingRequest.findOne({restaurantID: req.params.id})
        console.log(pendingRequest)
        if(pendingRequest) {
            await PendingRequest.findByIdAndDelete(pendingRequest._id)  // Deleting the restaurant from the pending request model
        } else {
            res.status(404)
            throw new Error('Restaurant not found')
        }
        res.status(200).json(updatedRestaurant)
    } else {    // if the restaurant is not found
        res.status(404)
        throw new Error('Restaurant not found')
    }

    // res.status(200).json({
    //     restaruantIDs,
    //     adminIDs,
    // })
    // res.json({message: 'Admin Data' })
})




// To generate a JWT token 
const generateToken = (id) => { // Our token will be payload_id(userID) + secret + expireDuration
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d', 
    })
}


module.exports = {
    registerAdmin, loginAdmin, getMe, getPendingResuests, approveRestaurant
}