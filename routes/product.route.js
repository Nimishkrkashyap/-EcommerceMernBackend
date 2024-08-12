const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require('../controller/product.controller');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/products/:id').get(getProductDetails)
router.route('/admin/products/new').post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route('/admin/products/:id').put(isAuthenticated, authorizeRoles("admin"), updateProduct).delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router.route('/review').put(isAuthenticated, createProductReview)

module.exports = router;