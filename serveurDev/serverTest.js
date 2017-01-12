var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'ejs');

app.use('/Js', express.static('../srcJs'));
app.use('/test', express.static('../testsUnitairs'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('test');
});

app.get('/mini-logiciel', function(req, res){
  res.render('index');
});

app.post('/data', function(req, res){
  console.log(req.body);
});

app.listen(5000);
