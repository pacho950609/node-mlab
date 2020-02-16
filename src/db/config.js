const { dbUrl,dbName } = process.env;
const mongoose = require('mongoose');
mongoose.connect(dbUrl, { useNewUrlParser: true, dbName });
const db = mongoose.connection


module.exports = db 