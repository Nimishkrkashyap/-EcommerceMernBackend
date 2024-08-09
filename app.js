const express = require('express');
const app = express();
const customError = require('./middleware/error')
app.use(express.json());

const product = require('./routes/product.route')
const user = require('./routes/user.route')
app.use("/api/v1", product);
app.use("/api/v1", user)

// Custom error middleware
app.use(customError)

module.exports = app;