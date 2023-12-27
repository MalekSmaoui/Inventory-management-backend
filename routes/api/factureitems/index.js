const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/factureitems.controller')
//for image path cause we don't have acces to local directory from front
const Facture = require('../../../models/facture');
const Client = require('../../../models/client');

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

router.get('/getClientByFactureId/:factureId', async (req, res) => {
    try {
      const factureId = req.params.factureId;
  
      // Find the Facture by ID
      const facture = await Facture.findById(factureId);
  
      if (!facture) {
        return res.status(404).json({ message: 'Facture not found' });
      }
  
      // Get the client associated with the Facture
      const client = await Client.findById(facture.clientid);
  
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
  
      // Return the client information
      res.status(200).json(client);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


module.exports = router