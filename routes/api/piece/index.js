const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/piece.controller')
const pieces = require('../../../models/piece') // Load the ExerciseDetails model

const multer = require('multer');
const path = require('path');


function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename : function (req, file, cb) {
  const ext = file.originalname.split('.').pop();
  const validExtensions = ['jpg', 'jpeg'];

  if (!validExtensions.includes(ext.toLowerCase())) {
    return cb(new Error('Invalid file extension'));
  }

  const fileName = `${Date.now()}_${generateRandomString(8)}.jpg`;
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
// get all pieces
router.get('/pieces', controller.getAll)
// get piece by id
router.get('/PieceById/:id', controller.getById)
// search by name
router.get('/SearchByFinitionAndCatalogue/:finitionId/:catalogueId', controller.searchByFinitionAndCatalogue)
// add piece

router.post('/AddNewPiece', (req, res) => {
    console.log('Received request to add new piece');
    upload(req, res, async (err) => {
        console.log('Inside upload middleware');
        if (err) {
            console.error('Error uploading files:', err);
            res.status(500).json({ error: 'An error occurred while uploading files.' });
            return;
        }

        // The rest of your addNew logic here
        const { name,modele,annee, ref, num, quantite, prix,description, finition, categorie } = req.body;
        const images = req.files.map((file) => file.path);
        req.files.forEach((file, index) => {
            console.log(`File ${index + 1}: ${file.originalname}`);
        });
        if (finition == null || categorie == null) {
          return res.status(404).json('Both finition and categorie required');
      }
        const newPiece = new pieces({
            name,
            modele,
            annee,
            ref,
            num,
            quantite,
            prix,
            description,
            images,
            finition,
            categorie,
            // other piece attributes
        });

        try {
            const piece = await newPiece.save();
            res.status(201).json(piece);
        } catch (error) {
            console.error('Error saving piece:', error);
            res.status(500).json({ error: 'An error occurred while adding a new piece.' });
        }
    });
});

module.exports = router