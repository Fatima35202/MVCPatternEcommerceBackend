const express = require('express')
const router = express.Router()

const {getProducts, updateProduct, createProduct, deleteProduct} = require('../controllers/productController')
//user send requests, then controller call, then business logic occurs with some method on model
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
module.exports = router