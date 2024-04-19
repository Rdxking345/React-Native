const bcryptjs = require('bcryptjs')



//hash function 
exports.hashPassword = (password) =>{
  return new Promise((resolve,reject) =>{
    bcryptjs.genSalt(10, (err,salt) =>{
      if(err){
        reject(err)
      }
    bcryptjs.hash(password,salt, (err,hash) =>{
      if(err){
        reject(err)
      }
    resolve(hash)
    })
    })
  })
} 

//decrypt function

exports.comparePassword = (password, hashed) =>{
  return bcryptjs.compare(password, hashed);
};
