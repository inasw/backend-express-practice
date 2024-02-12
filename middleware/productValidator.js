const Joi = require("joi");
const productValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    });

    const {error, value} = schema.validate(req.body);

    if(error){
        res.status(400).json({error: error.details.map((err) => err.message)})
    }

    next();
};

module.exports = {
    productValidator,
};

  // manual validation
    // if(!req.body.title){
    //     res.status(400).json({error:"please add title"})
    // }
    // if(!req.body.description){
    //     res.status(400).json({error:"please add description"})
    // }

    // res.status(200).json({message:"Create my products"})

    // validation using joi
    // const schema = Joi.object({
    //     title:Joi.string().required(),
    //     description:Joi.string().required(),
    // })

    // const {error,value} = schema.validate(req.body)
    // if(error){
    //     res.status(400).json({error:error.details.map((err)=>err.message)})
    // }
