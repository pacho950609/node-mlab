    
const MongoClient = require( 'mongodb' ).MongoClient;
let _db;
const conectionurl = process.env.dbUrl;

module.exports = {

  connectToServer( callback ){

    option = {
         useNewUrlParser: true 
    }

    MongoClient.connect(conectionurl,option,(err,database) => {
            if(!err){ 
              _db = database.db('Database1')
            }
            return callback( err );
    });
  },

  getDb(){
    return _db;
  }

};