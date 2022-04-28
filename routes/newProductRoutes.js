const express = require('express');
const router = express.Router();

const { getAllNewProducts, createNewProduct, deleteAllNewProducts, getNewProductByID, updateNewProductByID, deleteNewProductByID } = require('../controllers/newProductController.js');

router.route('').get(getAllNewProducts).post(createNewProduct).delete(deleteAllNewProducts)
router.route('/:id').get(getNewProductByID).patch(updateNewProductByID).delete(deleteNewProductByID)

module.exports = router;