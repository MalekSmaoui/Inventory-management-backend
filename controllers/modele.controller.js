const modeles = require('../models/modele')
const marques =require('../models/marque')
// GET 
exports.getAll = (req, res) => {
  modeles.find()
    .then(modeles => res.json(modeles))
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
    const marque = req.body.marque;
  
  
    const newModele = new modeles({
      name,
      marque,
    })
  
    newModele
      .save()
      .then(() => res.json('Model added!'))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  exports.searchByBrand = async (req,res) =>{
    const { brandName } = req.params;
    try {
      const convertedMarqueName = decodeURIComponent(brandName.replace(/-/g, ' '));  
      const marque = await marques.findOne({ name: convertedMarqueName });
    
        if (!marque) {
          return res.status(404).json({ error: 'Brand not found.' });
        }
    
        const modele = await modeles.find({ marque: marque._id });
    
        res.json(modele);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for cars.' });
      }
  
    
}

// DELETE
exports.deleteById = (req, res) => {

  const { id } = req.params;

modeles.findByIdAndDelete(id)
  .then(() => {
    res.json('Model deleted!'); // No Content
  })
  .catch((error) => {
    res.status(500).json({ error: 'An error occurred while deleting the Model' });
  });
}
