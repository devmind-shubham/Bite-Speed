const express = require("express")
const contactRoutes = require("./contactRoute/contact.route")

const router = express.Router()
router.use('/contacts', contactRoutes)

module.exports = router