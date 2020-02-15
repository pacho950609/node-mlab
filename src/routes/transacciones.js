const express = require('express')
const router = express.Router()
const db = require( '../db/config' ).getDb()
const debug = require('debug')('backend:routes:transacciones')


router.get('/', async (req, res) => {

    const transaccionesCollection = db.collection('transacciones')
    debug('Buscando transacciones del usuario %s',req.user.user)

    const transacciones = await transaccionesCollection.find({usuario:req.user.user}).toArray()

    debug('Se ha terminado de buscar las transacciones de %s',req.user.user)

    res.send(transacciones)
})
  

module.exports = router