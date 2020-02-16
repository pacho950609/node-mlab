const express = require('express')
const router = express.Router()
const { Transaction } = require('./../entities/Transaction')
const weather = require('weather-js');
const debug = require('debug')('backend:routes:clima')
const moment = require('moment')
const wrapper = require('./../utils/wrapper')

router.get('/:city', wrapper(async(req, res) => {
	debug("Iniciando busqueda de la ciudad %s",req.params.ciudad)
	debug("Insertando transaccion")
	const { city } = req.params
	await Transaction.insertMany({
		username: req.user.username,
		city,
		date: moment().format()
	})

	debug("Transaccion insertada")
    
	weather.find({ search: city, degreeType: 'F' }, function(err, result) {
		if (err) {
			const err = new Error('Ha ocurrido un error buscando el clima')
			err.status = 401
			throw err
		} else {
			debug("Busqueda de %s terminada",city)
			if (JSON.stringify(result, null, 2) == '[]') {
				debug("No se ha encontrado indo de la ciudad %s",city)
				res.send({ mensaje: `no se ha encontrado informacion de ${city}` })
			} else {
				debug("Se ha encontrado info de la ciudad %s",city)
				res.send(JSON.stringify(result, null, 2))
			}
		}
	});
}))
  


module.exports = router
