var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'ejs');

app.use('/Js', express.static('../srcJs'));
app.use('/test', express.static('../testsUnitairs'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
/*
app.get('/sha256.js.mem', function(req, res){
  var str = fs.readFileSync('../srcJs/sha256.js.mem', 'utf8');
  res.send(str);
});
*/
app.get('/', function(req, res){
  res.render('test');
});

app.get('/mini-logiciel', function(req, res){
  res.render('index');
});
/*

app.get('/Js/*', function(req, res){
  var tmp = req.url.split("/");
  tmp = tmp[tmp.length - 1].split("?");
  try {
    var str = fs.readFileSync('../srcJs/'+ tmp[0], 'utf8');
    var ret = ejs.render(str);
  } catch (e) {
    var str = fs.readFileSync('../testsUnitairs/unitTest.html', 'utf8');
    var ret = ejs.render(str);
  }
  res.send(ret);
});

*/
app.listen(5000);
