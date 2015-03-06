var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// db
mongoose.connect('mongodb://localhost/newsfeed');
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  title : String,
  description : String,
  is_done : Boolean,
  created_at : Date
});

var Article = mongoose.model('article', articleSchema);

// middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


// routes
app.get('/', function (req, res) {
  res.render('test');
});


// server start
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});