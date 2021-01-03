const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var session = require('express-session');

const app = express();

var corsOptions = {
  origin: "http://45.67.58.253:3000"
};

app.use(cors(corsOptions));

app.use(session({
	
	secret: 'secret',
	resave: true,
	saveUninitialized: true
	
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/managers', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log('DB OK');
})
.catch(err => {
	
	console.log('DB ERROR', err);
	process.exit();
	
});

const Manager = require("./app/models/manager.model.js")(mongoose);
const User = require("./app/models/user.model.js")(mongoose);
const Country = require("./app/models/country.model.js")(mongoose);
const City = require("./app/models/city.model.js")(mongoose);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

/*
app.post('/login', (request, response) {
	
	var email = request.body.email;
	if (!email) {
		
		response.json({ status: 400, 'message': 'Please enter your E-mail'});
		response.end();
		
	} 
	if (email !== 'admin@admin.com') {

		response.json({ status: 400, 'message': 'Wrong E-mail'});
		response.end();		
		
	}
	
	request.session.loggedIn = true;
	request.session.adminEmail = email;
	response.json({ status: 200 });
	response.end();
	
});
*/

app.get('/check', (request, response) => {
	
	if (!request.session.loggedIn) {
		response.json({ status: 400 });
	}
	else {
		response.json({ status: 200 });
	}	
	
});

app.get('/api/managers', (request, response) => {
	
	var email = request.query.email;
	var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

	Manager.find(condition)
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

app.get('/api/managers/:id', (request, response) => {
	
	Manager.findById(request.params.id)
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		response.status(500).send({
			response: err.message || "An error has occured"
		});
	});
	
});

app.delete('/api/managers/:id', (request, response) => {
	
	Manager.findByIdAndRemove(request.params.id)
	.then(data => {
		Manager.find({})
		.then(data => {
			response.send(data);
		})
		.catch(err => {
			response.status(500).send({
				message: err.message || "An error has occured"
			});
		});
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

app.put('/api/managers/:id', (request, response) => {
	
	Manager.findByIdAndUpdate(request.params.id, request.body, {useFindAndModify: false})
	.then(data => {
		Manager.find({})
		.then(data => {
			response.send(data);
		})
		.catch(err => {
			response.status(500).send({
				message: err.message || "An error has occured"
			});
		});
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

app.post('/api/managers', (request, response) => {
	
	const manager = new Manager({
	
		email: request.body.email,
		password: request.body.password,
		active: request.body.active ? request.body.active : false,
	
	});
	
	manager
	.save(manager)
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "An error has occured"
		});
	});

});

/* USERS */
app.get('/api/users', (request, response) => {
	
	var email = request.query.email;
	var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

	User.find(condition)
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

app.get('/api/users/:id', (request, response) => {
	
	User.findById(request.params.id)
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		response.status(500).send({
			response: err.message || "An error has occured"
		});
	});
	
});

app.delete('/api/users/:id', (request, response) => {
	
	User.findByIdAndRemove(request.params.id)
	.then(data => {
		User.find({})
		.then(data => {
			response.send(data);
		})
		.catch(err => {
			response.status(500).send({
				message: err.message || "An error has occured"
			});
		});
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

app.put('/api/users/:id', (request, response) => {
	
	User.findByIdAndUpdate(request.params.id, request.body, {useFindAndModify: false})
	.then(data => {
		User.find({})
		.then(data => {
			response.send(data);
		})
		.catch(err => {
			response.status(500).send({
				message: err.message || "An error has occured"
			});
		});
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

app.post('/api/users', (request, response) => {
	
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
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "An error has occured"
		});
	});

});

/* COUNTRIES */
app.get('/api/countries', (request, response) => {
	
	const country = new Country({
	
        name_eng: 'Kazakhstan',
        name_ru: 'Казахстан',
		name_kz: 'Kazakhstan',
		name_es: 'Kazakhstan',
		name_zh: 'Kazakhstan',
        is_active: true
	
	});
	
	country
	.save(country)
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "An error has occured"
		});
	});

	Country.find({})
	.then(data => {
		response.send(data);
	})
	.catch(err => {
		response.status(500).send({
			message: err.message || "An error has occured"
		});
	});
	
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
 