module.exports = mongoose => {
	
  var schema = mongoose.Schema(
      {
		id: 'ObjectId',
        email: String,
        password: String,
		new_password: String,
		avatar_url: String,
		full_name: String,
		gender: String,
		country_id: String,
		city_id: String,
		points: String,
		rang: String,
		favourite_articles: [],
		join_date: String,
		lang: String,
		change_code: String,
        active: Boolean
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
  
};