const mongoose = require('mongoose');

//schema
const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'pleaas add post titile']
  },
description:{
  type:String,
  required:[true,'please add post description']
},
postedBy:{
  type:mongoose.Schema.ObjectId,
  ref:'User',
  required:true
}
})


module.exports = mongoose.model('Post',postSchema);