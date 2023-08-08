const mongoose = require('mongoose')

// all the user-required fields
const adminSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please add a name']
    },
    username: {
        type: String, 
        required: [true, 'Please add a username'],
        unique: true
    },
    email: {
        type: String, 
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Please add a password']
    },
    role: {
        type: String, 
        required: [true, 'Please add a role']   // default role will be send using the admin controller
    },
    pendingRestaurantApproval: {    // Will be added when a new restaurant is registered.
        type: String,   // I need to further add the restaurant id here later rather than just a string. Restaruant ID will be the PlaceID we get from the google place API. 
        required: [false] // by default, the pendingRestaurantApproval is null
    },
    
    // I need to further add role, phone number here later
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('Admin', adminSchema)