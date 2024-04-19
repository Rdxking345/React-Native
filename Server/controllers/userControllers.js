const JWT = require('jsonwebtoken')
var { expressjwt: jwt } = require("express-jwt");
const userModel = require('../models/userModel')
const { hashPassword,comparePassword } = require('../helpers/authHelper');


//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET, 
  algorithms: ["HS256"]
})

//register
const registerController = async (req,res) =>{
  
  try{
    const {name,email,password} = req.body 
    
    //vakidation 
    if(!name){
      return res.status(400).send({
        success:false,
        message:'name is required'
      })
    }
    if(!email){
      return res.status(400).send({
        success:false,
        message:'email is required'
      })
    }
  if(!password || password.length < 6){
      return res.status(400).send({
        success:false,
        message:'password is required and 6 character long '
      })
    } 
  //existing 
  const existingUser = await userModel.findOne({email}) 
  
  if(existingUser){
    return res.status(500).send({
      success:false,
      message:'user already register with this email'
    })
  } 
//hashed password
const hashedPassword = await hashPassword(password);

//save
const user = await userModel({name,email,password:hashedPassword}).save();
    return  res.status(201).send({
    success:true,
    message:'registaritionn successfully please login'
    
  })
  }catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'error in register api ',
      error,
    })
  }
  
};

//login controllers
const loginController = async (req,res) =>{
  try{
    const {email,password} = req.body
    //validation 
    if(!email || !password){
      return res.status(500).send({
        success:false,
        message:'please provide email and password'
      })
    }
    
    //find user
    const user = await userModel.findOne({email}) 
    if(!user){
      return res.status(500).send({
        success:false,
        message:'user not found'
      })
    }
  
  //match password
    const match = await comparePassword(password,user.password) 
    if(!match){
      return res.status(500).send({
        success:false,
        message:'inavlaid username or password'
      })
    }
  //Token 
  const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn:'7d',                                                          
        })
  
  user.password = undefined;
 return res.status(200).send({
      success:true,
      message:'login successfully',
      token,
      user,
    })
    
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'error in login api',
      error
    })
  }

};




//update user
const updateUserController = async (req,res) =>{
  try{
    const {name,password,email} = req.body;
     //user find 
    const user = await userModel.findOne({email})
    
    //password validate
    if(password && password.length < 6){
      return res.status(400).send({
        success:false,
        message:'password is required 6 character long '
      })
    }
 const hashedPassword = password ? await hashPassword(password) : undefined
 const updatedUser = await userModel.findOneAndUpdate(
    {email},
    {
    name : name || user.name,
    password: hashedPassword || user.password,
  },
   { new: true }
);
updatedUser.password = undefined;

res.status(200).send({
  success:true,
  message:'profile update please login',
  updatedUser,
});
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in user update api',
      error
    })
  }
  
  
}

module.exports = {registerController,loginController,updateUserController,requireSignIn};