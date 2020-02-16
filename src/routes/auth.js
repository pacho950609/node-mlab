const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const debug = require('debug')('backend:routes:auth')
const wrapper = require('./../utils/wrapper')
const { User } = require('../entities/Usuario')

router.post('/signin', wrapper(async(req, res) => {

	const { user, password } = req.body
	const usuario = await User.findOne({
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

router.post('/signup', wrapper(async(req, res) => {

	const { user, password } = req.body

	const usuario = await User.findOne({
		user_name: req.body.user,
	})

	if (usuario) {
		const err = new Error('Ya existe el usuario')
		err.status = 401
		throw err
	} else {
		const salt = await bcrypt.genSalt(10)
		const passwordC = await bcrypt.hash(password, salt)
		
		await User.insertMany({
			usuario: user,
			password: passwordC,
		})

		res.send("ok")
	}
	
}))

module.exports = router
