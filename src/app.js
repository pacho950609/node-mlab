const express = require('express')
const cors = require('cors')
const compression = require('compression')
const app = express()
const helmet = require('helmet');
const routeLoader = require('express-route-autoloader')
const logger = require('morgan-debug')
const middlewares = require('./middleware/auth')


//middleware para comprimir respuesta para aumentar el rendimiento
app.use(compression());

//middleware para protejer la app de vulnerabilidades en cabeceras http
app.use(helmet());

//middleware para poder usar req.body
app.use(express.json())

//middleware para habilitar cors para todos los orginenes 
app.use(cors())

//middleware para tener logs de toda peticion de entrada 
app.use(logger('backend:requests', 'START :method :url', { immediate: true }))

//middleware para tener logs de toda respuesta
app.use(logger('backend:requests', 'DONE :method :url :status :res[content-length] - :response-time ms', {}))

//valida el token
app.use(middlewares.validateToken)

//redirecciona peticiones a la carpeta routes
routeLoader(app)

//se ejecuta cuando se usa next(err) con el fin de poder hacer alguna accion con todos los errores como crear logs
app.use((err, req, res, next) => {   
	if (res.headersSent) {
		return next(err);
	}
	res.status(err.status || 500);
	res.send({ error: err.message }); 
})


module.exports = app



