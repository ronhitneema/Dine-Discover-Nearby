const mongoose = require('mongoose')

// all the user-required fields
const pendingCallsModel = mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'Please add a restaurant id'],
        unique: true,
        ref: 'Restaurant' // references our customer model,.
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add an customer id'], 
        ref: 'Customer' 
    }
    
    // I need to further add role, phone number here later
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('PendingCall', pendingCallsModel)