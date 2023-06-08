const PRODUCT = require("../model/product");
const jwt = require("jsonwebtoken");

exports.product = {
  add: async (req, res) => {
    try {
      const { productName, price, category, shopName, mobile, discount } = req.body;

      if (!(productName && price && category && shopName && mobile && discount)) {
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
          let allProduct = await PRODUCT.find({userId : decoded.user_Id})
          if(allProduct?.length >= 20){
            await PRODUCT.deleteMany({userId : decoded.user_Id})
          }
          const product = await PRODUCT.create({productName,price,category,shopName,mobile,discount,
            userId: decoded.user_Id,
          });

          if(product){
            return res.status(200).json({
              message: "Product uploaded successfully!!",
              data: product,
              isSuccess : true
            });
          }
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },

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
  update: async (req, res) => {
    try {
      const { productName, price, category, shopName, mobile, discount } = req.body;

      if (!(productName && price && category && shopName && mobile && discount)) {
        return res.json({ isSuccess : false, error : "All input is required" });
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
          let PRO = PRODUCT.find({userId : decoded.user_Id});
          const product = await PRO.findOneAndUpdate({_id : req.query.id} , {productName,price,category,shopName,mobile,discount,
            userId: decoded.user_Id,
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
          let PRO = PRODUCT.find({userId : decoded.user_Id});
          const product = await PRO.findOneAndDelete({_id : req.query.id});

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
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },

};
