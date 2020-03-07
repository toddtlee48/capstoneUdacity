// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
	console.log("server running");
	console.log(`running on localhost: ${port}`);
}

//app.get("/all", function (req, res) {
	//res.send(projectData)
	//console.log(projectData)
//})

//app.post("/data", function (req, res) {
	//res.send('post received')
//});
app.get('/all', (req, res) => {
	console.log('Get data');
	res.send(projectData);
});

app.post('/add', (req, res) => {

	freshData = {

		temperature: req.body.temperature,
    	date: req.body.date,
    	input: req.body.input
	};

	projectData.push(freshData);
	res.send(projectData);
});


