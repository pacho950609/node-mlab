const jwt = require('jsonwebtoken');
const noAuth = ['/auth']
const debug = require('debug')('backend:middleware')

// Valida el token de autenticacion y crea el atributo user en req
function validateToken(req,res,next) {   
	if (noAuth.some(i => req.path.startsWith(i))) {
		return next()
	}
  
	debug("validating token")
	try {
		const user = jwt.verify(req.get("Authorization"), process.env.jwtKey)
		req.user = user
		debug("success token validation for user %o", user.username)
		return next()
	} catch (error) {
		const err = new Error('Usuario no autorizado')
		err.status = 401
		return next(err) 
	}
}

// Hace logs del body de los requests
function logBody(req,res,next) {   
	const bodyMethods = ['PUT','POST','PATCH']
	if (bodyMethods.some( x => x === req.method)) {
		debug("request body %o", req.body)
	}
	return next()
    
}


module.exports = { validateToken, logBody }