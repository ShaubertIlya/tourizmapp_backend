const mongoose = require("mongoose");

const SliderContainer = mongoose.model(
  "sliderContainer",
  new mongoose.Schema({
    id: 'ObjectId',
    sight_id: String,
    url: [],
    active: Boolean,
    is_main:Boolean,
    create_date:Number
  })
);

module.exports = SliderContainer;