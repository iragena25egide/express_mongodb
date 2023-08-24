const string = require('@hapi/joi/lib/types/string');
const mongoose=require('mongoose');
const Joi=require('@hapi/joi');


const userSchema=new mongoose.Schema({
        name:{
            type:string,
            unique:true
        },
        email:{
            type:string,
            unique:true
       },
        password:{
            type:string
        }
});

const SignupSchema=Joi.object({
    name:Joi.string().min(12).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(8).required()

});
   const LoginSchema=Joi.object({        
         email:Joi.string().email().required(),
         password:Joi.string().min(6).max(8).required()
    
    });



module.exports = mongoose.model('User',userSchema);
module.exports.SignupSchema=SignupSchema;
module.exports.LoginSchema=LoginSchema;