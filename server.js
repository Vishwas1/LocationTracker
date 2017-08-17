var express = require('express'),
 app = express(),
 config = require('./config'),
 port = config.port,
 bodyparser = require('body-parser'),
 morgan = require('morgan'),
 mongoose =require('mongoose'),
 mongoClient = require('mongodb').MongoClient,
 jwt = require('jsonwebtoken');




//connecting to db
mongoose.Promise = require('bluebird');
console.log('server : Before connecting database');
mongoClient.connect(config.database, function(err, db) {
  if(!err) console.log('server : Database connected');
});

console.log('server : After connecting database');



//setting secret variable 
console.log('server : Before setting secret key:' + config.secret);
app.set('superSecret',config.secret);
console.log('server : After setting secret key');



//body-parser to get infos from POST URL parameters
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//morgan to log requests to the console
app.use(morgan('dev'));



//Routes configuration ...
/*app.get('/',function(req,res){
	res.send('Hello! Server is running at localhost:'+ port);
	console.log('Server is up and running at port:'+port);
});*/
app.use('/user', require('./app/user'));




//listen and start the server
app.listen(port);
console.log('Server is up and running at port:'+port);







