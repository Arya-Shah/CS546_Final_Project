var express = require('express');
var env = require('dotenv').config()
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path')
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


mongoose.connect('mongodb://localhost:27017/garageManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

app.use(session({
  name: 'AuthCookie',
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

const logger = function(req, res, next) {
  curDate = new Date().toUTCString();
  method = req.method;
  route = req.originalUrl;
  authenticatedCheck = 'Not Logged In';
  if (req.session.user) {
      authenticatedCheck = 'Logged In';
  }
  console.log("[" + curDate + "] " + method + " " + route + " " + authenticatedCheck)
  // console.log(req);
  next();
}

app.use(logger);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
