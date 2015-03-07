var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var articles = require('./controllers/articles');

var app = express();

/* --------- db --------- */
mongoose.connect('mongodb://admin:' + process.env.DBPASS + '@ds049661.mongolab.com:49661/newsfeed');

/* --------- middleware --------- */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --------- routes --------- */

// Main landing page route
app.get('/', articles.list);
app.get('/:id', articles.show);

app.use('/articles', articles);

// app.use('articles', articles);
// // display full list of articles
// app.get('/', function (req, res) {
  
//   res.render('articles/list');
// });

// // display individual article + details
// app.get('/:id', function (req, res) {
//   var article_id = req.params.id;
//   res.render('articles/show');
// });

// // post to admin login page
// app.post('/admin', function (req, res) {
  
// });


// // display admin login page
// app.get('/admin', function (req, res) {
  
// });





/* --------- server start --------- */
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});