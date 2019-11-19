var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3329);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/show-data',function(req,res){
  var context = {};
  context.sentData = req.query.myData;
  res.render('show-data', context);
});


app.get('/get-loopback',function(req,res){
/*I'm still not completely clear how we are supposed to use this function without
copying it. THe answer in Piazza was to change the variables and demonstrate
we knew what was happening. Changing variables is still copying, so I'll
try with comments to tell what is happening*/
  var qParams = []; //a container to store passed-in data
  for (var p in req.query){//iterate through the request and push strings representing
//the passed in data to qParams. I'm less clear what name and value are doing
//req.query is the array representing the passed in data, so accessing it like
this would get the value stored at that index, i.e. the string literal.
//It looks like 'naming' that literal 'p' and then ascribing the literal as the 'value'
//of p. In any case it's going through the passed in data array and parsing it value by value, pushing it
//to qParams.

    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
//context is what will be reported back
  context.dataList = qParams; //assigning qParams (the passed in data) to the container that will
//report it back
  res.render('get-loopback-improved', context);
//formats this data to be displayed
});

app.post('/post-loopback', function(req,res){
//see comments above
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams); // reporting the passed in data back to the console
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
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
