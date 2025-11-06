import express from 'express'
import * as productController from '../controllers/product.controller.js'

const router = express.Router()

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

export default router