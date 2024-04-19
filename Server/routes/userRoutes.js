const express = require('express')
const {registerController,loginController,updateUserController,requireSignIn} = require('../controllers/userControllers')

//Router object
const router = express.Router() 

//router || register post
router.post('/register',registerController)

//login post 
router.post('/login',loginController)

//update || put 
router.put('/update-user',requireSignIn,updateUserController);

//exports
module.exports = router;
