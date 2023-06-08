const productController = require('../Controllers/productController')
const express = require("express");
const router = express.Router();

router.post('/add' , (req,res) => productController.product.add(req,res))
router.get('/get' , (req,res) => productController.product.get(req,res))
router.patch('/update' , (req,res) => productController.product.update(req,res))
router.delete('/delete' , (req,res) => productController.product.delete(req,res))

module.exports = router;