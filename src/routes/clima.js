const express = require('express')
const router = express.Router()
const db = null
const weather = require('weather-js');
const debug = require('debug')('backend:routes:clima')
const moment = require('moment')
const wrapper = require('./../utils/wrapper')

router.get('/:ciudad', wrapper(async(req, res) => {

	debug("Iniciando busqueda de la ciudad %s",req.params.ciudad)

	const transacciones = db.collection('transacciones')

	debug("Insertando transaccion")

	await transacciones.insertOne({
		usuario: req.user.user,
		ciudad: req.params.ciudad,
		hora: moment().format()
	})

	debug("Transaccion insertada")
    
	weather.find({ search: req.params.ciudad, degreeType: 'F' }, function(err, result) {
		if (err) {
			const err = new Error('Ha ocurrido un error buscando el clima')
			err.status = 401
			throw err
		} else {
			debug("Busqueda de %s terminada",req.params.ciudad)
			if (JSON.stringify(result, null, 2) == '[]') {
				debug("No se ha encontrado indo de la ciudad %s",req.params.ciudad)
				res.send({ mensaje: `no se ha encontrado informacion de ${req.params.ciudad}` })
			} else {
				debug("Se ha encontrado info de la ciudad %s",req.params.ciudad)
				res.send(JSON.stringify(result, null, 2))
			}
		}
	});
}))
  


module.exports = router
