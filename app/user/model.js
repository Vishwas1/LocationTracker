//getting instance of mongooes and Schema
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;


//set up model for user and pass it to export
module.exports = mongoose.model('User',new Schema({
	username : String,
	password : String
}));




