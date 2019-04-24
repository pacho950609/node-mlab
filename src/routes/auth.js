const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const db = require( './../db/config' ).getDb()
const bcrypt = require('bcrypt')

router.post('/signIn', async(req, res,next) => {

    let usuarios = db.collection('usuarios')

    let usuario = await usuarios.findOne({
        usuario: req.body.user,
    })

    if(usuario && bcrypt.compareSync(req.body.password, usuario.password)){
        let token = jwt.sign({ id: usuario._id , user: usuario.usuario }, process.env.jwtKey);
        res.send(token)
    }

    else{
        const err = new Error('Usuario o contraseña incorrecta')
        err.status = 401
        next(err)
    }

})

router.post('/signUp', async(req, res) => {

    let usuarios = db.collection('usuarios')
    let usuario = await usuarios.findOne({
        usuario: req.body.user,
    })

    if(usuario){
        const err = new Error('Ya existe el usuario')
        err.status = 401
        next(err)
    }
    else{
        const salt = await bcrypt.genSalt(10)
        let password = await bcrypt.hash(req.body.password, salt)
    
        await usuarios.insertOne({
            usuario: req.body.user,
            password: password,
        })
        res.send("ok")
    }


})

module.exports = router
