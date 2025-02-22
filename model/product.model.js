const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of product"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the desription"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})
const Product = new mongoose.model("Product", productSchema)
module.exports = Product;