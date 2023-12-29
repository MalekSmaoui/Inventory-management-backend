const finitions = require('../models/finition') // Load the ExerciseDetails model
const annees =require('../models/annee')


// GET


exports.getAll = (req, res) => {
    pieces.find()
      .then(finitions => res.json(finitions))
      .catch(err => res.status(400).json('Error: ' + err))
  }
  // GET by id
  exports.getById = (req, res) => {
      const { id } = req.params;
  
      finitions.findById(id)
        .then((finition) => {
          if (!finition) {
            return res.status(404).json({ error: 'Piece not found.' });
          }
          res.json(finition);
        })
        .catch((error) => {
          res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
        });
  }
  
  //Search Piece by brand
  
  exports.searchByAnnee = async (req,res) =>{
      const { anneeName } = req.params;
      try {
        const annee = await annees.findById(anneeName);
      
          if (!annee) {
            return res.status(404).json({ error: 'Year not found.' });
          }
      
          const finition = await finitions.find({ annee: annee._id });
      
          res.json(finition);
        } catch (error) {
          res.status(500).json({ error: 'An error occurred while searching for carsz.' });
        }
  }
  
  // POST
  exports.addNew = (req, res) => {
      const { modele,anneee,finition,couleur,boitev,typecarro,typemoteur,carburant,annee } = req.body;
      
      if (annee == null) {
        return res.status(404).json('Annee is required');
    }
      
      const finitionValue = finition.trim() !== '' ? finition : 'Pas de finition';
      
      const newFinition = new finitions({
        modele,
        anneee,
        finition: finitionValue,
        couleur,
        boitev,
        typecarro,
        typemoteur,
        carburant,
        annee,
        // other piece attributes
      });
     
      newFinition
        .save()
        .then((finition) => {
          res.status(201).json(finition);
        })
        .catch(err => res.status(400).json('Error: ' + err ))
        
  }
  
  exports.deleteById = (req, res) => {

    const { id } = req.params;
  
  finitions.findByIdAndDelete(id)
    .then(() => {
      res.json('Finition deleted!'); // No Content
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while deleting the Finition' });
    });
  }
  