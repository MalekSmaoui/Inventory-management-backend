const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/annee.controller')

//get marque id by mod id by annee id with populate
router.get('/MarqueIdByModId/:anneeId',controller.getByIdmod)

// get all pieces
router.get('/annees', controller.getAll)

// search by name
router.get('/SearchByModeleId/:modeleName', controller.searchByModel)
router.post('/AddNewAnnee',controller.addNew)
module.exports = router