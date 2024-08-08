const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/product.controller');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/products/new').post(createProduct);
// router.route('/products/:id').put(updateProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;