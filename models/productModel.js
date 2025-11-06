import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Please add a product name"]
    },
    price: {
        type: Number,
        required: [ true, "Please add a product price"]
    },
    category: {
        type: String,
        required: [ true, "Please add a product category"]
    }
},{ timestamps: true }
)

const Product = mongoose.model("Product", productSchema)
export default Product
