const express = require("express");
const { registerGJ } = require("../controllers/gJController");
const router = express.Router();



router.post("/register", registerGJ);

module.exports = router;