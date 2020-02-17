const debug = require('debug')('backend:starter')
const db  = require('./../db/config');

db.on('error', console.error.bind(console, 'connection error:'));

// Inicia el servidor una vez inicializada la conexion a la base de datos
db.once('open', function() {
	try {
		const app = require('../app')
		app.listen(process.env.PORT || '4000', function() {
			debug('Server start on port %s', process.env.PORT || '4000')  
		});
	} catch (e) {
		debug('Starting server error %o',e)
	}
});

