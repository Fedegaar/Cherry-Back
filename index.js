const express = require('express')
const mongoose = require("mongoose")
require("dotenv").config()
const productsRoutes = require('./src/routes/products')
const servicesRoutes = require('./src/routes/services')
const app = express()
// app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use('/', productsRoutes, servicesRoutes)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connect to MongoDB Atlas"))
    .catch((error) => console.log(error))

app.listen(3001)
console.log("Listening on port", 3001)

module.exports = app;