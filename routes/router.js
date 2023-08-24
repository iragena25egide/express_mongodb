const router=require('express').Router();
const User=require('../model/user');
const bcrypt=require('bcrypt');
const Joi=require('@hapi/joi');
const {SignupSchema}=require('../model/user');
const {LoginSchema}=require('../model/user');





router.post('/signup',async (req,res)=>{
    const{name,email,password}=req.body;
    
    
    const {error}=await SignupSchema.validate(req.body);

    if(error){
        res.status(400).send(error.message);
        return 
    }

    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    const user=new User({
        name,
        email,
        password:hash
    });
    try {
        const savedUser=await user.save();
        res.send(savedUser);
    } catch (error) {
        res.send(error);
    }

});
router.get('/get',async (req,res)=>{
    const data=await User.find();
    if(data){
        res.send(data);
    }else{
        res.send('failed');
    }
});
router.delete('/delete/:_id',async(req,res)=>{
    const update=await User.findOneAndDelete(req.params._id);
    if(update){
        res.send('deleted well');
    }
});

router.put('/update/:_id',async(req,res)=>{
    const id=req.params._id;
    const {name,email,password}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);

    const upd=await User.findByIdAndUpdate(id,{name,email,password:hash});

    if(upd){
        res.send('updated welll');
    }


});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    
    const {error}=await LoginSchema.validate(req.body);

    if(error){
        res.status(400).send(error.message);
        return 
    };
    const userExist=await User.findOne({email});
    if(!userExist){
        res.send('Email never found in Database,Create Account');
        return 
    }
    const ValidPassword=await bcrypt.compare(password,userExist.password);

    if(ValidPassword){
        res.send('Logged IN');
    }else{
        res.send('Incorrect Password,try again')
    }
    
    
    

    
})



















module.exports = router;