
const joi = require('joi');
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer", mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10
    },
    isGold:{
        type:Boolean,
        default:false
    }
}));


//validation functions
function validation(name) {
    const joi_Schema = joi.object({
        name: joi.string().min(5).required(),
        phone: joi.string().min(5).required(),
        isGold: joi.boolean()
    });
    return joi_Schema.validate(name);
}
exports.Customer=Customer;
exports.validate=validation;