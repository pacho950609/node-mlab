const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const debug = require('debug')('backend:routes:auth')
const wrapper = require('./../utils/wrapper')
const { User } = require('../entities/User')

router.post('/signin', wrapper(async(req, res) => {

	const { username, password } = req.body
	const user = await User.findOne({
		username,
	})

	if (user && bcrypt.compareSync(password, user.password)) {
		const token = jwt.sign({ id: user._id , username: user.username }, process.env.jwtKey);
		res.send(token)
	} else {
		debug("Usuario o contraseña incorrecta")
		const err = new Error('Usuario o contraseña incorrecta')
		err.status = 401
		throw err
	}

}))

router.post('/signup', wrapper(async(req, res) => {

	const { username, password } = req.body

	const user = await User.findOne({
		username,
	})

	if (user) {
		const err = new Error('Ya existe el usuario')
		err.status = 401
		throw err
	} else {
		const salt = await bcrypt.genSalt(10)
		const passwordC = await bcrypt.hash(password, salt)
		
		await User.insertMany({
			username,
			password: passwordC,
		})

		res.send("ok")
	}
	
}))

module.exports = router
