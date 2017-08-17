var	config = require('./config');
var mongoClient = require('mongodb').MongoClient;


var DbConnection = function (){
	return new Promise(function(resolve,reject){
		mongoClient.connect(config.database, function(err, db) {
		   if(err) reject(err);
		   else{
		   	//resolve(db.collection(config.databaseName));
		   	resolve(db);
		   }
		});
	});
}


// var DbConnection = async (function(){
// 	try{
// 		// await (mongoClient.connection(config.database, function(err, db){
// 		// 		if(err)console.log(err);
// 		// 		else
// 		// 			console.log("db connected");
// 		// }));
// 		await mongoClient.connection(config.database);
// 	}catch(e){
// 			console.error(e.Message);
// 	}
	
// });







module.exports.connection = DbConnection;