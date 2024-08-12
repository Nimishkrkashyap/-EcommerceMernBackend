const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const customError = require('./middleware/error')
app.use(express.json());
app.use(cookieParser())

const product = require('./routes/product.route')
const user = require('./routes/user.route');
app.use("/api/v1", product);
app.use("/api/v1", user)

// Custom error middleware
app.use(customError)

module.exports = app;