module.exports = mongoose => {
	
	var tags = mongoose.Schema({
		
		key: String,
		tagId: String
		
	});
	
  var schema = mongoose.Schema(
      {
        image_url: String,
        main_header_en: String,
        main_header_ru: String,
        main_header_kz: String,
        main_header_es: String,
        main_header_zn: String,
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
		rating: String,
		likes_count: String,
		tags: [],
		gallery_images: String,
        is_active: Boolean
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Article = mongoose.model("article", schema);
  return Article;
  
};