    
const MongoClient = require( 'mongodb' ).MongoClient;
let _db;
const conectionurl = process.env.dbUrl;

async function connectToServer( callback ){

  option = {
       useNewUrlParser: true 
  }

  client = await MongoClient.connect(conectionurl,option)
  _db = client.db('Database1')
  
}

function getDb(){
  return _db;
}

module.exports = {

  connectToServer, getDb

};