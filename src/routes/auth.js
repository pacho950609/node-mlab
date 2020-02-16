const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const db = require( './../db/config' ).getDb()
const bcrypt = require('bcrypt')
const debug = require('debug')('backend:routes:auth')
const wrapper = require('./../utils/wrapper')

router.post('/signIn', wrapper(async(req, res) => {

	const usuarios = db.collection('usuarios')
	const { user, password } = req.body
	const usuario = await usuarios.findOne({
		usuario: user,
	})

	if (usuario && bcrypt.compareSync(password, usuario.password)) {
		const token = jwt.sign({ id: usuario._id , user: usuario.usuario }, process.env.jwtKey);
		res.send(token)
	} else {
		debug("Usuario o contraseña incorrecta")
		const err = new Error('Usuario o contraseña incorrecta')
		err.status = 401
		throw err
	}

}))

router.post('/signUp', wrapper(async(req, res) => {

	const { user, password } = req.body
	const usuarios = db.collection('usuarios')
	const usuario = await usuarios.findOne({
		usuario: req.body.user,
	})

	if (usuario) {
		const err = new Error('Ya existe el usuario')
		err.status = 401
		throw err
	} else {
		const salt = await bcrypt.genSalt(10)
		const passwordC = await bcrypt.hash(password, salt)
    
		await usuarios.insertOne({
			usuario: user,
			password: passwordC,
		})
		res.send("ok")
	}
	
}))

module.exports = router
