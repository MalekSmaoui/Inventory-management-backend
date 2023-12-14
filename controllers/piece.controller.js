const pieces = require('../models/piece') // Load the ExerciseDetails model
const categories =require('../models/categorie')
const finitions =require('../models/finition')

// GET
exports.getAll = (req, res) => {
  pieces.find()
    .then(pieces => res.json(pieces))
    .catch(err => res.status(400).json('Error: ' + err))
}
// GET by id
exports.getById = (req, res) => {
    const { id } = req.params;

    pieces.findById(id)
      .then((piece) => {
        if (!piece) {
          return res.status(404).json({ error: 'Piece not found.' });
        }
        res.json(piece);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
      });
}

//Search Piece by brand

exports.searchByFinitionAndCatalogue = async (req,res) =>{
    const { finitionId } = req.params;
    const { catalogueId } = req.params;

    try {
        const finition = await finitions.findById(finitionId);
        const catalogue = await categories.findById(catalogueId);
        if (!finition) {
          return res.status(404).json({ error: 'Finition not found.' });
        }
        if (!catalogue) {
          return res.status(404).json({ error: 'Categorie not found.' });
        }
    
        const piece = await pieces.find({ finition: finition._id , categorie: catalogue._id });
    
        res.json(piece);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for cars.' });
      }
}
const savePiece = async (newPiece) => {
  return new Promise((resolve, reject) => {
      newPiece.save((error, piece) => {
          if (error) {
              reject(error);
          } else {
              resolve(piece);
          }
      });
  });
};

// POST
exports.addNew = async (req, res) => {
  const { name, ref, num, quantite, prix, finition, categorie } = req.body;
  const images = req.files.map((file) => file.path);
  const newPiece = new pieces({
      name,
      ref,
      num,
      quantite,
      prix,
      images,
      finition,
      categorie,
      // other piece attributes
  });

  try {
      const piece = await savePiece(newPiece);
      res.status(201).json(piece);
  } catch (error) {
      console.error('Error saving piece:', error);
      res.status(500).json({ error: 'An error occurred while adding a new piece.' });
  }
};
// DELETE
