const express = require("express")

const router = express.Router()

router.get('/identify', (req, res) => {
    res.status(200).send({ status: 200, message: "From contact route." })
})

module.exports = router