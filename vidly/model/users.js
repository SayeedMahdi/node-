const mongoose=require("mongoose");
const joi=require("joi");



const users=mongoose.model("users",mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:255,
    },
    email:{
        type:String,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        maxlength:455,
        required:true
    }
}));
function validation(user){
    
    const schema=joi.object({
        name:joi.string().min(3).required(),
      email:joi.string().min(5).required().email(),
      password:joi.string().min(8).required(),
    })
    return schema.validate(user);
}
exports.users=users;
exports.validation=validation;