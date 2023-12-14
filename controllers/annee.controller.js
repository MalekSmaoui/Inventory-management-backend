const modeles = require('../models/modele')
const marques =require('../models/marque')
const annees=require('../models/annee')

//get id marque from annee by id model
exports.getByIdmod = async (req, res) => {
  try {
    const anneeId = req.params.anneeId;

    const annee = await annees.findById(anneeId)
    .populate({
            path: 'modele',
            model: 'Modele',
            populate: {
                path: 'marque',
                model: 'Marque'
            }
    });

    if (!annee) {
        return res.status(404).send('Piece not found.');
    }

    const anneee = annee.modele.marque;

    // Fetch users whose marques contain this specific marque._id
 /*   const anneee = annee;



    res.json(anneee);*/


    res.json({
        marqueid: anneee._id,
        marque: anneee.name,
        marqueim: anneee.images[0],
    });

} catch (error) {
    res.status(500).send('Error: ' + error.message);
}
}



exports.searchByModel = async (req,res) =>{
  const { modeleName } = req.params;
  try {
    const convertedModeleName = decodeURIComponent(modeleName.replace(/-/g, ' '));  
    const modele = await modeles.findOne({name: convertedModeleName});
  
      if (!modele) {
        return res.status(404).json({ error: 'Model not found.' });
      }
  
      const annee = await annees.find({ modele: modele._id });
  
      res.json(annee);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for years.' });
    }
}



// GET 
exports.getAll = (req, res) => {
  annees.find()
    .then(annees => res.json(annees))
    .catch(err => res.status(400).json('Error: ' + err))
}

// GET by id
exports.getById = (req, res) => {
    const { id } = req.params;

    modeles.findById(id)
      .then((modele) => {
        if (!modele) {
          return res.status(404).json({ error: 'Modele not found.' });
        }
        res.json(modele);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
      });
}

// POST
exports.addNew = (req, res) => {
    const name = req.body.name;
    const modele = req.body.modele;
  
  
    const newAnnee = new annees({
      name,
      modele,
    })
  
    newAnnee
      .save()
      .then(() => res.json('Year added!'))
      .catch(err => res.status(400).json('Error: ' + err))
  }
