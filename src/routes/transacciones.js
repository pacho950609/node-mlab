const express = require('express')
const router = express.Router()
const debug = require('debug')('backend:routes:transacciones')
const wrapper = require('./../utils/wrapper')
const { Transaction } = require('./../entities/Transaction')


router.get('/', wrapper(async(req, res) => {
	const transactions = await Transaction.find({ username: req.user.username })
	debug('user transactions %o',transactions)
	res.send(transactions)
}))
  

module.exports = router