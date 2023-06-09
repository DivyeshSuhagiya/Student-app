var mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      required :true
    },
    price: {
      type: String,
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
    productImage : {
      type : String,
      trim: true,
      default : '',
      required :true
    },
    imageId: { 
      type: String,
      trim: true,
      default: "",
      required :true
    },
    userId : {
      type : String,
      trim : true,
      default :'',
      required :true
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);