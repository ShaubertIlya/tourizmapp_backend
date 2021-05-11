const mongoose = require("mongoose");

const Comments = mongoose.model(
  "comments",
  new mongoose.Schema({
    id: 'ObjectId',
    text: String,
    content_id: String,
    content_name: String,
    rating: Number,
   status:Boolean,
   answer:String,
   userToken:String,
   createDate:Number
  })
);

module.exports = Comments;