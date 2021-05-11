module.exports = mongoose => {
		
  var schema = mongoose.Schema(
      {
        image_url: String,
        main_header_en: String,
        main_header_ru: String,
        main_header_kz: String,
        main_header_es: String,
        main_header_zh: String,
		sdescription_en: String,
		sdescription_ru: String,
		sdescription_kz: String,
		sdescription_es: String,
		sdescription_zh: String,
		description_en: String,
		description_ru: String,
		description_kz: String,
		description_es: String,
		description_zh: String,
		country_id: String,
		city_id: String,
		available_date: String,
		available_date_end: String,
		tags: [],
		company_id: String,
		gallery_images: String,
		proceed_url: String,
        is_active: Boolean,
        create_date:Number,
        avg_rating:Number,
        sight_id:String
        ,slider_id:String,
        views_count:Number
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Discount = mongoose.model("discount", schema);
  return Discount;
  
};