const contactModel = require("../models/contact.model")
const connectionPool = require("../config/db.connection.pool")
const { getContactsByPrecedence, areContactsAvailable, generateOutput } = require("../utils/utility")

module.exports.identifyService = async (email, phoneNumber) => {
    try {
        const pool = await connectionPool.connect()
        let primaryContacts, finalCotacts, response
        const contacts = await contactModel.fetchContacts(pool, email, phoneNumber)
        if (contacts.length == 0) {
            await contactModel.insertContact(pool, email, phoneNumber)
            primaryContacts = await contactModel.fetchPrimaryContacts(pool, email, phoneNumber)
            const primaryContactId = primaryContacts[0]?.id
            finalCotacts = await contactModel.fetchLinkedContacts(pool, primaryContactId)
            response = generateOutput(finalCotacts, primaryContactId)
            return {
                status: 200,
                data: response
            }
        }
        const result = await Promise.all([
            getContactsByPrecedence(contacts, "primary"),
            getContactsByPrecedence(contacts, "secondary")
        ])

        primaryContacts = result[0] ?? []
        const secondaryContacts = result[1] ?? []

        let idToLink = primaryContacts[0]?.id
        if (primaryContacts.length >= 2) {
            const primaryIds = primaryContacts.slice(1).map(item => item.id)
            console.log(primaryContacts.slice(1))
            await contactModel.updateContactAsSecondary(pool, primaryIds, idToLink)
        }
        else if (primaryContacts.length == 0 && secondaryContacts.length > 0) {
            idToLink = secondaryContacts[0]?.linkedId
            await contactModel.insertContact(pool, email, phoneNumber, "secondary", idToLink)
        }
        else {
            await contactModel.insertContact(pool, email, phoneNumber, "secondary", idToLink)
        }
        finalCotacts = await contactModel.fetchLinkedContacts(pool, idToLink)
        response = generateOutput(finalCotacts, idToLink)
        pool.close()
        return {
            contact: response
        }
    } catch (error) {
        console.log("Error from identifyService")
        throw error
    }
}