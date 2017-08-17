var config = require('../../config'),
	User   = require('./model');



var userController = {

	create : function(req,res){
		console.log('userController : create method begins');
		try
		{
			var body = req.body;
			console.log('userController : body ='+ body);

			var hardCodedUser = new User({
				username : 'Vishwas',
				password : '1234'
			});

			console.log('userController : Before saving into db');
			
			hardCodedUser.save(function(err){
				if(err){
					console.log('userController : Error : user not saved');							
					throw err;
				}
				console.log('userController : Error : user not saved....');							
				res.status(200).json({message: 'user created successfully'});			
			});

			/*var savedPromise = hardCodedUser.save().then(function(result){
				console.log('userController : user created successfully');				
				return res.status(200).json({message: 'user created successfully'});
			})
			.catch(function(err){
				console.log('userController : Error : user not created successfully');					
				return res.json({error: true, message: 'An error occurred'});
			});

			if(typeof savedPromise != 'Undefined')
			{
				savedPromise.then(function(result){
				console.log('userController : User successfully saved');
				res.json({ success : true});
				});
			}
			else
			{
				console.log('userController : savedPromise is undefined');				
			}*/


			console.log('userController : After saving into db');
			}
		catch(err)
		{
			throw err;
		}
		console.log('userController : create method ends');
	}

}


module.exports = userController;