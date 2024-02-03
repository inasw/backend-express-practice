const Joi = require("joi") ;
const asyncHandler = require("express-async-handler")
const Product = require('../model/productModel');

const getProduct = async(req,res) => {
    const products = await Product.find();
    res.status(200).json(products);

    // res.status(200).json({message:"Get all my products"})
}

const createProduct = async(req,res) => {
    // manual validation
    // if(!req.body.title){
    //     res.status(400).json({error:"please add title"})
    // }
    // if(!req.body.description){
    //     res.status(400).json({error:"please add description"})
    // }

    // res.status(200).json({message:"Create my products"})

    // validation using joi
    const schema = Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
    })

    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({error:error.details.map((err)=>err.message)})
    }

    res.status(200).json({message:"create products"})

    const products = await Product.create(
        {
            title: req.body.title,
            description:req.body.description,

        }
    );
    res.status(200).json(products);
}

const updateProduct = async(req,res) => {
    // res.status(200).json({message:`Update product ${req.params}`})
    const products = await Product.findById(req.param.id);
    if(!products){
        res.status(400).json({error:"products not found"})
    }

    const updatedProducts = await Product.findbyIdANDUpdate(req.param.id,req.body)
    res.status(200).json(updatedProducts);
}

const deleteProduct = async(req,res) => {
    // res.status(200).json({message:"Delete my products"})
    const products = await Product.findById(req.param.id)
    if(!products){
        res.status(400).json({error:"product not found"})
    }

    const deletedProduct = await Product.findByIdANDRemove(req.param.id)
    res.status(200).json({message:"deleted successfully"});
}

module.exports= {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};