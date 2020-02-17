const express = require('express')
const router = express.Router()
const { Transaction } = require('./../entities/Transaction')
const weather = require('weather-js');
const debug = require('debug')('backend:routes:clima')
const moment = require('moment')
const wrapper = require('./../utils/wrapper')

router.get('/:city', wrapper(async(req, res) => {
	const { city } = req.params

	await Transaction.insertMany({
		username: req.user.username,
		city,
		date: moment().format()
	})
    
	weather.find({ search: city, degreeType: 'F' }, function(err, result) {
		if (err) {
			debug("Request error %o",err)
			const err = new Error('Ha ocurrido un error buscando el clima')
			err.status = 401
			throw err
		} else {
			if (JSON.stringify(result, null, 2) == '[]') {
				debug("Not found city info %s",city)
				res.send({ mensaje: `no se ha encontrado informacion de ${city}` })
			} else {
				res.send(JSON.stringify(result, null, 2))
			}
		}
	});
}))
  


module.exports = router
