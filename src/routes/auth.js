const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const db = require( './../db/config' ).getDb()
const bcrypt = require('bcrypt')

router.post('/signIn', async(req, res,next) => {

    const usuarios = db.collection('usuarios')
    const { user, password} = req.body
    const usuario = await usuarios.findOne({
        usuario: user,
    })

    if(usuario && bcrypt.compareSync(password, usuario.password)){
        const token = jwt.sign({ id: usuario._id , user: usuario.usuario }, process.env.jwtKey);
        res.send(token)
    }

    else{
        const err = new Error('Usuario o contraseña incorrecta')
        err.status = 401
        next(err)
    }

})

router.post('/signUp', async(req, res) => {

    const { user, password} = req.body
    const usuarios = db.collection('usuarios')
    const usuario = await usuarios.findOne({
        usuario: req.body.user,
    })

    if(usuario){
        const err = new Error('Ya existe el usuario')
        err.status = 401
        next(err)
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(password, salt)
    
        await usuarios.insertOne({
            usuario: user,
            password: password,
        })
        res.send("ok")
    }


})

module.exports = router
