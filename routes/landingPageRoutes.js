const express = require("express");
const { subscribeUser } = require("../controllers/landingPageControllers");

const router = express.Router();

//Landing Page Routes
router.post("/subscribe", subscribeUser); // Subscribe User



module.exports = router;