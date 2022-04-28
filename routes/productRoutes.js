const express = require('express');
const router = express.Router();

const { getAllProducts, createProduct, deleteAllProducts, getProductByID, updateProductByID, deleteProductByID } = require('../controllers/productController');

router.route('').get(getAllProducts).post(createProduct).delete(deleteAllProducts)
router.route('/:id').get(getProductByID).patch(updateProductByID).delete(deleteProductByID)

module.exports = router;