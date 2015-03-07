var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var articles = require('./controllers/articles');
var auth = require('./controllers/auth');

var app = express();

/* --------- db --------- */
mongoose.connect('mongodb://admin:' + process.env.DBPASS + '@ds049661.mongolab.com:49661/newsfeed');

/* --------- middleware --------- */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'foo bar' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --------- routes --------- */
app.use(auth);
app.use('/articles', articles);
app.get('/:id', articles.show);
app.get('/', articles.list);

/* --------- server start --------- */
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});