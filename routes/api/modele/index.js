const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/modele.controller')
// get all pieces
router.get('/modeles', controller.getAll)
// get piece by id
router.get('/ModeleById/:id', controller.getById)
// search by name
router.get('/SearchByBrandId/:brandName', controller.searchByBrand)
// add piece
router.post('/AddNewModele',controller.addNew)

// delete exercise by ID
router.delete('/delete/:id', controller.deleteById)
module.exports = router 