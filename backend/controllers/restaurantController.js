const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Restaruant = require("../models/restaurantModel");
const Admin = require("../models/adminModel");
const PendingRequest = require("../models/pendingRequestModel");
const PendingCall = require("../models/pendingCallsModel");
const Customer = require("../models/customerModel");
const { getFindPlaceFromText } = require("../services/api-requests");
const { default: axios } = require("axios");

//  @desc Register new users
//  @route Post /api/users
//  @access Public
const registerRestaurant = asyncHandler(async (req, res) => {
  const { name, address, username, phoneNumber, email, password } = req.body; // getting all the fields

  // Can make this more specific for each missing field
  if (!name || !email || !password || !username || !phoneNumber || !address) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // Check if user exists
  const restaurantExists = await Restaruant.findOne({ email }); // email is unique and could be used to check if user exists \\ username is also unique \\  could also use phone number
  if (restaurantExists) {
    res.status(400);
    throw new Error("Restaurant already exists");
  }

  // Hashing the password

  const salt = await bcrypt.genSalt(10); // to hash the pass
  const hashPassword = await bcrypt.hash(password, salt);
  let place_id = "123456789";
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  await axios.get(url).then((response) => {
    // console.log(response.data);
    data = response.data;
    // data["candidates"][0][
    //   "place_id"
    // ] = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquerykey=${process.env.GOOGLE_MAPS_API_KEY}`;
    console.log(data);
    place_id = data["candidates"][0]["place_id"];
  });

  console.log("outside axios", place_id);
  // Create user
  const restaurant = await Restaruant.create({
    name,
    email,
    address,
    username,
    password: hashPassword,
    role: "restaurant", // default role
    status: false, // default status
    phoneNumber,
    place_id,
  });

  if (restaurant) {
    console.log(restaurant);
    // account created so we will add it's id to the database in the pending list in admin model.
    const admin = await Admin.findOne({ username: "admin1" }); // will just return the one admin that we have, we will keep only one admin for now.
    // console.log(admin)
    // admin.pendingRestaurants.push(restaurant.name) // pushing the name of the restaurant to the pending list // We can change this to place_ID later.

    // adding to pending request schema
    console.log(restaurant._id);
    console.log(admin._id);
    const pendingRequest = await PendingRequest.create({
      // restaurantName: restaurant.name,
      restaurantID: restaurant._id,
      adminID: admin._id,
    });

    res.status(201).json({
      // everything is OK and we send the following values back
      _id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      token: generateToken(restaurant._id),
      username: restaurant.username,
      role: restaurant.role,
      phoneNumber: restaurant.phoneNumber,
      address: restaurant.address,
      status: restaurant.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
  // res.json({message: 'Register User' })
});

//  @desc Authenticate a user
//  @route Post /api/users/login
//  @access Public
const loginRestaruant = asyncHandler(async (req, res) => {
  // Check if the status if approved or not and then show the output accordingly.

  const { username, password } = req.body; // getting the information from the frontend

  // First verify that the user exists
  const restaurant = await Restaruant.findOne({ username }); // email is unique and could be used to check if user exists \\ username is also unique \\  could also use phone number

  // Comparing the passwords using their hashed values
  if (restaurant && (await bcrypt.compare(password, restaurant.password))) {
    // sending back the following fields after login successful

    // Check if the status is approved or not
    if (restaurant.status === false) {
      res.status(400);
      throw new Error("Your account is not approved yet");
    } else {
      res.json({
        _id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        token: generateToken(restaurant._id),
        username: restaurant.username,
        role: restaurant.role,
        phoneNumber: restaurant.phoneNumber,
        address: restaurant.address,
        status: restaurant.status,
      });
    }
  } else {
    // Password incorrect or customer not found or some other error
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  // res.json({message: 'Login User' })
});

//  @desc Get user data
//  @route Get /api/users/me
//  @access Public
const getPendingCalls = asyncHandler(async (req, res) => {
  const restaurantIDs = await PendingCall.collection.distinct("restaurantID");
  const customerIDs = await PendingCall.collection.distinct("customerID");

  const customers = await Customer.find({ _id: { $in: customerIDs } });

  const customerInfo = customers.map((customer) => {
    return {
      id: customer._id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
    };
  });

  res.status(200).json({
    restaurantIDs,
    customerInfo,
  });
});

const deletePendingCalls = asyncHandler(async (req, res) => {
  // Since we are getting the req.admin,  userid from our authMiddleware,we can use it here since it's redirecting us here.

  // we need to find the restaurant information from the id that  we get from the req and then update the restaurant model.
  const pendingCall = await PendingCall.findOne({ customerID: req.params.id }); // Since we are passing the id in the url, hence req.params.id
  console.log(req.params.id);
  console.log(pendingCall);

  if (pendingCall) {
    // const updatedPendingCall =  await PendingCall.findByIdAndDelete(pendingCall._id)  // Deleting the restaurant from the pending request model
    const updatedPendingCall = await PendingCall.findOneAndDelete({
      customerID: req.params.id,
    }); // Deleting the restaurant from the pending request model
    res.status(200).json(updatedPendingCall);
  } else {
    res.status(404);
    throw new Error("PendingCall not found");
  }

  // res.status(200).json({
  //     restaruantIDs,
  //     adminIDs,
  // })
  // res.json({message: 'Admin Data' })
});

const getMe = asyncHandler(async (req, res) => {
  // Since we are getting the req.user,  userid from our authMiddleware,we can use it here since it's redirecting us here.
  const { _id, name, email } = await Restaruant.findById(req.restaurant.id); // We can all fetch others fields

  res.status(200).json({
    id: _id,
    name, // if we want to show name:name, can just write name
    email,
  });
  // res.json({message: 'User Data' })
});

const updateMe = asyncHandler(async (req, res) => {
  // Since we are getting the req.user,  userid from our authMiddleware,we can use it here since it's redirecting us here.
  const { name, phoneNumber, address } = req.body; // getting the information from the frontend

  // const {_id, , email} = await Customer.findById(req.customer.id) // We can all fetch others fields

  const updatedRestaurant = await Restaruant.findByIdAndUpdate(
    req.restaurant.id,
    { name, phoneNumber, address },
    { new: true }
  );

  // update the fields
  res.status(200).json({
    id: updatedRestaurant._id,
    name: updatedRestaurant.name, // if we want to show name:name, can just write name
    email: updatedRestaurant.email,
    phoneNumber: updatedRestaurant.phoneNumber,
  });
  // res.json({message: 'User Data' })
});

// To generate a JWT token
const generateToken = (id) => {
  // Our token will be payload_id(userID) + secret + expireDuration
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerRestaurant,
  loginRestaruant,
  getMe,
  updateMe,
  getPendingCalls,
  deletePendingCalls,
};
