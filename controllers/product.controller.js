import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;

        const newProduct = new Product({
            name,
            price,
            category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, category } = req.body;

        if (!name && !price && !category) {
            return res.status(400).json({ message: "Nothing to be updated" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, category },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
