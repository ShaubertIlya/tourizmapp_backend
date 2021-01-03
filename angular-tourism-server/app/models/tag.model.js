module.exports = mongoose => {
	
  var schema = mongoose.Schema(
      {
		id: 'ObjectId',
        name_en: String,
        name_ru: String,
        name_kz: String,
        name_es: String,
        name_zh: String,
        is_active: Boolean
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tag = mongoose.model("tag", schema);
  return Tag;
  
};