var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var app = express();

app.get('/sha256.js.mem', function(req, res){
  var str = fs.readFileSync('../srcJs/sha256.js.mem', 'utf8');
  var ret = ejs.render(str);
  res.send(ret);
});

app.get('/', function(req, res){
  var str = fs.readFileSync('./srcEJS/test.ejs', 'utf8');
  var ret = ejs.render(str);
  res.send(ret);
});

app.get('/test/', function(req, res){
  var tmp = req.url.split("/");
  tmp = tmp[tmp.length - 1].split("?");

  try {
    var str = fs.readFileSync('../testsUnitairs/'+ tmp[0], 'utf8');
    var ret = ejs.render(str);
  } catch (e) {
    var str = fs.readFileSync('../testsUnitairs/unitTest.html', 'utf8');
    var ret = ejs.render(str);
  }
  res.send(ret);
});

app.get('/mini-logiciel', function(req, res){
  var str = fs.readFileSync('./srcEJS/index.ejs', 'utf8');
  var ret = ejs.render(str);
  res.end(ret);
});


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


app.listen(5000);
