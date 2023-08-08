const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

// The token to check will be in the header of the request
const protectAdmin = asyncHandler(async (req, res, next) => {
    let token 

    // First we check if the req header has the authorization or not. If it has then is it in proper format or not?
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {   // The format for the token will => Bearer <token> , so we will use this info to get it.
        try {
            // get the token from header by splitting
            token = req.headers.authorization.split(' ')[1] // Will give array -> ['Bearer', token]

            //verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.admin = await Admin.findById(decoded.id).select('-password')  // Since we are signing the token using User ID => look in userController.js
            // Also we dont want the hashed password so we select everything except the password hence '-password 
            
            if (req.admin) {
                next();
            }
            else {
                res.status(401)
                throw new Error('Not Authroized')
            }
        
            } catch (error) {
                console.log(error)
                res.status(401) // 401 means not authorised
                throw new Error('Not Authroized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protectAdmin }