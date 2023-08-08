const express = require("express");

const router = express.Router();

const { getPlaceDetails } = require("../../controllers/homeController.js");

router.route("/:placeId").get(getPlaceDetails);

module.exports = router; // Will export this router const
