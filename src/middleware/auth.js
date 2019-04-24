const jwt = require('jsonwebtoken');
const noAuth = ['/auth']
const debug = require('debug')('backend:middleware:auth')

module.exports={

    validateToken(req,res,next) {   
            if(noAuth.some(i => req.path.startsWith(i))){
                debug("la ruta no requiere autenticacion")
                next()
            }
            // next no termina la ejecucion del metodo por lo tanto se usa else
            else {
                debug("la ruta requiere autenticacion, verificando token...")
                try {
                    let user = jwt.verify(req.get("Authorization"), process.env.jwtKey)
                    req.user = user
                    debug("token verificado")
                    next()
                } 
                catch(error) {
                    const err = new Error('Usuario no autorizado')
                    err.status = 401
                    next(err) 
                }
            }
    }
}