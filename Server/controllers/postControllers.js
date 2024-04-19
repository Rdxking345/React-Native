const postModel = require("../models/postModels")

const createPostController = async (req,res) =>{
  try{
    const {title,description} = req.body
    if(!title || !description){
      return res.status(500).send({
        success:false,
        message:'please provide all fields'
      })
    }
  const post = await postModel({
    title,
    description,
    postedBy: req.auth._id
  }).save();
res.status(201).send({
  success:true,
  message:'post cretead successfully ',
  post,
})
console.log(req)
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in create post api ',
      error,
    })
  }
}

//get all posts 

const getAllPostsController = async (req,res) =>{
  try{
    const posts = await postModel
    .find()
    .populate("postedBy", "_id name")
    .sort({ createdAt: -1 });
    
    res.status(200).send({
      success:true,
      message:'All post data',
      posts,
    })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in get api',
      error
    })
  }
}

//get user post 

const getUserPostController = async (req,res) =>{
  try{
    const userPosts = await postModel.find({postedBy:req.auth._id})
    res.status(200).send({
      success:true,
      message:'user post',
      userPosts,
    })
  }catch(error){
    console.log(error,'error in apun')
    return res.status(500).send({
      success:false,
      message:'Error in user post Api',
      error
    })
  }
}

 
//delete post controller
const deletePostController = async (req,res) =>{
  try{
    const {id} = req.params
    await postModel.findByIdAndDelete({_id:id})
    res.status(200).send({
      success:true,
      message:'your post has been deleted'
    })
  }catch(error){
    console.log(error)
    res.status(500).send({
      succcess:false,
      message:'error in delete post api ',
      error,
    })
  }
}


//update posts

const updatePostController = async (req,res) =>{
  try{
    const {title,description} = req.body
    //post find
    const post = await postModel.findById({_id:req.params.id})
    //validation
    if(!title || !description){
      return res.status(500).send({
        success:false,
        message:'please provide title or description'
      })
    }
  const updatedPost = await postModel.findByIdAndUpdate({_id:req.params.id},
      
      {
        title: title || post?.title,
        description: description || post?.description
      },
    {new:true}
    );
  res.status(200).send({
    success:true,
    message:'post updated successfully',
    updatedPost
  })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error in update post api ',
      error
    })
  }
}
module.exports = { 
                  createPostController,
                  getAllPostsController ,
                  getUserPostController,
                  deletePostController,
                  updatePostController
  
};