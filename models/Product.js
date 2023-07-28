const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePagination=require('mongoose-paginate-v2')
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
        },
        
    },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePagination)
const Products = mongoose.model("products", ProductSchema);
module.exports = Products;