var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req,res){
    var qParams = [];
    for(var key in req.query){
      qParams.push({'name':key, 'value':req.query[key]});
    }
    var context = {};
    context.dataList = qParams;
    context.type = 'GET';
    res.render('get-loopback', context);
});

app.post('/', function(req,res){
    var qParams = [];
    for (var p in req.body){
      qParams.push({'name':p,'value':req.body[p]})
    }
    var context = {};
    context.list = qParams;
    context.type = 'POST';
    res.render('post-loopback', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});