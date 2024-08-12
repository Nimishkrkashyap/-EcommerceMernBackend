const Product = require("../model/product.model");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const ApiFeatures = require("../utils/apiFeatures");


// Controller for create product - (Admin)
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

// Controller for update product - (Admin)
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params._id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

});

// Controller for delete product - (Admin)
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params._id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not available for delete", 404))
  }
})

// Create new review or update the review
exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment
  }

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(rev=> rev.user.toString() === req.user.id.toString())

  if (isReviewed) {
     product.reviews.forEach(rev => {
      if (rev.user.toString() === req.user.id.toString()) {
          rev.rating = rating,
          rev.comment = comment
      }
     }); 
  } else {
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length
  }
  let avg = 0
  product.reviews.forEach(rev => {
      avg += rev.rating
  });

  product.ratings = avg / product.reviews.length;

  await product.save({validateBeforeSave: false})

  res.status(200).json({
      success: true
  })
})

// Get all reviews of a product
exports.getProductReviews = asyncHandler(async (req, res, next) => {
  const product = Product.findById(req.query.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

