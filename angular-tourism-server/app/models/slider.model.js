const mongoose = require("mongoose");

const Slider = mongoose.model(
  "slider",
  new mongoose.Schema({
    id: 'ObjectId',
    sight_id: String,
    url: String,
    active: Boolean,
    is_main:Boolean,
    create_date:Number,
    name:String
  })
);

module.exports = Slider;