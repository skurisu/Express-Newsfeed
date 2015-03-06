var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var app = express();

/* --------- db --------- */
mongoose.connect('mongodb://admin:' + process.env.DBPASS + '@ds049661.mongolab.com:49661/newsfeed');
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

// post to article form page
app.post('/admin/article/new', function (req, res) {

  var title = req.body["article-title"];
  var client = req.body["article-client"];
  var projectUrl = req.body["article-project-url"];
  var imageUrl = req.body["article-image-url"];
  var content = req.body["article-content"];
  var completionDate = req.body["article-completion-date"];
  var share = req.body["article-share"];

  var article = new Article({
    title : title,
    client : client,
    projectUrl : projectUrl,
    imageUrl : imageUrl,
    content : content,
    completionDate : completionDate,
    share : share
  });

  article.save(function (err) {
    if (err) throw err;
    res.redirect('/admin/article/list');
  });
});

// display new article form
app.get('/admin/article/new', function (req, res) {
  res.render('admin/new');
});

// display a preview of article
app.get('/admin/article/show', function (req, res) {
  
});

// list of created articles (view for editing)
app.get('/admin/article/list', function (req, res) {
  Article.find(function (err, articles) {
    if (err) throw err;
    console.log(articles);
    res.render('admin/list', {articles : articles});
  });
});

// admin edit page
app.get('/admin/article/edit/:id', function (req, res) {
  var article_id = req.params.id;

  Article.findById(article_id, function (err, article) {
    res.render('admin/edit', {
      article : article
    });
  });
});

// admin update edit article
app.put('/admin/article/edit/:id', function (req, res) {
  var article_id = req.params.id;
  var title = req.body["article-title"];
  var client = req.body["article-client"];
  var projectUrl = req.body["article-project-url"];
  var imageUrl = req.body["article-image-url"];
  var content = req.body["article-content"];
  var completionDate = req.body["article-completion-date"];
  var share = req.body["article-share"];

  Article.findById(article_id, function (err, article) {
    article.update({
      $set : {
        title : title,
        client : client,
        projectUrl : projectUrl,
        imageUrl : imageUrl,
        content : content
      }
    }, function (err) {
      if (err) throw err;
      res.redirect('/admin/article/list');
    });
  });
});

// admin delete article
app.delete('/admin/article/edit/:id', function (req, res) {
  var article_id = req.params.id;
  
  Article.findById(article_id, function (err, article) {
    article.remove(function () {
      res.redirect('/admin/article/list');
    });
  });
});



/* --------- server start --------- */
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});