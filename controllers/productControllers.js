const Joi = require("joi") ;
const asyncHandler = require("express-async-handler")
const Product = require("../model/productModel")
const User = require("../model/userModel")

const getAllProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.status(200).json(products);
})

const getProduct = async(req,res) => {
    const products = await Product.find({user:req.user.id});
    res.status(200).json(products);

    // res.status(200).json({message:"Get all my products"})
}

const createProduct = async(req,res) => {
      const products = await Product.create(
        {
            user:req.user.id,
            title: req.body.title,
            description:req.body.description,

        }
    );
    res.status(200).json(products);
}

const updateProduct = async(req,res) => {
    // res.status(200).json({message:`Update product ${req.params}`})
    const products = await Product.findById(req.params.id);
    if(!products){
        res.status(400).json({error:"products not found"})
    }

    const user = await User.findById(req.user.id)
    if(!user){
       res.status(401).json({error:'user not found'}) 
    }

    if(products.user.toString() !== user.id){
        res.status(401).json({error:"you are not authorized to update this product"})
    }

    const updatedProducts = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedProducts);
}

const deleteProduct = async(req,res) => {
    // res.status(200).json({message:"Delete my products"})
    const products = await Product.findById(req.params.id)
    if(!products){
        res.status(400).json({error:"product not found"})
    } 

    const user = await User.findById(req.user.id)
    if(!user){
       res.status(401).json({error:'user not found'}) 
    }

    if(products.user.toString() !== user.id){
        res.status(401).json({error:"you are not authorized to update this product"})
    }

    const deletedProduct = await Product.findByIdAndRemove(req.param.id)
    res.status(200).json({message:"deleted successfully"});
}

module.exports= {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};