require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index")

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Server availability check ---
app.get('/', (req, res) => {
    res.status(200).send({ status: 200, message: "Healthy Server" });
});

app.use('/api', routes)

// --- Start the server ---
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`${process.env.NODE_ENV.toUpperCase()} server is running on port ${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: 500, message: 'Something went wrong!' });
});
