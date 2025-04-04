const Product = require('../models/productModel');

//business logic

const getProducts = async(req,res) => {
    try{
        const allProducts = await Product.find();

        if(!allProducts || allProducts.length === 0){
            res.json({
                message: "There is No Product"
            })
        }
        //if we have products more than 1
        res.status(200).json({
            success: true,
            products: allProducts,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const createProduct = async(req,res) => {
    try{
        const {name, price, description, category} = req.body;
        const newProduct = new Product({name, price, description, category});
        await newProduct.save();
        res.status(200).json({
            products: newProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const updateProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const {name, price, description, category} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, description, category}, {new:true});
        //new true show the updated product while without it ,the product before updation showss
        res.status(200).json({
            products: updatedProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const deleteProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            res.status(200).json({
                message: "product not found ",
            })  
        }
        
        res.status(200).json({
            message: "product deleted successfully ",
            products: deletedProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports = {getProducts, updateProduct, createProduct, deleteProduct}