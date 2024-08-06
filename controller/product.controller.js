const Product = require("../model/product.model");
const ErrorHandler = require("../utils/errorHandler");

// Controller for create product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

// Controller for get all products
exports.getAllProduct = async (_req, res) => {
  try {
    const product = await Product.find();

    res.status(201).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

// Controller for update product
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params._id;
    const product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404))
    }

    // const updatedProduct = await Product.
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

// Controller for delete product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params._id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found for delete",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
