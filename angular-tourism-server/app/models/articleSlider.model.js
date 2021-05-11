const mongoose = require("mongoose");

const ArticleSlider = mongoose.model(
  "articleSlider",
  new mongoose.Schema({
    id: 'ObjectId',
    article_id: String,
    url: String,
    active: Boolean,
    is_main:Boolean,
    create_date:Number,
    name:String
  })
);

module.exports = ArticleSlider;