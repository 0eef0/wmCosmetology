const ProductSchema = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find({});
        res.status(201).json({ products });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const createProduct = async (req, res) => {
    try {
        const product = await ProductSchema.create(req.body)
        res.status(201).json({product})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        await ProductSchema.deleteMany({});
        res.status(201).json({ success: true, message: "all products deleted" });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const getProductByID = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id).exec();
        res.status(201).json({ product });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

const updateProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = req.body;
        await ProductSchema.findOneAndUpdate({ _id: id }, newProduct);
        res.status(201).json({ newProduct });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const deleteProductByID = async (req, res) => {
    try {
        await ProductSchema.findByIdAndRemove(req.params.id);
        res.status(201).json({ success: true, message: `product with id ${req.params.id} deleted` });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

module.exports = { getAllProducts, createProduct, deleteAllProducts, getProductByID, updateProductByID, deleteProductByID };

