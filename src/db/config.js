    
const MongoClient = require( 'mongodb' ).MongoClient;
const { dbUrl } = process.env;
let _db;

async function connectToServer() {

	const option = {
		useNewUrlParser: true 
	}

	const client = await MongoClient.connect(dbUrl,option)
	_db = client.db('Database1')
  
}

function getDb() {
	return _db;
}

module.exports = {
	connectToServer, getDb
};