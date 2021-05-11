const mongoose = require("mongoose");

const Vr = mongoose.model(
  "vr",
  new mongoose.Schema({
    id: 'ObjectId',
    main_header_en: String,
        main_header_ru: String,
        main_header_kz: String,
        main_header_es: String,
        main_header_zh: String,
    url:String,
    is_active: Boolean,
    sight_id: String,
    create_date:Number
    
  })
);

module.exports = Vr;