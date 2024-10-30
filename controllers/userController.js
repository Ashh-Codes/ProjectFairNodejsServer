//register logic
const users = require('../models/userModel')
const jwt  =require('jsonwebtoken')

exports.registerController=async(req,res)=>{

    console.log("Inside register controller");
    const {username,email,password} = req.body
    console.log(username,email,password);
    //res.status(200).json("request register recieved")
    //check email is present in db
    try {
        const existingUser = await users.findOne({email})//key value same
        console.log(existingUser);
        
        if(existingUser){
            res.status(406).json("Account already exists ..please login")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
        
        
    } catch (err) {
        res.status(401).json(err)
    }

    
    
    
}

//login

exports.loginController = async(req,res)=>{
    console.log("inside login");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            //allow login
                //generate tocken
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

            res.status(200).json({
                
                user:existingUser,
                token
            })
        }
        else{
            res.status(404).json("Invalid email/password")
        }
        
    } catch (err) {
        res.status(401).json(err)
    }
        
}

//edit profile
exports.editProfileContoller =async(req,res)=>{
    console.log("Inside edit contoller")
    const {username,email,password,github,linkedin,profilePic} =req.body
    const uploadImg=req.file?req.file.filename:profilePic
    const userId = req.userId
    try {
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profilePic:uploadImg},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) 
{
    res.status(401).json(err)        
    }


}