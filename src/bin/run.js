const debug = require('debug')('backend:starter')
const { dbUrl } = process.env;
const mongoose = require('mongoose');
const { dbName } = process.env
mongoose.connect(dbUrl, { useNewUrlParser: true, dbName });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	try {
		const app = require('../app')
		app.listen(process.env.PORT || '4000', function() {
			debug('Servidor iniciado')  
		});
	} catch (e) {
		debug('Error iniciando servidor %o',e)
	}
});

