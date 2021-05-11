const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var fileExtension = require('file-extension')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname));
    
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname));
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;