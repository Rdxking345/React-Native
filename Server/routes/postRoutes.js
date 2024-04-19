const express = require('express')
const { requireSignIn } = require('../controllers/userControllers')
const { createPostController, getAllPostsController,getUserPostController,deletePostController,updatePostController} = require('../controllers/postControllers')



//Router object
const router = express.Router() 

//create post || post 
router.post('/create-post',requireSignIn,createPostController)

//get all post
router.get('/get-all-post', getAllPostsController)


//get users posts
router.get('/get-user-post', requireSignIn,getUserPostController)

//delete posts
 router.delete('/delete-post/:id',requireSignIn,deletePostController)
 
 //update post
 router.put('/update-post/:id',requireSignIn,updatePostController)

//exports
module.exports = router;
