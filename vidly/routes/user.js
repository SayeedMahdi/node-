const {  users,validation } = require("../model/users");

const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");


//get all
router.get("/",async (req, res)=>{
    const alluser=await users.find()
    .sort("name")
    .select("name  password email");

    res.send(alluser);
});
//get one id
router.get("/:id",async (req, res)=>{
    const oneuser=await users.findById(req.params.id)
    .sort("name")
    .select("name  password email");
    if(!oneuser) return res.status(404).send("The id wan not found");
    res.send(oneuser);
});
//add a movie

router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const email=await users.findOne({email:req.body.email});
    if(email) return res.status(404).send("The email exist in detabase");

    let new_user=new users({
        name:req.body.name,
       email:req.body.email,
       password:req.body.password
    
    });
    new_user= await new_user.save();
   res.send(new_user);
});
//eddite a customer
router.put("/:id", async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const user_edite = await users.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },{now:true});
        if (!user_edite) return res.status(404).send("The ID does not exist in the detabase");
        res.send(user_edite);
    } catch (err) {
        console.log(err.message);
    }
});

//dellete a customer
router.delete("/:id",async(req,res)=>{
    let user_del = await users.findById(req.params.id);
    if (!user_del) return res.status(404).send("The ID does not exist in the detabase");
     user_del=await users.deleteOne(req.params.id);
    res.send(user_del);
});
module.exports=router;
