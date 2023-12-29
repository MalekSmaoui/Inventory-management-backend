const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/finition.controller')


// get all pieces
router.get('/finitions', controller.getAll)
// get piece by id
router.get('/PieceById/:id', controller.getById)
// search by name
router.get('/SearchByAnnee/:anneeName', controller.searchByAnnee)
// add piece
router.post('/AddNewFinition', controller.addNew)
// delete exercise by ID
router.delete('/delete/:id', controller.deleteById)
module.exports = router