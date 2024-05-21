const contactModel = require("../models/contact.model")
const connectionPool = require("../config/db.connection.pool")
const { getContactsByPrecedence, areContactsAvailable } = require("../utils/utility")

module.exports.identifyService = async (email, phoneNumber) => {
    try {
        const pool = await connectionPool.connect()
        const contacts = await contactModel.fetchContacts(pool, email, phoneNumber)
        if (contacts.length == 0) {
            await contactModel.insertContact(pool, email, phoneNumber)
        }
        const latestContacts = await contactModel.fetchContacts(pool, email, phoneNumber)
        const result = await Promise.all([
            getContactsByPrecedence(latestContacts, "primary"),
            getContactsByPrecedence(latestContacts, "secondary"),
            areContactsAvailable(latestContacts, email, phoneNumber)
        ])
        console.log(result[0])
        console.log(result[1])
        const { emailExist, phoneNumberExist } = result[2]
        if (emailExist && phoneNumberExist) {
            console.lo
        }
        pool.close()
        return {
            status: 200,
            data: contacts
        }
    } catch (error) {
        console.log("Error from identifyService")
        throw error
    }
}