const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({

    // sser -> which created it? => foreign key 
    customer: {
        type: mongoose.Schema.Types.ObjectId, // Id type (Object)
        required: true,
        ref: 'Customer' // references our customer model,.
    },

    // Favorite url => need to think of fields properly
    place_id: { // We will be recognizing the place using it's id. Can change to something else ? 
        type: String, 
        required: [true, 'Please provide the id of the place'] 
    } ,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Favorite', favoriteSchema)