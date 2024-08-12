const Product = require("../model/product.model");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const ApiFeatures = require("../utils/apiFeatures");


// Controller for create product
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// Controller for get all products
exports.getAllProduct = asyncHandler(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const product = await apiFeature.query;

  res.status(201).json({
    success: true,
    message: "Product fetched successfully",
    product,
    productCount
  });
})

exports.getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  res.status(200).json({
    success: true,
    product
  })
})

// Controller for update product
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params._id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

});

// Controller for delete product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params._id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not available for delete", 404))
  }
})
