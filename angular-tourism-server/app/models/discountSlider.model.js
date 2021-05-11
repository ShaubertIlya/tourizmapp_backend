const mongoose = require("mongoose");

const DiscountSlider = mongoose.model(
  "discountSlider",
  new mongoose.Schema({
    id: 'ObjectId',
    discount_id: String,
    url: String,
    active: Boolean,
    is_main:Boolean,
    create_date:Number,
    name:String
  })
);

module.exports = DiscountSlider;