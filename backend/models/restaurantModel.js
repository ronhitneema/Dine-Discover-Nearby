const mongoose = require("mongoose");

// all the user-required fields
const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"], // default role will be send using the restaurant controller
    },
    phoneNumber: {
      // Test on fronted whether the input is in number or not.
      type: Number,
      required: [true, "Please add a phone number"],
    },
    status: {
      type: Boolean,
      required: [true, "Please add a status"], // by default, the status is false // true means the restaurant is approved and registered.
    },
    place_id: {
      type: String,
      unique: true,
      required: [false, "Please add a PlaceId"],
     // by default, the status is false // true means the restaurant is approved and registered.
    },
    // I need to further add role, phone number here later
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
