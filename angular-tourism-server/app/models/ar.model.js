module.exports = mongoose => {
	
	var tags = mongoose.Schema({
		
		key: String,
		tagId: String
		
	});
	
  var schema = mongoose.Schema(
      {
        file_url: String,
        sight_id: String,
        main_header_en: String,
        main_header_ru: String,
        main_header_kz: String,
        main_header_es: String,
        main_header_zn: String,
        is_active: Boolean
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