const {Usermodel}=require('../model/user.model')
const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const userRouter=express.Router()

userRouter.post('/signup',async(req,res)=>{
    const {email,password}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
           if(err){
                console.log(err)
                res.send({'msg':'Signup error'})
           }else{
                const new_user=new Usermodel({email,password:hash})
                await new_user.save()
                res.send({'msg':'Signup successful'})
           }
        });
    }catch(err){
        console.log(err)
        res.send({'msg':'Signup error'})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user=await Usermodel.find({email})

    try{
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(result){
                var token = jwt.sign({ user_id: user[0]._id }, 'bugapp');
                res.send({'msg':'Login successful','token':token})
            }else{
                console.log(err)
                res.send({'msg':'Login error'})
            }
        });
    }catch(err){
        console.log(err)
        res.send({'msg':'Login error'})
    }
})

module.exports={userRouter}