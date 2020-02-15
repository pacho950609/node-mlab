const mongo = require( '../db/config' );
const debug = require('debug')('backend:starter')

async function inicio() {
	debug('Iniciando coneccion a la db...')
	try {
		await mongo.connectToServer()
	} catch (e) {
		debug('No se logro conectar con la base de datos %o',e)
	}
	debug('Se ha conectado a la db')
	debug('Iniciando servidor...')
	try {
		const app = require('../app')
		app.listen(process.env.PORT || '4000', function() {
			debug('Servidor iniciado')  
		});
	} catch (e) {
		debug('Error iniciando servidor %o',e)
	}
}

inicio()


