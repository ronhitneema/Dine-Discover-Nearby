// const express = require('express')

// const router = express.Router()

// const {getFavorites, addFavorites, updateFavorites, deleteFavorites} = require('../controllers/favoritesController')

// router.route('/fav').get(getFavorites).post(addFavorites) // Chained the requests going to the same route

// router.route('fav/:id').put(updateFavorites).delete(deleteFavorites)

// module.exports = router // Will export this router const

const { Router } = require('express')
const express = require('express')
const { getCustomerFavorites, addCustomerFavorites, updateFavorites, deleteCustomerFavorites, getRestaurantFavorites} = require('../controllers/favoritesController')
const { protectCustomer } = require('../middleware/customerAuthMiddleware')
const { protectRestaurant } = require('../middleware/restaurantAuthMiddleware')

const router = express.Router()

// console.log("Here")
const {protect} = require('../middleware/adminAuthmiddleware')

// Make different api routes for customer favorites and restaurant favorites - Remains to be done


router.route('/').get(protectCustomer, getCustomerFavorites).post(protectCustomer, addCustomerFavorites)
router.route('/:id').put(protectCustomer, updateFavorites).delete(protectCustomer, deleteCustomerFavorites)

router.route('/restaurantFavorite').get(protectRestaurant, getRestaurantFavorites)

module.exports = router   