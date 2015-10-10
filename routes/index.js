//var express = require('express');
//var router = express.Router();
var crypto = require('crypto'),fs = require('fs'),
    User = require('../models/user.js'),Post = require('../models/post.js'),Comment = require('../models/comment.js');;

/* GET home page. */
// register
//router.post('/reg', checkNotLogin);

module.exports = function(app) {

app.get('/', function(req, res) {
	//判断是否是第一页，并把请求的页数转换成 number 类型
  var page = req.query.p ? parseInt(req.query.p) : 1;
  //查询并返回第 page 页的 10 篇文章
  Post.get(null, page, function (err, posts, total) {
    if (err) {
      posts = [];
    } 
    res.render('index', {
      title: 'Rui\'s Blog',
      page_name:'home',
      posts: posts,
      page: page,
      isFirstPage: (page - 1) == 0,
      isLastPage: ((page - 1) * 10 + posts.length) == total,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

// Register function
app.get('/reg', checkNotLogin);
app.get('/reg', function(req, res) {
  	res.render('reg', { 
      title: 'Register',
  	user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
 });
});


app.post('/reg', checkNotLogin);
app.post('/reg', function(req, res) {
	 var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  //检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', 'Different passwords entered'); 
    return res.redirect('/reg');//返回注册页
  }
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
  });
  //检查用户名是否已经存在 
  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if (user) {
      req.flash('error', 'User existed!');
      return res.redirect('/reg');//返回注册页
    }
    //如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');//注册失败返回主册页
      }
      req.session.user = user;//用户信息存入 session
      req.flash('success', 'Success!');
      res.redirect('/');//注册成功后返回主页
    });
  });
});

// Login function
app.get('/login', checkNotLogin);
app.get('/login', function(req, res) {
  res.render('login', { title: 'Login', 
  		user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});
});

app.post('/login', checkNotLogin);
app.post('/login', function(req, res) {
	 var md5 = crypto.createHash('md5'),
    password = md5.update(req.body.password).digest('hex');
  //检查用户是否存在
  User.get(req.body.name, function (err, user) {
    if (!user) {
      req.flash('error', 'User doesn\'s exist!'); 
      return res.redirect('/login');//用户不存在则跳转到登录页
    }
    //检查密码是否一致
    if (user.password != password) {
      req.flash('error', 'Wrong password!'); 
      return res.redirect('/login');//密码错误则跳转到登录页
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.user = user;
    req.flash('success', 'Login success!');
    res.redirect('/');//登陆成功后跳转到主页
  });
});

// Post function
app.get('/post', checkLogin);
app.get('/post', function (req, res) {
    res.render('post', {
      title: 'Post',
      page_name:'post',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

app.post('/post', checkLogin);
app.post('/post', function (req, res) {
	   var currentUser = req.session.user,
    tags = [req.body.tag1, req.body.tag2, req.body.tag3],
    post = new Post(currentUser.name, currentUser.head, req.body.title, tags, req.body.post);
    post.save(function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    req.flash('success', 'Post Success!');
    res.redirect('/');
  });
});


// Tags function
app.get('/tags', function (req, res) {
  Post.getTags(function (err, posts) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('tags', {
      title: 'Tag',
      page_name:'tags',
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});


app.get('/tags/:tag', function (req, res) {
  Post.getTag(req.params.tag, function (err, posts) {
    if (err) {
      req.flash('error',err); 
      return res.redirect('/');
    }
    res.render('tag', {
      title: 'TAG:' + req.params.tag,
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

// get time 
app.get('/dates', function (req, res) {
  Post.getDate (function (err, posts) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('time', {
      title: 'Tag',
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});


// file upload

app.get('/upload', checkLogin);
app.get('/upload', function (req, res) {
  res.render('upload', {
    title: 'File Upload',
    page_name:'upload',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
app.post('/upload', checkLogin);
app.post('/upload', function (req, res) {
  req.flash('success', 'Upload Success!');
  res.redirect('/upload');
});

// get user articles
app.get('/u/:name', function (req, res) {
  var page = req.query.p ? parseInt(req.query.p) : 1;
  //检查用户是否存在
  User.get(req.params.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!'); 
      return res.redirect('/');
    }
    //查询并返回该用户第 page 页的 10 篇文章
    Post.get(user.name, page, function (err, posts, total) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      } 
      res.render('user', {
        title: user.name,
        posts: posts,
        page: page,
        isFirstPage: (page - 1) == 0,
        isLastPage: ((page - 1) * 10 + posts.length) == total,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
});


// Search function
app.get('/search', function (req, res) {
  Post.search(req.query.keyword, function (err, posts) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('search', {
      title: "SEARCH:" + req.query.keyword,
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

// use a certain article
app.get('/p/:_id', function (req, res) {
  Post.getOne(req.params._id, function (err, post) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('article', {
      title: post.title,
      post: post,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

// comment function
app.post('/u/:name/:day/:title', function (req, res) {
  var date = new Date(),
      time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
             date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var md5 = crypto.createHash('md5'),
    email_MD5 = md5.update(req.body.email.toLowerCase()).digest('hex'),
    head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48"; 
    var comment = {
    name: req.body.name,
    head: head,
    email: req.body.email,
    website: req.body.website,
    time: time,
    content: req.body.content
  };
  var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
  newComment.save(function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    req.flash('success', 'Commented!');
    res.redirect('back');
  });
});


// edit function
app.get('/edit/:name/:day/:title', checkLogin);
app.get('/edit/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user;
  Post.edit(currentUser.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    res.render('edit', {
      title: 'Edit',
      post: post,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});


app.post('/edit/:name/:day/:title', checkLogin);
app.post('/edit/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user;
  Post.update(currentUser.name, req.params.day, req.params.title, req.body.post, function (err) {
    var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
    if (err) {
      req.flash('error', err); 
      return res.redirect(url);//出错！返回文章页
    }
    req.flash('success', 'Edit Success!');
    res.redirect(url);//成功！返回文章页
  });
});

// delete function
app.get('/remove/:name/:day/:title', checkLogin);
app.get('/remove/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user;
  Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    req.flash('success', 'Remove Success!');
    res.redirect('/');
  });
});

// citation
app.get('/reprint/:name/:day/:title', checkLogin);
app.get('/reprint/:name/:day/:title', function (req, res) {
  Post.edit(req.params.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      req.flash('error', err); 
      return res.redirect(back);
    }
    var currentUser = req.session.user,
        reprint_from = {name: post.name, day: post.time.day, title: post.title},
        reprint_to = {name: currentUser.name, head: currentUser.head};
    Post.reprint(reprint_from, reprint_to, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('back');
      }
      req.flash('success', 'Cited Success!');
      var url = encodeURI('/u/' + post.name + '/' + post.time.day + '/' + post.title);
      //跳转到转载后的文章页面
      res.redirect(url);
    });
  });
});

// logout 
app.get('/logout', checkLogin);
app.get('/logout', function(req, res) {
	req.session.user = null;
  	req.flash('success', 'Logout!');
  	res.redirect('/');
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Please Login!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', 'Already logined!'); 
      res.redirect('back');
    }
    next();
  }
}
