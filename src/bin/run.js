const debug = require('debug')('backend:starter')
const db  = require('./../db/config');

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

