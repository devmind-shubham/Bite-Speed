const { identifyService } = require("../services/contact.service")

module.exports.identifyController = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body
        if (!email && !phoneNumber) {
            res.status(400).send(
                {
                    status: 400,
                    message: "Bad request."
                }
            )
        }

        const response = await identifyService(email, phoneNumber)
        res.status(200).send(response)

    } catch (error) {
        console.log("Error -> ", error)
        res.status(500).send(
            {
                status: 500,
                message: "Internal server error."
            }
        )
    }
}