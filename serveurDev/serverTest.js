var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/Js', express.static('../src'));
app.use('/Js', express.static('../src/node_modules'));
app.use('/unitTest', express.static('../test/unit-test'));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/data', function(req, res){
  console.log(req.body);
  res.send("");
});

app.listen(5000);
