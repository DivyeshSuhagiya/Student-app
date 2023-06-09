const userController = require('../Controllers/userController')
const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')


router.post('/register' , (req,res) => userController.user.register(req,res))
router.post('/login' , (req,res) => userController.user.login(req,res))
router.delete('/delete' , (req,res) => userController.user.delete(req,res))
router.get('/getUser' , (req,res) => userController.user.getUser(req,res))
router.get('/getUserForAdmin' , (req,res) => userController.user.getUserForAdmin(req,res))

module.exports = router;