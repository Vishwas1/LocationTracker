var env = require('./environment');

var config = {
	port : env.environment === 'development' ? 3000 :80,
	secret : 'vishwasbanand',
	//database : 'mongodb://admin:mongo2017@vishwascluster-shard-00-00-g2gj6.mongodb.net:27017,vishwascluster-shard-00-01-g2gj6.mongodb.net:27017,vishwascluster-shard-00-02-g2gj6.mongodb.net:27017/test?ssl=true&replicaSet=VishwasCluster-shard-0&authSource=admin',
	database : 'mongodb://localhost:27017/charcoalAssignmentDb',
	useDatabase : env.useDatabase,
	databaseName : 'charcoalAssignmentDb'	
}


module.exports = config

