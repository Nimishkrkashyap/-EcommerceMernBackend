const mongoose = require("mongoose");
// const URI = 'mongodb://0.0.0.0:27017/Ecommerce';

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    })
};

module.exports = connectDataBase;
