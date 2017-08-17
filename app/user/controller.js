var config = require('../../config'),
	User   = require('./model'),
	dbConn = require('../../dbConn');

	
var userController = {
	create : function(req,res){
		console.log('userController : create method begins');
		var usernameReq = "", passwordReq= "";
		try
		{
			var body = req.body;
			usernameReq = body.username;
			console.log('userController : usernameReq ='+ usernameReq);
			passwordReq = body.password;
			console.log('userController : passwordReq ='+ passwordReq);
			if(usernameReq != "" && passwordReq != "" && usernameReq != 'Undefined' && passwordReq != 'Undefined')
			{
				if(global.dbConnection)
				{
					console.log('userController : Database connection success');
					if(typeof global.dbQueryObj != 'Undefined')
					{
						var query = { username :  usernameReq };
						var OueryObj = global.dbQueryObj.collection("User1");
						new Promise(function(resolve,reject){
							console.log('userController : query = '+ query);
							//Check if UserName exists 
							OueryObj.find(query).toArray(function(err,result){
								if(err) throw err;
								console.log('userController : result = '+ result.length);
								if(result.length == 0)
									resolve(result);
								else
									reject('Alerady Exists');
							});
						})
						.then(function(result){
							//If not then insert - Resolve promise
							console.log('userController : Promise1 resolved: User does not exists in Database ');
							return new Promise(function(resolve,reject){
								var userVar = new User({
									username : usernameReq,
									password : passwordReq
								});
								OueryObj.insertOne(userVar, function(err, result) {
							    if (err) throw err;
							    console.log('userController : Promise1 resolved: result.insertedCount = '+ result.insertedCount);
							    if(result.insertedCount == 1)
							    	resolve('Inserted');
							    else
							    	reject('Error');
								});
							});
						}, function(err){
							//Alerady exists in the db - Reject Promise - respond saying that user name already exists
							console.log('userController : Promise1 rejected: User already exists in Database ');
							return res.json({status: 'Error' , message : 'User already exisits Database'});
						})
						.then(function(result){
							// Successfully inserted into db - 2nd Promise resolved
							console.log('userController : Promise2 resolved: User created successfully ');
							return res.status(200).json({message: 'user created successfully'});								
						},function(err){
							// Successfully inserted into db - 2nd Promise rejected
							console.log('userController : Promise2 rejected: Could not insert into Database');
							return res.json({status: 'Error' , message : 'Could not insert into Database'});
						})
						.catch(function(e){
							console.log('userController :Error e.Message = '+ e.Message + ', e.Stack = '+ e.Stack);
						});
					}
					else
					{
						console.log('userController : global.db is undefined');		
					}
				}
				else
				{
					console.log('userController : Database connection failed');
					return res.json({status: 'Error' , message : 'Database connection failed'});
				}
			}
			else
			{
				console.log('userController : UserName or Password can not be null or empty');
				return res.json({status: 'Error',  message : 'UserName or Password can not be null or empty'});
			}
		}
		catch(err)
		{
			throw err;
		}
		console.log('userController : create method ends');
	},
	getusers : function(req,res){
		console.log('userController : getusers method starts');
		if(global.dbConnection)
		{
			console.log('userController : Database connection success');
			if(typeof global.dbQueryObj != 'Undefined')
			{
				var OueryObj = global.dbQueryObj.collection("User1");
				new Promise(function(resolve,reject){
					OueryObj.find({}, {_id :false}).toArray(function(err, users) {
						if(err) throw err;
						else
							resolve(users);
					});
				})
				.then(function(users){
					res.json(users);
				})
				.catch(function(e){
					console.log('userController :Error e.Message = '+ e.Message + ', e.Stack = '+ e.Stack);
				});
			}
			else
			{
				console.log('userController : global.db is undefined');		
			}
		}
		else
		{
			console.log('userController : Database connection failed');
		}
		console.log('userController : getusers method ends');
	}
}

module.exports = userController;