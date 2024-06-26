const sql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    requestTimeout: 300000,
    port: 1433,
    synchronize: true,
    trustServerCertificate: false,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 100000

    },
    options: {
        encrypt: true, // for azure 
    }
}
let pool
(async () => {
    try {
        pool = new sql.ConnectionPool(sqlConfig)
        console.log("MSSql DB Connected To : -----  ", process.env.DB_NAME);
    }
    catch (error) {
        console.log("DB connection error-->", error)
    }
})()

module.exports = pool;
