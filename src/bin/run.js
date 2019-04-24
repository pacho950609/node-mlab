const mongo = require( '../db/config' );
const debug = require('debug')('backend:starter')

debug('Iniciando coneccion a la db...')
mongo.connectToServer((err)=>{
    if(!err){
        debug('Se ha conectado a la db')
        debug('Iniciando servidor...')
        const app = require('../app')
        app.listen(process.env.PORT || '4000', function () {  debug('Servidor iniciado')  });
    }
    else{
        debug('No se logro conectar con la base de datos %o',err)
    }
})
