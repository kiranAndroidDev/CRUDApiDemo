// import the express
let express = require('express')
let bodyParser = require('body-parser');
let app = express();

// parse request of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// defining the port on which our servers run
var port = process.env.PORT || 8080;

// define a get route
app.get('/', (req, res) => res.send('I am Working!!!'));

let routes= require('./routes/StudentRoute.js')(app)
//app listening to http://localhost:8080
app.listen(port, function () {
     console.log("Running localhost on http://localhost:" + port);

});
