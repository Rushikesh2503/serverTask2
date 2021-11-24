const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

const newToken=(user)=>{
    return jwt.sign({user},"INTERVIEWTASK")
}

const User= require("../models/user.model");

router.post("/register",async(req,res)=>{
    const {firstName, lastName,email,password}=req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(442).json({error:"Please Add Details"})
    }
    
    let user=await User.findOne({email:req.body.email}).lean().exec();
    console.log('user:', user)
    if(user){
       return res.status(422).json({error:"You are already register"});
    }
     user=await User.create(req.body);
    if(!user){
        return res.status(422).json({error:"You try Later again"});
    }
    const token=newToken(user);
    console.log('token:', token)

    return res.status(201).json({token})

});
router.post("/login",async(req,res)=>{
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
    
        if (!user)
          return res.status(400).send({
            status: "failed",
            message: "Please try with a different email and password",
          });
        const match = user.checkPassword(req.body.password);
    
        if (!match)
          return res.status(400).send({
            status: "failed",
            message: "Please try with a different email and password",
          });
    
        const token = newToken(user);
    
        return res.status(201).json({ token: token });
      } catch (err) {
        return res
          .status(500)
          .send({ status: "failed", message: "Please try again later" });
      }

});

module.exports=router;