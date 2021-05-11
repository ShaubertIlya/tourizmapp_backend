const mongoose = require("mongoose");

const Roles = mongoose.model(
  "roles",
  new mongoose.Schema({
    id: 'ObjectId',
    name: String,
    create_date:Number
  })
);

module.exports = Roles;
