const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/marque.controller')
const multer = require('multer');
const Marque = require('../../../models/marque');
//for image path cause we don't have acces to local directory from front
const path = require('path');
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      const ext = file.originalname.split('.').pop();
      const fileName = Date.now() +'.'+ ext;
      cb(null, fileName);
    },
  });
const upload = multer({ storage: storage }).array('images', 5);

/////
router.get('/images/:filename', async (req, res) => {
    try {
      const filename = req.params.filename;

  
      // Construct the absolute path to the image file
      const imagePath = path.join(__dirname,'..','..','..', 'uploads',filename);

      // Send the image file as the response
      res.sendFile(imagePath);
      
    } catch (error) {
      console.error('Error serving image:', error);     
      res.status(500).send('Internal Server Error');
    }
  });

// get all exercises
router.get('/', controller.getAll)
// get all exercises
router.post('/Add', upload,controller.addNew)
// search by name
router.get('/name/:name', controller.searchByName)
// get piece by id
router.get('/MarqueById/:id', controller.getById)
// delete exercise by ID
router.delete('/delete/:id', controller.deleteById)
//
router.get('/image/:name',controller.imageName)

module.exports = router