const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/client.controller')

// get all exercises
router.get('/', controller.getAll)
// get all exercises
router.post('/Add',controller.addNew)
// get piece by id
router.get('/ClientById/:id', controller.getById)
// delete exercise by ID
router.delete('/delete/:id', controller.deleteById)

module.exports = router

