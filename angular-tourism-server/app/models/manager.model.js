// module.exports = mongoose => {
	
//   var schema = mongoose.Schema(
//       {
// 		    id: 'ObjectId',
//         email: String,
//         password: String,
//         active: Boolean,
//         roles: [
//           {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Role"
//           }
//         ]
//       },
//       { timestamps: true }
//   );

//   schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Manager = mongoose.model("manager", schema);
//   return Manager;
  
// };


const mongoose = require("mongoose");

const Manager = mongoose.model(
  "manager",
  new mongoose.Schema({
    id: 'ObjectId',
    email: String,
    password: String,
    active: Boolean,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
      }
    ],
    create_date:Number
  })
);

module.exports = Manager;