var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// db
mongoose.connect('mongodb://localhost/newsfeed');
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  title : {type: String, trim: true, require: true},
  client : {type: String, trim: true, require: true},
  project_url : {type: String, trim: true, require: true},
  completion_date : Date,
  share : String,
  created_at : {type: Date, default : Date.now}
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