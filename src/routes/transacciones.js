const express = require('express')
const router = express.Router()
const debug = require('debug')('backend:routes:transacciones')
const wrapper = require('./../utils/wrapper')
const { Transaction } = require('./../entities/Transaction')


router.get('/', wrapper(async(req, res) => {
	debug('Buscando transacciones del usuario %s',req.user.username)
	const transactions = await Transaction.find({ usuario:req.user.user })
	debug('Se ha terminado de buscar las transacciones de %s',req.user.username)
	res.send(transactions)
}))
  

module.exports = router