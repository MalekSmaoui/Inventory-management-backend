const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/factureitems.controller')
//for image path cause we don't have acces to local directory from front


// get all exercises
router.get('/', controller.getAll)
// get all exercises
router.post('/Add', controller.addNew)
// get piece by id
router.get('/FactureItemsById/:id', controller.getById)
// get piece by id
router.get('/SearchByFacture/:brandName', controller.searchByBrand)
// delete exercise by ID
router.delete('/delete/:id', controller.deleteById)

module.exports = router