var mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      required :true
    },
    price: {
      type: Number,
      trim: true,
      required :true
    },
    category: {
      type: String,
      trim: true,
      required :true
    },
    shopName: {
      type: String,
      trim: true,
      required :true
    },
    mobile: {
      type: Number,
      trim: true,
      required :true
    },
    discount: {
      type: Number,
      trim: true,
      required :true
    },
    discription : {
      type : String,
      trim: true,
      required :true
    },
    colors : {
      type : String,
      trim: true,
      required :true
    },
    quantity:{
      type : Number,
      trim: true,
    },
    totalPrice:{
      type : Number,
      trim: true,
    },
    productImage : {
      type : String,
      trim: true,
      default : '',
      required :true
    },
    orderComplateTime : {
      type : Date,
      trim: true
    },
    imageId: { 
      type: String,
      trim: true,
      default: "",
      required :true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);