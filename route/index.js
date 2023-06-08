const express = require("express");
const router = express.Router();

const productRoutes = require('./productRoute');
const userRoutes = require('./userRoute');
router.use('/product' , productRoutes);
router.use('/user' , userRoutes);

module.exports = router;