const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./manager.model.js")(mongoose);
db.manager = require("./manager.model");
db.vr = require("./vr.model");

const r=  require("./manager.model");
db.role = require("./role.model");


db.ROLES = ["super_admin", "manager"];
// delete mongoose.models['manager'];
// delete mongoose.connection.collections['manager'];
// delete mongoose.modelSchemas['manager'];
module.exports = db;