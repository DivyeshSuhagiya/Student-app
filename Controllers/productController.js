const PRODUCT = require("../model/product");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});

exports.product = {
  get: async (req, res) => {
    try {
      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const product = await PRODUCT.find({ userId: decoded.user_Id });
          return res.json({
            message: "Your data get successfull",
            data: product,
            isSuccess: true
          });
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  add: async (req, res) => {
    try {
      const { productName, price, category, shopName, mobile, discount, discription, colors } = req.body;
      const file = req.files.productImage;
      if(file.size > 1000000){
        return res.json({  isSuccess : false, error : "Image size must be less than 1 MB!!" });
      }
      if (!(productName && price && category && shopName && mobile && discount && discription && colors)) {
        return res.json({  isSuccess : false, error : "All input is required" });
      }

      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          cloudinary.uploader.upload(file.tempFilePath,{ folder: "productImage" }, async(err, result) => { 
            let allProduct = await PRODUCT.find({userId : decoded.user_Id})
            if(allProduct?.length >= 20){
              allProduct?.forEach(async(x) => {
                const destroyImage = await cloudinary.uploader.destroy(x.imageId , { folder: "productImage" });
                  if(destroyImage.result == 'ok'){
                    await PRODUCT.findOneAndRemove({userId : decoded.user_Id})
                  }
              })
            }
            const product = await PRODUCT.create({ productName, price, category, shopName, mobile, discount, discription, colors,
              userId: decoded.user_Id, productImage : result.url, imageId : result.public_id
            });
  
            if(true){
              return res.status(200).json({
                message: "Product uploaded successfully!!",
                data: product,
                isSuccess : true
              });
            }
          })
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  update: async (req, res) => {
    try {
      const { productName, price, category, shopName, mobile, discount, discription, colors } = req.body;
      const file = req.files.productImage;
      if(file.size > 1000000){
        return res.json({  isSuccess : false, error : "Image size must be less than 1 MB!!" });
      }
      if (!(productName && price && category && shopName && mobile && discount && discription && colors)) {
        return res.json({  isSuccess : false, error : "All input is required" });
      }

      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          // let PRO = PRODUCT.find({userId : decoded.user_Id});
          const userProduct = await PRODUCT.findOne({_id : req.query.id, userId : decoded.user_Id});
          const destroyImage = await cloudinary.uploader.destroy(userProduct.imageId , { folder: "productImage" });
          if(destroyImage.result == 'ok'){
            cloudinary.uploader.upload(file.tempFilePath,{ folder: "productImage" }, async(err, result) => {
              const product = await PRODUCT.updateOne({_id : req.query.id, userId : decoded.user_Id} , {productName, price, category, shopName, mobile, discount, discription, colors,
                userId: decoded.user_Id, productImage : result.url, imageId : result.public_id
              });
    
              if(product){
                return res.json({
                  message: "Product updated successfully!!",
                  isSuccess:true
                });
              }
              else{
                return res.status(400).json({
                  message: "This product is not found!!",
                  isSuccess:false
                });
              }
            })
          }else{
            return res.json({error: 'Image cannot change!!'});
          }
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },

  delete: async (req, res) => {
    try {

      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const userProduct = await PRODUCT.findOne({_id : req.query.id, userId : decoded.user_Id});
          const destroyImage = await cloudinary.uploader.destroy(userProduct.imageId , { folder: "productImage" });
          if(destroyImage.result == 'ok'){
            const product = await PRODUCT.findOneAndDelete({_id : req.query.id, userId : decoded.user_Id});
  
            if(product){
              res.status(200).json({
                isSuccess:true,
                message: "Product deleted successfully!!"
              });
            }
            else{
              res.status(200).json({
                isSuccess:true,
                message: "This product is not found!!"
              });
            }
          }else{
            return res.json({error: 'Image cannot delete!!'});
          }
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },

};
