const mongoose = require("mongoose");
const URI = 'mongodb://0.0.0.0:27017/Ecommerce';

const connectDataBase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connection successful to Db")
    } catch (error) {
        console.log("Database not connected", error)
        process.exit(0)
    }
};

module.exports = connectDataBase;
