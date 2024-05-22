module.exports.getContactsByPrecedence = (contacts, precedence) => {
    try {
        return contacts.filter(contact => contact.linkPrecedence === precedence && contact.deletedAt === null);
    } catch (error) {
        throw error
    }
}

module.exports.areContactsAvailable = (contacts, email, phoneNumber) => {
    try {
        let emailExist = false, phoneNumberExist = false
        for (let item of contacts ?? []) {
            if (!emailExist)
                emailExist = (item.email.toLowerCase() === email.toLowerCase())
            if (!phoneNumberExist)
                phoneNumberExist = (item.phoneNumber.toLowerCase() === phoneNumber.toLowerCase())
        }
        return { emailExist, phoneNumberExist }
    } catch (error) {
        throw error
    }
}

module.exports.generateOutput = (contacts, id) => {
    try {
        const response = { "primaryContatctId": id, "emails": [], "phoneNumbers": [], "secondaryContactIds": [] }
        for (let item of contacts ?? []) {
            if (!response.emails.includes(item.email))
                response.emails.push(item.email)
            if (!response.phoneNumbers.includes(item.phoneNumber))
                response.phoneNumbers.push(item.phoneNumber)
            if (item.linkPrecedence == 'secondary')
                response.secondaryContactIds.push(item.id)
        }
        return response
    } catch (error) {
        throw error
    }
}