const mongoose = require("mongoose")
const productSchema = new mongoose.Schema(
    {
        name: {type: String, require: true, unique: true},
        
        img: {type: String, require: true},
        type: {type: String, require: true},
        description: {type: String},
        price: {type: Number, require: true},
        countInStock: {type: Number, require: true},
        rating: {type: Number, require: true},
        discount: {type: Number},
        sold: {type: Number},
        
        
    },
    {
        timestamps: true
    }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;