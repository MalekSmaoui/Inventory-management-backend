const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/vente.controller')

  

// get all pieces
router.get('/ventes', controller.getAll)
// get piece by id
router.get('/VenteById/:id', controller.getById)
// search by name
router.get('/SearchByUser/:userId', controller.searchByUser)
// add piece
router.post('/AddNewVente',controller.addNew)

module.exports = router