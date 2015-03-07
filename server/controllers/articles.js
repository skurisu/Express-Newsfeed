var express = require('express');
var Article = require('../models/article');

var router = express.Router();

// Unauthenticated Routes
router.list = function (req, res) {
  Article.find(function (err, articles) {
    if (err) throw err;
    res.render('articles/list', {articles: articles});
  });
};

router.show = function (req, res) {
  var article_id = req.params.id;
  
  Article.findById(article_id, function (err, article) {
    res.render('articles/show', {article: article});
  });
};

// Authenticated Routes

// // post to article form page
// router.post('/admin/article/new', function (req, res) {

//   var title = req.body["article-title"];
//   var client = req.body["article-client"];
//   var projectUrl = req.body["article-project-url"];
//   var imageUrl = req.body["article-image-url"];
//   var content = req.body["article-content"];
//   var completionDate = req.body["article-completion-date"];
//   var share = req.body["article-share"];

//   var article = new Article({
//     title : title,
//     client : client,
//     projectUrl : projectUrl,
//     imageUrl : imageUrl,
//     content : content,
//     completionDate : completionDate,
//     share : share
//   });

//   article.save(function (err) {
//     if (err) throw err;
//     res.redirect('/admin/article/list');
//   });
// });

// // display new article form
// router.get('/admin/article/new', function (req, res) {
//   res.render('admin/new');
// });

// // display a preview of article
// router.get('/admin/article/show', function (req, res) {
  
// });

// list of created articles (view for editing)
router.get('/list', function (req, res) {
  Article.find(function (err, articles) {
    if (err) throw err;
    console.log(articles);
    res.render('admin/list', {articles : articles});
  });
});

// admin edit page
router.get('/admin/article/edit/:id', function (req, res) {
  var article_id = req.params.id;

  Article.findById(article_id, function (err, article) {
    res.render('admin/edit', {
      article : article
    });
  });
});

// // admin update edit article
// router.put('/admin/article/edit/:id', function (req, res) {
//   var article_id = req.params.id;
//   var title = req.body["article-title"];
//   var client = req.body["article-client"];
//   var projectUrl = req.body["article-project-url"];
//   var imageUrl = req.body["article-image-url"];
//   var content = req.body["article-content"];
//   var completionDate = req.body["article-completion-date"];
//   var share = req.body["article-share"];

//   Article.findById(article_id, function (err, article) {
//     article.update({
//       $set : {
//         title : title,
//         client : client,
//         projectUrl : projectUrl,
//         imageUrl : imageUrl,
//         content : content
//       }
//     }, function (err) {
//       if (err) throw err;
//       res.redirect('/admin/article/list');
//     });
//   });
// });

// // admin delete article
// router.delete('/admin/article/edit/:id', function (req, res) {
//   var article_id = req.params.id;
  
//   Article.findById(article_id, function (err, article) {
//     article.remove(function () {
//       res.redirect('/admin/article/list');
//     });
//   });
// });

module.exports = router;