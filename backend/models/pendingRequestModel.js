const mongoose = require('mongoose')

// all the user-required fields
const pendingRequestSchema = mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'Please add a restaurant id'],
        unique: true,
        ref: 'Restaurant' // references our customer model,.
    },
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add an admin id'], // Can't be unique 
        ref: 'Admin' // references our Admin model,.
    }

    
    // I need to further add role, phone number here later
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('PendingRequest', pendingRequestSchema)