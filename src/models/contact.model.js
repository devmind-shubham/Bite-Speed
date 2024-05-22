const sql = require("mssql")

module.exports.executeQuery = async (sql, query, params) => {
    try {
        const request = sql.request();
        if (params.length > 0) {
            await params.map((item) => {
                if (item?.type)
                    request.input(item.key, item.type, item.value);
                else
                    request.input(item.key, item.value);
            });
        }
        const result = await request.query(query);
        return result?.recordset ?? []
    } catch (error) {
        console.log("Error from executeQuery");
        throw error;
    }
};

module.exports.fetchLinkedContacts = async (pool, linkedId) => {
    try {
        const data = await this.executeQuery(pool,
            `SELECT * FROM contacts WHERE id = @linkedId OR linkedId = @linkedId ORDER BY linkPrecedence`,
            [
                { "key": "linkedId", "value": linkedId }
            ]
        )
        return data
    } catch (error) {
        throw error
    }
}

module.exports.fetchContacts = async (pool, email, phoneNumber) => {
    try {
        const data = await this.executeQuery(pool,
            `SELECT * FROM contacts WHERE email=@email OR phoneNumber = @phoneNumber`,
            [
                { "key": "email", "value": email },
                { "key": "phoneNumber", "value": phoneNumber }
            ]
        )
        return data
    } catch (error) {
        throw error
    }
}

module.exports.fetchPrimaryContacts = async (pool, email, phoneNumber) => {
    try {
        const data = await this.executeQuery(pool,
            `SELECT * FROM contacts WHERE (email=@email OR phoneNumber = @phoneNumber) AND linkPrecedence='primary'`,
            [
                { "key": "email", "value": email },
                { "key": "phoneNumber", "value": phoneNumber }
            ]
        )
        return data
    } catch (error) {
        throw error
    }
}

module.exports.insertContact = async (pool, email, phoneNumber, linkPrecedence = "primary", linkedId = null, updatedAt = null) => {
    try {
        const data = await this.executeQuery(pool,
            `INSERT INTO contacts (email, phoneNumber, linkedId, linkPrecedence, updatedAt)
            OUTPUT inserted.id
            SELECT @email, @phoneNumber, @linkedId, @linkPrecedence, @updatedAt
            WHERE NOT EXISTS (
              SELECT 1 FROM contacts WHERE email = @email AND phoneNumber = @phoneNumber
            )`,
            [
                { "key": "email", "value": email },
                { "key": "phoneNumber", "value": phoneNumber },
                { "key": "linkedId", "value": linkedId },
                { "key": "updatedAt", "value": updatedAt },
                { "key": "linkPrecedence", "value": linkPrecedence }
            ]
        )
        return data
    } catch (error) {
        throw error
    }
}

module.exports.updateContactAsSecondary = async (pool, primaryIds, idToLink) => {
    try {
        const ids = primaryIds.join(',')
        const data = await this.executeQuery(pool,
            `UPDATE contacts SET linkPrecedence = 'secondary', linkedId = @linkedId, updatedAt = GETDATE() WHERE id IN (${ids}) OR linkedId IN (${ids})`,
            [
                { "key": "linkedId", "value": idToLink }
            ]
        )
        return data
    } catch (error) {
        throw error
    }
}