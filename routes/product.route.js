const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/products').post(createProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);

module.exports = router;