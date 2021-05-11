module.exports = mongoose => {
	
  var schema = mongoose.Schema(
      {
		id: String,
        name_en: String,
        name_ru: String,
		name_kz: String,
		name_es: String,
		name_zh: String,
		image_url: String,
		bin_iin: String,
		country_id: String, 
		city_id: String,
    webSite:String,
        is_active: Boolean,
        create_date:Number
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Company = mongoose.model("company", schema);
  return Company;
  
};