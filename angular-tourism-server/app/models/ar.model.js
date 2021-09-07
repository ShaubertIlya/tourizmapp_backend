module.exports = mongoose => {
	
	var tags = mongoose.Schema({
		
		key: String,
		tagId: String
		
	});
	
  var schema = mongoose.Schema(
      {
        file_url: String,
        file_url2: String,
        sight_id: String,
        main_header_en: String,
        main_header_ru: String,
        main_header_kz: String,
        main_header_es: String,
        main_header_zn: String,
        description_en: String,
        description_ru: String,
        description_kz: String,
        description_es: String,
        description_zh: String,
        sdescription_en: String,
        sdescription_ru: String,
        sdescription_kz: String,
        sdescription_es: String,
        sdescription_zh: String,
        is_active: Boolean,
        version:Number,
        create_date:Number,
        audio_kz: String,
        audio_ru: String,
        audio_en: String,
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Ar = mongoose.model("ar", schema);
  return Ar;
  
};