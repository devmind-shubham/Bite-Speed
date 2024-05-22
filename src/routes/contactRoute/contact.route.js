const express = require("express")
const { identifyController } = require("../../controllers/contact.controller")
const router = express.Router()

router.post('/identify', identifyController)

module.exports = router