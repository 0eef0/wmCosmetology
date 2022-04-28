const NewProductSchema = require('../models/NewProduct');

const getAllNewProducts = async (req, res) => {
    try {
        const products = await NewProductSchema.find({});
        res.status(201).json({ products });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const createNewProduct = async (req, res) => {
    try {
        const product = await NewProductSchema.create(req.body)
        res.status(201).json({product})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAllNewProducts = async (req, res) => {
    try {
        await NewProductSchema.deleteMany({});
        res.status(201).json({ success: true, message: "all products deleted" });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const getNewProductByID = async (req, res) => {
    try {
        const product = await NewProductSchema.findById(req.params.id).exec();
        res.status(201).json({ product });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

const updateNewProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = req.body;
        await NewProductSchema.findOneAndUpdate({ _id: id }, newProduct);
        res.status(201).json({ newProduct });
    } catch (error) { res.status(500).json({ msg: error }) }
}

const deleteNewProductByID = async (req, res) => {
    try {
        await NewProductSchema.findByIdAndRemove(req.params.id);
        res.status(201).json({ success: true, message: `product with id ${req.params.id} deleted` });
    } catch (error) { res.status(500).json({ msg: error || 'There has been an error, try again later' }) }
}

module.exports = { getAllNewProducts, createNewProduct, deleteAllNewProducts, getNewProductByID, updateNewProductByID, deleteNewProductByID };

