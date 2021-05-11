const express = require("express");
const path = require("path");
const fs = require("fs");

const dateFormat  = require("dateformat");
const bodyParser = require("body-parser");
const cors = require("cors");
var multer = require("multer");
var session = require("express-session");
var fileExtension = require('file-extension')
const nodemailer = require('nodemailer');
const app = express();

var corsOptions = {
  origin: "http://185.113.134.76:3000",
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
    , cookie: { maxAge: 60000 }
  })
);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/* FileUpload settings */
const PATH = "/var/www/html/uploads";
global.__basedir = __dirname;
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// let upload = multer({
//   storage: storage,
// });


// call all the required packages





const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = require("./app/models/role.model.js");
const Role = db;
mongoose
  .connect("mongodb://localhost:27017/asar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB OK");
    
    console.log(global.__basedir);

  // initial();
  })
  .catch((err) => {
    console.log("DB ERROR", err);
    process.exit();
  });

const Manager = require("./app/models/manager.model.js");
const Vr = require("./app/models/vr.model.js");
const Comments = require("./app/models/comments.model.js");
const User = require("./app/models/user.model.js")(mongoose);
const Article = require("./app/models/article.model.js")(mongoose);
const Discount = require("./app/models/discount.model.js")(mongoose);
const Tag = require("./app/models/tag.model.js")(mongoose);
const Country = require("./app/models/country.model.js")(mongoose);
const City = require("./app/models/city.model.js")(mongoose);
const Company = require("./app/models/company.model.js")(mongoose);
const Sight = require("./app/models/sight.model.js")(mongoose);
const Ar = require("./app/models/ar.model.js")(mongoose);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

function initial() {
  
      new Role({
        name: "manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'manager' to roles collection");
      });

      new Role({
        name: "super_admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'super_admin' to roles collection");
      });
      Role.find({name:"super_admin"}, function(err, users) {

        new Manager({
          email: "super_admin@gmail.com",
          password:"test123",
          active:true,
          roles:[users.id]
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
      });
      console.log("added 'user' to roles collection");


        console.log("added 'super_admin' to roles collection");
      });
}

// Configure Storage
var storage = multer.diskStorage({
  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
      cb(null, 'my_uploaded_files')
  },
  // Setting name of file saved
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
  }
})
var upload = multer({
storage: storage,
limits: {
    // Setting Image Size Limit to 2MBs
    fileSize: 2000000
},
fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        //Error 
        cb(new Error('Please upload JPG and PNG images only!'))
    }
    //Success 
    cb(undefined, true)
}
})
app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
const file = req.file
console.log(req);
if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
}
res.status(200).send({
    statusCode: 200,
    status: 'success',
    uploadedFile: file
})

}, (error, req, res, next) => {
res.status(400).send({
    error: error.message
})
})
//Login to admin side
app.post('/login', function (request, response) {


	var email = request.body.email;
  var password = request.body.password;
	// if (!email) {
		
	// 	response.json({ status: 400, 'message': 'Please enter your E-mail'});
	// 	response.end();
		
	// } 

  Manager.findOne({ email: request.body.email } ,function (user,err) {
    response.json({ status: 200,"user":user,email:email });

    if (!err) {
      response.json({ status: 200,"user:user":"sad" });
    } else {
     
        request.session.loggedIn = true;
	      request.session.adminEmail = email;
        request.session.role = "super_admin";
	      response.json({ status: 200,"user:user":user });
	      response.end();
    }
});
	
	
	
});

app.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
        res.json({ status: 500,message:err});
      }
      res.json({ status: 200,message:"asdsa"});
    });

});
/* FileUpload */
app.post("/api/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    console.log("File is available!");
    return res.send(req.file.filename);
  }
});

app.get("/check", (request, response) => {
  if (!request.session.loggedIn) {
    response.json({ status: 400 });
  } else {
    response.json({ status: 200 });
  }
});
app.get("/Roles", (request, response) => {
  Role.find({}, function(err, users) {

 

    response.send(users);  
  });
 
});


/* MANAGERS */
app.get("/api/comments", (request, response) => {
 
  Comments.find({})
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/comments/:id", (request, response) => {
  Comments.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/comments/:id", (request, response) => {
  Comments.findByIdAndRemove(request.params.id)
    .then((data) => {
      Comments.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/comments/:id", (request, response) => {
  console.log(request.body);
  Comments.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Comments.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/comments", (request, response) => {
 var contentid = "";
 
///
Sight.findById(request.body.content_id)
.then((data) => {
  if(data != null && data != undefined){
 // contentid = data.name_en;
  console.log(data);
  console.log(data.name_en);
  const comments = new Comments({
    text: request.body.text,
    content_id: request.body.content_id,
    content_name: data.name_en,
    rating: request.body.rating,
    status:request.body.status,
    answer:request.body.answer,
    userToken:request.body.userToken,
    createDate:request.body.createDate,
  });
  console.log(comments);
  comments
      .save(comments)
      .then((data) => {
        response.send(data);
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message || "An error has occured",
        });
      });
  }
})
.catch((err) => {
  response.status(500).send({
    response: err.message || "An error has occured",
  });
});
Article.findById(request.body.content_id)
.then((data) => {
  if(data != null && data != undefined){
 contentid = data.main_header_en;
 console.log(data);
 const comments = new Comments({
  text: request.body.text,
  content_id: request.body.content_id,
  content_name: data.main_header_en,
  rating: request.body.rating,
  status:request.body.status,
  answer:request.body.answer,
  userToken:request.body.userToken,
  createDate:request.body.createDate,
});
console.log(comments);
comments
    .save(comments)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
  }
})
.catch((err) => {
  response.status(500).send({
    response: err.message || "An error has occured",
  });
});
Discount.findById(request.body.content_id)
.then((data) => {
  if(data != null && data != undefined){
  contentid = data.main_header_en;
  console.log(data);
  const comments = new Comments({
    text: request.body.text,
    content_id: request.body.content_id,
    content_name: data.main_header_en,
    rating: request.body.rating,
    status:request.body.status,
    answer:request.body.answer,
    userToken:request.body.userToken,
    createDate:request.body.createDate,
  });
  console.log(comments);
  comments
      .save(comments)
      .then((data) => {
        response.send(data);
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message || "An error has occured",
        });
      });
  }
})
.catch((err) => {
  response.status(500).send({
    response: err.message || "An error has occured",
  });
});
///
console.log(contentid +"|"+" "+"344");

});


/* MANAGERS */
app.get("/api/managers", (request, response) => {
  var email = request.query.email;
  var condition = email
    ? { email: { $regex: new RegExp(email), $options: "i" } }
    : {};
    var authorities = [];
  Manager.find(condition)
    .then((data) => {
     
    
      
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/managers/:id", (request, response) => {
  Manager.findById(request.params.id)
    .then((data) => {
      console.log(data);
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/managers/:id", (request, response) => {
  Manager.findByIdAndRemove(request.params.id)
    .then((data) => {
      Manager.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/managers/:id", (request, response) => {
  response.send(request.body);
  Manager.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Manager.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/managers", (request, response) => {
  const manager = new Manager({
    email: request.body.email,
    password: request.body.password,
    active: request.body.active,
    roles:request.body.roles
  });
console.log(manager);
  manager
    .save(manager)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});





/* VR */
app.get("/api/vr", (request, response) => {
 
  var query = request.query.query;
  var sightId = request.query.sightId;
  var condition = query
    ? { main_header_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  if (sightId) {
    condition = sightId ? { sight_id: sightId } : {};
  }

  Vr.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/vr/:id", (request, response) => {
  Vr.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/vr/:id", (request, response) => {
  Vr.findByIdAndRemove(request.params.id)
    .then((data) => {
      Vr.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/vr/:id", (request, response) => {
  console.log(request.body);
  Vr.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Vr.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/vr", (request, response) => {
  const vr = new Vr({
    sight_id: request.body.sight_id,
    main_header_en: request.body.main_header_en,
    main_header_ru: request.body.main_header_ru,
    main_header_kz: request.body.main_header_kz,
    main_header_es: request.body.main_header_es,
    main_header_zh: request.body.main_header_zh,
    url: request.body.url,
    is_active: request.body.active ? request.body.active : false
  });
console.log(vr);
  vr.save(vr)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});


/* USERS */
app.get("/api/users", (request, response) => {
  var email = request.query.email;
  var condition = email
    ? { email: { $regex: new RegExp(email), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/users/:id", (request, response) => {
  User.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/users/:id", (request, response) => {
  User.findByIdAndRemove(request.params.id)
    .then((data) => {
      User.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/users/:id", (request, response) => {
  User.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      User.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/users", (request, response) => {
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    avatar: request.body.avatar,
    full_name: request.body.full_name,
    gender: request.body.gender,
    country_id: request.body.country_id,
    city_id: request.body.city_id,
    points: request.body.points,
    rang: request.body.rang,
    active: request.body.active ? request.body.active : false,
  });

  user
    .save(user)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* AR Content */
app.get("/api/ar", (request, response) => {
  var query = request.query.query;
  var sightId = request.query.sightId;
  var condition = query
    ? { main_header_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  if (sightId) {
    condition = sightId ? { sight_id: sightId } : {};
  }

  Ar.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/ar/:id", (request, response) => {
  Ar.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/ar/:id", (request, response) => {
  Ar.findByIdAndRemove(request.params.id)
    .then((data) => {
      Ar.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/ar/:id", (request, response) => {
  console.log(request.body);
  Ar.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Ar.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/ar", (request, response) => {
  const ar = new Ar({
    file_url: "1",
    sight_id: request.body.sight_id,
    main_header_en: request.body.main_header_en,
    main_header_ru: request.body.main_header_ru,
    main_header_kz: request.body.main_header_kz,
    main_header_es: request.body.main_header_es,
    main_header_zh: request.body.main_header_zh,
    is_active: request.body.is_active,
  });
  console.log(ar);
  ar.save(ar)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* ARTICLES */
app.get("/api/articles", (request, response) => {
  var query = request.query.query;
  var tag = request.query.tag;
  var country = request.query.country;
  var condition = query
    ? { main_header_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  if (tag) {
    condition = tag
      ? { tags: { $regex: new RegExp(query), $options: "i" } }
      : {};
  }
  if (country) {
    condition = country ? { country_id: country } : {};
  }

  Article.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/articles/:id", (request, response) => {
  Article.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/articles/:id", (request, response) => {
  Article.findByIdAndRemove(request.params.id)
    .then((data) => {
      Article.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/articles/:id", (request, response) => {
  Article.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Article.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/articles", (request, response) => {
  image = request.body.image_url.replace('\\', '/');
  const article = new Article({
    image_url: request.protocol + '://' + request.get('host') + "/"+image,
    country_id: request.body.country_id,
    city_id: request.body.city_id,
    main_header_en: request.body.main_header_en,
    main_header_ru: request.body.main_header_ru,
    main_header_kz: request.body.main_header_kz,
    main_header_es: request.body.main_header_es,
    main_header_zh: request.body.main_header_zh,
    rating: request.body.rating,
  
    likes_count: 0,
    tags: request.body.tags,
    related_sights: request.body.related_sights,
    sdescription_en: request.body.description_en,
    sdescription_ru: request.body.description_ru,
    sdescription_kz: request.body.description_kz,
    sdescription_es: request.body.description_es,
    sdescription_zh: request.body.description_zh,
    description_en: request.body.description_en,
    description_ru: request.body.description_ru,
    description_kz: request.body.description_kz,
    description_es: request.body.description_es,
    description_zh: request.body.description_zh,
    gallery_images: "",
    is_active: request.body.is_active ? request.body.is_active : false,
  });
console.log(article);
  article
    .save(article)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});
app.get('/my_uploaded_files/:name', (req, res, next) => {
  var query = req.params.name;
      // stream the image back by loading the file
      res.setHeader('Content-Type', 'image/jpeg');
      fs.createReadStream(path.join('my_uploaded_files', query)).pipe(res);
  
});
/* SIGHTS */
app.get("/api/sights", (request, response) => {
  var query = request.query.query;
  var tag = request.query.tag;
  var country = request.query.country;
  var condition = query
    ? { main_header_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  if (tag) {
    condition = tag
      ? { tags: { $regex: new RegExp(query), $options: "i" } }
      : {};
  }
  if (country) {
    condition = country ? { country_id: country } : {};
  }

  Sight.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/sights/:id", (request, response) => {
  Sight.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/sights/:id", (request, response) => {
  Sight.findByIdAndRemove(request.params.id)
    .then((data) => {
      Sight.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/sights/:id", (request, response) => {
  Sight.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Sight.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/sights", (request, response) => {
  image = request.body.image_url.replace('\\', '/');
  const sight = new Sight({
    image_url:request.protocol + '://' + request.get('host') + "/"+image,
    country_id: request.body.country_id,
    city_id: request.body.city_id,
    name_en: request.body.name_en,
    name_ru: request.body.name_ru,
    name_kz: request.body.name_kz,
    name_es: request.body.name_es,
    name_zh: request.body.name_zh,
    rating: request.body.rating,
    tags: request.body.tags,
    sdescription_en: request.body.description_en,
    sdescription_ru: request.body.description_ru,
    sdescription_kz: request.body.description_kz,
    sdescription_es: request.body.description_es,
    sdescription_zh: request.body.description_zh,
    description_en: request.body.description_en,
    description_ru: request.body.description_ru,
    description_kz: request.body.description_kz,
    description_es: request.body.description_es,
    description_zh: request.body.description_zh,
    gallery_images: "",
    longitude: request.body.longitude,
    latitude: request.body.latitude,
    is_active: request.body.is_active ? request.body.is_active : false,
  });
console.log(sight);
  sight
    .save(sight)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* DISCOUNTS */
app.get("/api/discounts", (request, response) => {
  var query = request.query.query;
  var tag = request.query.tag;
  var country = request.query.country;
  var condition = query
    ? { main_header_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  if (tag) {
    condition = tag
      ? { tags: { $regex: new RegExp(query), $options: "i" } }
      : {};
  }
  if (country) {
    condition = country ? { country_id: country } : {};
  }

  Discount.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/discounts/:id", (request, response) => {
  Discount.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/discounts/:id", (request, response) => {
  Discount.findByIdAndRemove(request.params.id)
    .then((data) => {
      Discount.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/discounts/:id", (request, response) => {
  Discount.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Discount.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/discounts", (request, response) => {
  image = request.body.image_url.replace('\\', '/');
  const discount = new Discount({
    image_url: request.protocol + '://' + request.get('host') + "/"+image,
    country_id: request.body.country_id,
    city_id: request.body.city_id,
    main_header_en: request.body.main_header_en,
    main_header_ru: request.body.main_header_ru,
    main_header_kz: request.body.main_header_kz,
    main_header_es: request.body.main_header_es,
    main_header_zh: request.body.main_header_zh,
    available_date: request.body.available_date,
    available_date_end: request.body.available_date_end,
    tags: request.body.tags,
    company_id: request.body.company_id,
    related_sights: request.body.related_sights,
    sdescription_en: request.body.description_en,
    sdescription_ru: request.body.description_ru,
    sdescription_kz: request.body.description_kz,
    sdescription_es: request.body.description_es,
    sdescription_zh: request.body.description_zh,
    description_en: request.body.description_en,
    description_ru: request.body.description_ru,
    description_kz: request.body.description_kz,
    description_es: request.body.description_es,
    description_zh: request.body.description_zh,
    gallery_images: "",
    proceed_url: request.body.proceed_url,
    is_active: request.body.is_active ? request.body.is_active : false,
  });

  discount
    .save(discount)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* TAGS */
app.get("/api/tags", (request, response) => {
  var query = request.query.query;
  var condition = query
    ? { name_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  Tag.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/tags/:id", (request, response) => {
  Tag.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/tags/:id", (request, response) => {
  Tag.findByIdAndRemove(request.params.id)
    .then((data) => {
      Tag.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/tags/:id", (request, response) => {
  Tag.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Tag.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/tags", (request, response) => {
  const tag = new Tag({
    name_en: request.body.name_en,
    name_ru: request.body.name_ru,
    name_kz: request.body.name_kz,
    name_es: request.body.name_es,
    name_zh: request.body.name_zh,
    is_active: request.body.is_active,
  });

  tag
    .save(tag)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* USERS. API */

/* ----------------------------------------------------- */
/* REGISTRATION */
/* ----------------------------------------------------- */
app.post("/api/v1/users/register", (request, response) => {
  var u_email = request.body.email;
  var u_pass = request.body.pass;
  var u_confirm = request.body.confirmation;

  /* Validation */
  if (!u_email || !u_pass || !u_confirm) {
    response.json({
      status: 400,
      message: "Missing Required Parameters: email / pass / confirmation",
    });
  }
  if (u_pass !== u_confirm) {
    response.json({ status: 400, message: "Password Mismatch" });
  }

  User.findOne({ email: u_email }, function (err, result) {
    if (result) {
      response.json({ status: 400, message: "Email Exists" });
    } else {
      /* Saving User */
      userData = new User({
        email: u_email,
        password: u_pass,
        avatar_url: "",
        full_name: "",
        gender: "",
        country_id: "",
        city_id: "",
        points: "",
        rang: "",
        active: false,
      });

      userData.save(function (err, newUser) {
        response.json({ status: 200, userId: newUser._id, message: "Success" });
      });
    }
  });
});

/* ----------------------------------------------------- */
/* AUTHORIZATION */
/* ----------------------------------------------------- */
app.post("/api/v1/users/login", (request, response) => {
  var u_email = request.body.email;
  var u_pass = request.body.pass;

  /* Validation */
  if (!u_email || !u_pass) {
    response.json({
      status: 400,
      message: "Missing Required Parameters: email / pass",
    });
  }

  /* Check User Exists */
  User.findOne({ email: u_email, password: u_pass }, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Credentials" });
    } else {
      /* Profile Data */
      profileData = {
        email: u_email,
        image_url: result.avatar_url,
        nickname: result.full_name,
        rang: result.rang,
        points: result.points,
        gender: result.gender,
        country_id: result.country_id,
        country: result.country_id,
        city_id: result.city_id,
        city: result.city_id,
        is_active: result.active,
      };

      /* Generate Token */
      var u_token = result._id;
      response.json({
        status: 400,
        token: u_token,
        profile: profileData,
        message: "Success",
      });
    }
  });
});

/* ----------------------------------------------------- */
/* UPDATE PROFILE */
/* ----------------------------------------------------- */
app.put("/api/v1/users/update", (request, response) => {
  var u_token = request.body.token;
  var u_full_name = request.body.full_name;
  var u_gender = request.body.gender;
  var u_country_id = request.body.country_id;
  var u_city_id = request.body.city_id;
  var u_avatar = request.body.avatar;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  if (!u_full_name || !u_gender || !u_country_id || !u_city_id) {
    response.json({
      status: 400,
      message:
        "Missing Required Parameters: full_name / gender / country_id / city_id",
    });
  }

  if (u_gender !== "male" && u_gender !== "female") {
    response.json({
      status: 400,
      message: "Invalid parameter gender. Please choose: male / female",
    });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Updating Profile */
      userData = {
        avatar_url: u_avatar,
        full_name: u_full_name,
        gender: u_gender,
        country_id: u_country_id,
        city_id: u_city_id,
      };

      User.findByIdAndUpdate(
        u_token,
        userData,
        { useFindAndModify: false },
        function (err, result) {
          if (err) {
            response.json({
              status: 400,
              message: "An error has occured! Please try again later!",
            });
          } else {
            response.json({ status: 200, message: "Success" });
          }
        }
      );
    }
  });
});

/* ----------------------------------------------------- */
/* UPDATE PASSWORD */
/* ----------------------------------------------------- */
app.put("/api/v1/users/updatePassword", (request, response) => {
  var u_token = request.body.token;
  var u_current = request.body.current;
  var u_new = request.body.new;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  if (!u_current || !u_new) {
    response.json({
      status: 400,
      message: "Missing Required Parameters: current / new",
    });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      if (result.password !== u_current) {
        response.json({ status: 400, message: "Wrong Current Password" });
      }

      var random = "1256";
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        //secure: false, // true for 465, false for other ports
        auth: {
          user: "43049b845287f1",
          pass: "efa8c53822ca49" // generated ethereal password
        }
        // ,tls:{
        //   rejectUnauthorized:false
        // }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: 'Test@gmail.com', // sender address
          to: result.email, // list of receivers
          subject: 'Reset Password', // Subject line
          text: 'Hello world?', // plain text body
          html:  random // html body
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              response.json({ status: 400, message: error });
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
           // /* Updating Profile */
      userData = {
        new_password: u_new,
        change_code: random,
      };

      User.findByIdAndUpdate(
        u_token,
        userData,
        { useFindAndModify: false },
        function (err, result) {
          if (err) {
            response.json({
              status: 400,
              message: "An error has occured! Please try again later!",
            });
          } else {
            response.json({ status: 200, code: random, message: "Email has sent!" });
          }
        }
      );
        });    


     
    }
  });
});

/* ----------------------------------------------------- */
/* CONFIRM UPDATE PASSWORD */
/* ----------------------------------------------------- */
app.put("/api/v1/users/updatePassword/confirm", (request, response) => {
  var u_token = request.body.token;
  var u_code = request.body.code;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  // if (!u_current || !u_new) {
  //   response.json({
  //     status: 400,
  //     message: "Missing Required Parameters: current / new",
  //   });
  // }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      if (result.change_code !== u_code) {
        response.json({ status: 400, message: "Wrong Verification Code" });
      } else {
        /* Updating Profile */
        userData = {
          password: result.new_password,
          new_password: "",
          change_code: "",
        };

        User.findByIdAndUpdate(
          u_token,
          userData,
          { useFindAndModify: false },
          function (err, result) {
            if (err) {
              response.json({
                status: 400,
                message: "An error has occured! Please try again later!",
              });
            } else {
              response.json({ status: 200, code: u_code, message: "Success" });
            }
          }
        );
      }
    }
  });
});

/* ----------------------------------------------------- */
/* GET PROFILE */
/* ----------------------------------------------------- */
app.get("/api/v1/users/profile", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Profile Data */
      profileData = {
        email: result.email,
        image_url: result.avatar_url,
        nickname: result.full_name,
        rang: result.rang,
        points: result.points,
        gender: result.gender,
        country_id: result.country_id,
        country: result.country_id,
        city_id: result.city_id,
        city: result.city_id,
        is_active: result.active,
      };

      /* Generate Token */
      var u_token = result._id;
      response.json({
        status: 400,
        token: u_token,
        profile: profileData,
        message: "Success",
      });
    }
  });
});

/* -----------------------------------------------------*/
/* Comments Api */
app.get("/api/v1/comments/:content_id", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
  Comments.find({ content_id: request.params.content_id })
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      })
    })
  }
});
});

app.post("/api/v1/comments", (request, response) => {
  var contentid = "";
  var u_token = request.query.token;
  var datetime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
 ///
 Sight.findById(request.body.content_id)
 .then((data) => {
   if(data != null && data != undefined){
  // contentid = data.name_en;
   console.log(data);
   console.log(data.name_en);
   const comments = new Comments({
     text: request.body.text,
     content_id: request.body.content_id,
     content_name: data.name_en,
     rating: request.body.rating,
     status:false,
     answer:"",
     userToken:u_token,
     createDate:datetime,
   });
   console.log(comments);
   comments
       .save(comments)
       .then((data) => {
         response.send(data);
       })
       .catch((err) => {
         response.status(500).send({
           message: err.message || "An error has occured",
         });
       });
   }
 })
 .catch((err) => {
   response.status(500).send({
     response: err.message || "An error has occured",
   });
 });
 Article.findById(request.body.content_id)
 .then((data) => {
   if(data != null && data != undefined){
  contentid = data.main_header_en;
  console.log(data);
  const comments = new Comments({
   text: request.body.text,
   content_id: request.body.content_id,
   content_name: data.main_header_en,
   rating: request.body.rating,
   status:false,
   answer:"",
   userToken:u_token,
   createDate:datetime,
 });
 console.log(comments);
 comments
     .save(comments)
     .then((data) => {
       response.send(data);
     })
     .catch((err) => {
       response.status(500).send({
         message: err.message || "An error has occured",
       });
     });
   }
 })
 .catch((err) => {
   response.status(500).send({
     response: err.message || "An error has occured",
   });
 });
 Discount.findById(request.body.content_id)
 .then((data) => {
   if(data != null && data != undefined){
   contentid = data.main_header_en;
   console.log(data);
   const comments = new Comments({
     text: request.body.text,
     content_id: request.body.content_id,
     content_name: data.main_header_en,
     rating: request.body.rating,
     status:false,
     answer:"",
     userToken:u_token,
     createDate:datetime,
   });
   console.log(comments);
   comments
       .save(comments)
       .then((data) => {
         response.send(data);
       })
       .catch((err) => {
         response.status(500).send({
           message: err.message || "An error has occured",
         });
       });
   }
 })
 .catch((err) => {
   response.status(500).send({
     response: err.message || "An error has occured",
   });
 });
 ///
 console.log(contentid +"|"+" "+"344");
}
 });
});
/* ----------------------------------------------------- */
/* COUNTRIES & CITIES. API */
/* ----------------------------------------------------- */
/* Get List of Countries */
/* ----------------------------------------------------- */
app.get("/api/v1/getCountries", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      Country.find({}, function (err, result) {
        response.json(result);
      });
    }
  });
});
app.get("/api/v1/getCities/:countryId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          City.find(
            { country_id: request.params.countryId },
            function (err2, result2) {
              response.json(result2);
            }
          );
        }
      });
    }
  });
});

/* ----------------------------------------------------- */
/* ARTICLES & DISCOUNTS. API */
/* ----------------------------------------------------- */
/* Get List of all Articles by the countryId */
/* ----------------------------------------------------- */
app.get("/api/v1/getArticles", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      Article.find(function (err2, result2) {
        response.json(result2);
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get List of Articles by the countryId */
/* ----------------------------------------------------- */
app.get("/api/v1/getArticles/:countryId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          Article.find(
            { country_id: request.params.countryId },
            function (err2, result2) {
              response.json(result2);
            }
          );
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get List of Articles by the countryId and the cityId */
/* ----------------------------------------------------- */
app.get("/api/v1/getArticles/:countryId/:cityId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          /* Check City Exists */
          City.findById(request.params.cityId, function (err1, result1) {
            if (!result1) {
              response.json({ status: 400, message: "Invalid cityId" });
            } else {
              Article.find(
                {
                  country_id: request.params.countryId,
                  city_id: request.params.cityId,
                },
                function (err2, result2) {
                  response.json(result2);
                }
              );
            }
          });
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Put an article to favorites */
/* ----------------------------------------------------- */
app.post("/api/v1/addArticleToFavorites/:articleId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Article Exists */
      Article.findById(request.params.articleId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid articleId" });
        } else {
          function removeA(arr) {
            var what,
              a = arguments,
              L = a.length,
              ax;
            while (L > 1 && arr.length) {
              what = a[--L];
              while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
              }
            }
            return arr;
          }

          /* Updating Profile */
          favs = result.favourite_articles;
          if (!favs) {
            favs = [];
          }

          this_exists = false;

          if (favs.includes(request.params.articleId)) {
            response.json({ status: 400, message: "Added before!" });
          } else {
            //removeA(favs, request.params.articleId);
            favs.push(request.params.articleId);

            userData = {
              favourite_articles: favs,
            };

            User.findByIdAndUpdate(
              u_token,
              userData,
              { useFindAndModify: false },
              function (err, result) {
                if (err) {
                  response.json({
                    status: 400,
                    message: "An error has occured! Please try again later!",
                  });
                } else {
                  response.json({ status: 200, message: "Success" });
                }
              }
            );
          }
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Remove an article from favorites */
/* ----------------------------------------------------- */
app.delete(
  "/api/v1/removeArticleFromFavorites/:articleId",
  (request, response) => {
    var u_token = request.query.token;

    /* Validation */
    if (!u_token) {
      response.json({ status: 400, message: "Unauthorized" });
    }

    /* Check User Exists */
    User.findById(u_token, function (err, result) {
      if (!result) {
        response.json({ status: 400, message: "Invalid Token" });
      } else {
        /* Check Article Exists */
        Article.findById(request.params.articleId, function (err1, result1) {
          if (!result1) {
            response.json({ status: 400, message: "Invalid articleId" });
          } else {
            function removeA(arr) {
              var what,
                a = arguments,
                L = a.length,
                ax;
              while (L > 1 && arr.length) {
                what = a[--L];
                while ((ax = arr.indexOf(what)) !== -1) {
                  arr.splice(ax, 1);
                }
              }
              return arr;
            }

            var this_favor_articles = result.favourite_articles;
            removeA(this_favor_articles, request.params.articleId);

            userData = {
              favourite_articles: this_favor_articles,
            };

            User.findByIdAndUpdate(
              u_token,
              userData,
              { useFindAndModify: false },
              function (err, result) {
                if (err) {
                  response.json({
                    status: 400,
                    message: "An error has occured! Please try again later!",
                  });
                } else {
                  response.json({ status: 200, message: "Success" });
                }
              }
            );
            response.json({ status: 400, message: "Success" });
          }
        });
      }
    });
  }
);
/* ----------------------------------------------------- */
/* Get List of all Discounts by the countryId */
/* ----------------------------------------------------- */
app.get("/api/v1/getDiscounts", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      Discount.find(function (err2, result2) {
        response.json(result2);
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get List of Discounts by the countryId */
/* ----------------------------------------------------- */
app.get("/api/v1/getDiscounts/:countryId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          Discount.find(
            { country_id: request.params.countryId },
            function (err2, result2) {
              response.json(result2);
            }
          );
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get List of Discounts by the countryId and the cityId */
/* ----------------------------------------------------- */
app.get("/api/v1/getDiscounts/:countryId/:cityId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          /* Check City Exists */
          City.findById(request.params.cityId, function (err1, result1) {
            if (!result1) {
              response.json({ status: 400, message: "Invalid cityId" });
            } else {
              Discount.find(
                {
                  country_id: request.params.countryId,
                  city_id: request.params.cityId,
                },
                function (err2, result2) {
                  response.json(result2);
                }
              );
            }
          });
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* TAGS & COMPANIES  API */
/* ----------------------------------------------------- */
/* Get List of All Tags */
/* ----------------------------------------------------- */
app.get("/api/v1/getTags", (request, response) => {
  var u_token = request.query.token;
  var query = request.body.query;
  var condition = query
    ? { name_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      Tag.find(condition, function (err2, result2) {
        response.json(result2);
      });
    }
  });
});

/* ----------------------------------------------------- */
/* Get List of All Companies */
/* ----------------------------------------------------- */
app.get("/api/v1/getCompanies", (request, response) => {
  var u_token = request.query.token;
  var query = request.body.query;
  var condition = query
    ? { name_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      Company.find(condition, function (err2, result2) {
        response.json(result2);
      });
    }
  });
});

/* ----------------------------------------------------- */
/* SIGHTS. API */
/* ----------------------------------------------------- */
/* Get List of all Sights by the countryId */
/* ----------------------------------------------------- */
app.get("/api/v1/getSights", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      Sight.find(function (err2, result2) {
        response.json(result2);
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get List of Sights by the countryId */
/* ----------------------------------------------------- */
app.get("/api/v1/getSights/:countryId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          Sight.find(
            { country_id: request.params.countryId },
            function (err2, result2) {
              response.json(result2);
            }
          );
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get List of Sights by the countryId and the cityId */
/* ----------------------------------------------------- */
app.get("/api/v1/getSights/:countryId/:cityId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Country Exists */
      Country.findById(request.params.countryId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid countryId" });
        } else {
          /* Check City Exists */
          City.findById(request.params.cityId, function (err1, result1) {
            if (!result1) {
              response.json({ status: 400, message: "Invalid cityId" });
            } else {
              Sight.find(
                {
                  country_id: request.params.countryId,
                  city_id: request.params.cityId,
                },
                function (err2, result2) {
                  response.json(result2);
                }
              );
            }
          });
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get One Sight */
/* ----------------------------------------------------- */
app.get("/api/v1/getSight/:sightId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Article Exists */
      Sight.findById(request.params.sightId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid sightId" });
        } else {
          response.json(result1);
        }
      });
    }
  });
});

app.get("/api/v1/getVr/:sightId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Article Exists */
      Vr.find({sight_id:request.params.sightId}, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid sightId" });
        } else {
          response.json(result1);
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Put an article to favorites */
/* ----------------------------------------------------- */
app.post("/api/v1/addSightToFavorites/:sightId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Article Exists */
      Sight.findById(request.params.sightId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid sightId" });
        } else {
          function removeA(arr) {
            var what,
              a = arguments,
              L = a.length,
              ax;
            while (L > 1 && arr.length) {
              what = a[--L];
              while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
              }
            }
            return arr;
          }

          /* Updating Profile */
          favs = result.favourite_sights;
          if (!favs) {
            favs = [];
          }

          this_exists = false;

          if (favs.includes(request.params.articleId)) {
            response.json({ status: 400, message: "Added before!" });
          } else {
            //removeA(favs, request.params.articleId);
            favs.push(request.params.articleId);

            userData = {
              favourite_sights: favs,
            };

            User.findByIdAndUpdate(
              u_token,
              userData,
              { useFindAndModify: false },
              function (err, result) {
                if (err) {
                  response.json({
                    status: 400,
                    message: "An error has occured! Please try again later!",
                  });
                } else {
                  response.json({ status: 200, message: "Success" });
                }
              }
            );
          }
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Remove a sight from favorites */
/* ----------------------------------------------------- */
app.delete("/api/v1/removeSightFromFavorites/:sightId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Sight Exists */
      Sight.findById(request.params.sightId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid sightId" });
        } else {
          function removeA(arr) {
            var what,
              a = arguments,
              L = a.length,
              ax;
            while (L > 1 && arr.length) {
              what = a[--L];
              while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
              }
            }
            return arr;
          }

          var this_favsights = result.favourite_sights;
          removeA(this_favsights, request.params.articleId);

          userData = {
            favourite_sights: this_favsights,
          };

          User.findByIdAndUpdate(
            u_token,
            userData,
            { useFindAndModify: false },
            function (err, result) {
              if (err) {
                response.json({
                  status: 400,
                  message: "An error has occured! Please try again later!",
                });
              } else {
                response.json({ status: 200, message: "Success" });
              }
            }
          );
          response.json({ status: 400, message: "Success" });
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* AR & VR CONTENT */
/* ----------------------------------------------------- */
/* Get List of all AR Content Items by the sightId */
/* ----------------------------------------------------- */
app.get("/api/v1/getRealityList/AR/:sightId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Sight Exists */
      Sight.findById(request.params.sightId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid sightId" });
        } else {
          Ar.find(
            { sight_id: request.params.sightId },
            function (err2, result2) {
              response.json(result2);
            }
          );
        }
      });
    }
  });
});
/* ----------------------------------------------------- */
/* Get AR Information by ID */
/* ----------------------------------------------------- */
app.get("/api/v1/getReality/AR/:itemId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check AR Exists */
      Ar.findById(request.params.itemId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid itemId" });
        } else {
          response.json(result1);
        }
      });
    }
  });
});
app.get("/api/v1/getRealityList/VR/:sightId", (request, response) => {
  var u_token = request.query.token;

  /* Validation */
  if (!u_token) {
    response.json({ status: 400, message: "Unauthorized" });
  }

  /* Check User Exists */
  User.findById(u_token, function (err, result) {
    if (!result) {
      response.json({ status: 400, message: "Invalid Token" });
    } else {
      /* Check Sight Exists */
      Sight.findById(request.params.sightId, function (err1, result1) {
        if (!result1) {
          response.json({ status: 400, message: "Invalid sightId" });
        } else {
          Vr.find(
            { sight_id: request.params.sightId },
            function (err2, result2) {
              response.json(result2);
            }
          );
        }
      });
    }
  });
});
/* COUNTRIES */
app.get("/api/countries", (request, response) => {
  var query = request.query.query;
  var condition = query
    ? { name_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  Country.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/countries/:id", (request, response) => {
  Country.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/countries/:id", (request, response) => {
  Country.findByIdAndRemove(request.params.id)
    .then((data) => {
      Country.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/countries/:id", (request, response) => {
  Country.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Country.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/countries", (request, response) => {
  const country = new Country({
    name_en: request.body.name_en,
    name_ru: request.body.name_ru,
    name_kz: request.body.name_kz,
    name_es: request.body.name_es,
    name_zh: request.body.name_zh,
    is_active: request.body.is_active,
  });

  country
    .save(country)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* CITIES */
app.get("/api/cities", (request, response) => {
  var query = request.query.query;
  var countryId = request.query.countryId;
  var condition = query
    ? { name_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  if (countryId) {
    condition = countryId ? { country_id: countryId } : {};
  }

  City.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/cities/:id", (request, response) => {
  City.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/cities/:id", (request, response) => {
  City.findByIdAndRemove(request.params.id)
    .then((data) => {
      City.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/cities/:id", (request, response) => {
  City.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      City.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/cities", (request, response) => {
  const city = new City({
    country_id: request.body.country_id,
    name_en: request.body.name_en,
    name_ru: request.body.name_ru,
    name_kz: request.body.name_kz,
    name_es: request.body.name_es,
    name_zh: request.body.name_zh,
    is_active: request.body.is_active,
  });

  city
    .save(city)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

/* COMPANIES */
app.get("/api/companies", (request, response) => {
  var query = request.query.query;
  var condition = query
    ? { name_en: { $regex: new RegExp(query), $options: "i" } }
    : {};

  Company.find(condition)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.get("/api/companies/:id", (request, response) => {
  Company.findById(request.params.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        response: err.message || "An error has occured",
      });
    });
});

app.delete("/api/companies/:id", (request, response) => {
  Company.findByIdAndRemove(request.params.id)
    .then((data) => {
      Company.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.put("/api/companies/:id", (request, response) => {
  Company.findByIdAndUpdate(request.params.id, request.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      Company.find({})
        .then((data) => {
          response.send(data);
        })
        .catch((err) => {
          response.status(500).send({
            message: err.message || "An error has occured",
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

app.post("/api/companies", (request, response) => {
  const company = new Company({
    name_en: request.body.name_en,
    name_ru: request.body.name_ru,
    name_kz: request.body.name_kz,
    name_es: request.body.name_es,
    name_zh: request.body.name_zh,
    image_url: request.body.image_url,
    bin_iin: request.body.bin_iin,
    country_id: request.body.country_id,
    city_id: request.body.city_id,
    is_active: request.body.is_active,
  });

  company
    .save(company)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured",
      });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT,'localhost', () => {
  console.log(`Server is running on port ${PORT}.`);
});
