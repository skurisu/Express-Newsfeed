var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var app = express();

/* --------- db --------- */
mongoose.connect('mongodb://localhost/newsfeed');
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  title : {type: String, trim: true, require: true},
  client : {type: String, trim: true, require: true},
  projectUrl : {type: String, trim: true, require: true},
  imageUrl : String,
  content : String,
  completionDate : Date,
  share : String,
  createdAt : {type: Date, default : Date.now}
});

var Article = mongoose.model('article', articleSchema);

/* --------- middleware --------- */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


/* --------- routes --------- */

// display full list of articles
app.get('/', function (req, res) {
  
  res.render('articles/list');
});

// display individual article + details
app.get('/:id', function (req, res) {
  var article_id = req.params.id;
  res.render('articles/show');
});

// post to admin login page
app.post('/admin', function (req, res) {
  
});


// display admin login page
app.get('/admin', function (req, res) {
  
});

// post to article template page
app.post('/admin/article/new', function (req, res) {
  
});

// display new article template
app.get('/admin/article/new', function (req, res) {
  res.render('admin/new');
});

// display a preview of article
app.get('/admin/article/show', function (req, res) {
  
});

// list of created articles (view for editing)
app.get('/admin/article/list', function (req, res) {
  
});

// admin edit article
app.put('/admin/article/:id', function (req, res) {
  var article_id = req.params.id;
});

// admin delete article
app.delete('/admin/article/:id', function (req, res) {
  var article_id = req.params.id;
  
});



/* --------- server start --------- */
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});