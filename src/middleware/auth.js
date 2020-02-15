const jwt = require('jsonwebtoken');
const noAuth = ['/auth']
const debug = require('debug')('backend:middleware:auth')

function     validateToken(req,res,next) {   
    if(noAuth.some(i => req.path.startsWith(i))){
        debug("la ruta no requiere autenticacion")
        return next()
    }
  
    debug("la ruta requiere autenticacion, verificando token...")
    try {
        const user = jwt.verify(req.get("Authorization"), process.env.jwtKey)
        req.user = user
        debug("token verificado")
        return next()
    } 
    catch(error) {
        const err = new Error('Usuario no autorizado')
        err.status = 401
        return next(err) 
    }
    
}

module.exports= {validateToken }