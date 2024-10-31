const express = require(`express`);
const Product = require('../models/productModel');
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');

const router = express.Router();

// get all products
router.get('/', getProducts);

// get a product by id
router.get('/:id', getProduct);

// create a product
router.post('/', createProduct);

// update a product
router.put('/:id', updateProduct);

// delete a product
router.delete('/:id', deleteProduct);

module.exports = router;