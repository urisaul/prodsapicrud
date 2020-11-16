const mongoose = require("mongoose");
const Joi = require("joi");


const prodsSchema = new mongoose.Schema({
    cat: String,
    name: String,
    price: Number,
    image: String,
    date_time: {
        type: Date, default: Date.now
    }
});

const prodsModel = mongoose.model("prods", prodsSchema)

exports.prodsModel = prodsModel;

const validProd = (_prod) => {
    let schema = Joi.object({
        _id:Joi.any(),
        cat:Joi.string().min(2).max(50).required(),
        name:Joi.string().min(2).max(50).required(),
        price:Joi.number().min(0).required(),
        image:Joi.string().min(2).max(250)
    })
    return schema.validate(_prod)
}

exports.validProd = validProd;