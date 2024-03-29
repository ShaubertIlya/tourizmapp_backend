module.exports = mongoose => {
	
  var schema = mongoose.Schema(
      {
		id: 'ObjectId',
        name_en: String,
        name_ru: String,
        name_kz: String,
        name_es: String, 
        name_zh: String,
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
    discount_id:[],
		tags: [],
		slider_id: String,
		country_id: String,
    likeCount:Number,
		city_id: String,
		longitude: Number,
		latitude: Number,
		avg_rating: Number,
        is_active: Boolean,
        image_url:String,
        create_date:Number,
        views_count:Number
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sight = mongoose.model("sight", schema);
  return Sight;
  
};