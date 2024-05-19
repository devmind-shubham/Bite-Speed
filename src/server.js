const express = require("express");
const routes = require("./routes/index")
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` })
const connectionPool = require("./config/db.connection.pool")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Server availability check ---
app.get('/', (req, res) => {
    res.status(200).send({ status: 200, message: "Healthy Server" });
});

app.use('/api', routes)

// --- Start the server ---
const port = 8080;
app.listen(port, () => {
    console.log(`${process.env.NODE_ENV.toUpperCase()} server is running on port ${port}`);
});
