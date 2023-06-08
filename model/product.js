var mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      default : false,
      required :true
    },
    price: {
      type: String,
      trim: true,
      default : false,
      required :true
    },
    category: {
      type: String,
      trim: true,
      default : false,
      required :true
    },
    shopName: {
      type: String,
      trim: true,
      default : false,
      required :true
    },
    mobile: {
      type: String,
      trim: true,
      default : false,
      required :true
    },
    discount: {
      type: String,
      trim: true,
      default : false,
      required :true
    },
    userId : {
      type : String,
      trim : true,
      default :false,
      required :true
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);