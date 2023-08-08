const asyncHandler = require("express-async-handler");
const Favorite = require("../models/favoritesModel");
const Customer = require("../models/customerModel");
// Functions

// All the req/res part

// Function 1

//  @desc Get menu
//  @route GET /api/favorites
//  @access Private

const getCustomerFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ customer: req.customer.id }); // Protect middleware provides us the req.user everywhere    // We are sending the token in our reqs to authorize the user using the protect middleware
  // for each place_id
  // Store all the values in database

  // Changes user to admin so the middleware auth0orizes admin and stores the data in admin variable.

  res.status(200).json(favorites);
});

//  @desc Get menu
//  @route GET /api/favorites
//  @access Private

const getRestaurantFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ place_id: req.restaurant.place_id }); // Protect middleware provides us the req.user everywhere    // We are sending the token in our reqs to authorize the user using the protect middleware
  // for each place_id
  // Store all the values in database

  // Changes user to admin so the middleware auth0orizes admin and stores the data in admin variable.

  res.status(200).json(favorites);
});

//  @desc Create menu
//  @route POST /api/menu
//  @access Private
const addCustomerFavorites = asyncHandler(async (req, res) => {
  // We can deal with body here
  if (!req.body.place_id) {
    // place_id is the key we are expecting from our defined case.
    res.status(400);
    throw new Error("Please include the place_id field"); // This now shows on postman in the form of JSOn , rather than sending a html error file in default
  }

  const place_id = req.body.place_id;
  const favouriteExists = await Favorite.findOne({
    place_id,
  });
  if (favouriteExists) {
    // get the user
    const customer = await Customer.findById(req.customer.id);

    // check for user
    if (!customer) {
      res.status(401); // not authorised
      throw new Error("User not found");
    }
    console.log(favouriteExists.customer.toString());
    console.log(customer.id);
    // Check that the logged in user is the goal user
    if (favouriteExists.customer.toString() !== customer.id) {
      // favorite.user is of type id and in object form so we convert it to string type
      res.status(401); // not authorized
      throw new Error("User not authorized");
    }

    await Favorite.findOneAndDelete({ place_id });

    res.status(200).json({
      message: `Removed the favorite`,
    });
  } else {
    const favorite = await Favorite.create({
      place_id: req.body.place_id,
      customer: req.customer.id,
      // put fields here and store them
    });
    // console.log(req.body)
    res.status(200).json(favorite);
  }
});

//  @desc Update menu
//  @route PUT /api/menu/:id
//  @access Private
const updateFavorites = asyncHandler(async (req, res) => {
  // We need a id to update that particular item only/data only
  // get the favorite -> need to update
  const favorite = await Favorite.findById(req.params.id); // Since we are passing the dummy id in the url, hence req.params.id

  if (!favorite) {
    res.status(400); // not found
    throw new Error("Favorite not found");
  }

  // get the user
  const customer = await Customer.findById(req.customer.id);

  // check for user
  if (!customer) {
    res.status(401); // not authorised
    throw new Error("User not found");
  }

  // Check that the logged in user is the goal user
  if (favorite.customer.toString() !== customer.id) {
    // favorite.user is of type id and in object form so we convert it to string type
    res.status(401); // not authorized
    throw new Error("User not authorized");
  }

  const updatedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      // req.body is the updated data, we find the element by params.id and then update the content.
      new: true, // this will create it if doesn't exist
    }
  );

  res.status(200).json(updatedFavorite); // backticks, so as to include the variables (Javascript)
});

//  @desc Delete menu
//  @route  DELETE /api/menu/:id
//  @access Private
const deleteCustomerFavorites = asyncHandler(async (req, res) => {
  // get the favorite -> need to delete
  const favorite = await Favorite.findById(req.params.id); // Since we are passing the dummy id in the url, hence req.params.id

  if (!favorite) {
    res.status(400); // not found
    throw new Error("Favorite not found");
  }

  // get the user
  const customer = await Customer.findById(req.customer.id);

  // check for user
  if (!customer) {
    res.status(401); // not authorised
    throw new Error("User not found");
  }

  // Check that the logged in user is the goal user
  if (favorite.customer.toString() !== customer.id) {
    // favorite.user is of type id and in object form so we convert it to string type
    res.status(401); // not authorized
    throw new Error("User not authorized");
  }

  await Favorite.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: `Removed the favorite : ${req.params.id}`,
  });
});

// Export the functions

module.exports = {
  getCustomerFavorites,
  addCustomerFavorites,
  updateFavorites,
  deleteCustomerFavorites,
  getRestaurantFavorites,
};
