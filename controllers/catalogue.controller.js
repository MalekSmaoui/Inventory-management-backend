const catalogues = require('../models/cataloguepiece')
const categories =require('../models/categorie')
// GET 
exports.getAll = (req, res) => {
  catalogues.find()
    .then(catalogues => res.json(catalogues))
    .catch(err => res.status(400).json('Error: ' + err))
}

// GET by id
exports.getById = (req, res) => {
    const { id } = req.params;

    catalogues.findById(id)
      .then((catalogue) => {
        if (!catalogue) {
          return res.status(404).json({ error: 'Catalogue not found.' });
        }
        res.json(catalogue);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
      });
}

// POST
exports.addNew = (req, res) => {
    const name = req.body.name;
    const categorie = req.body.categorie;
    const images = req.files.map((file) => file.path);
  
    const newCatalogue = new catalogues({
      name,
      images,
      categorie,
    })
  
    newCatalogue
      .save()
      .then(() => res.json('Catalogue added!'))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  exports.searchByCategorie = async (req,res) =>{
    const { categorieName } = req.params;
    try {
      const convertedCategorieName = decodeURIComponent(categorieName.replace(/-/g, ' '));  
      const categorie = await categories.findOne({ name: convertedCategorieName });
    
        if (!categorie) {
          return res.status(404).json({ error: 'Categorie not found.' });
        }
    
        const catalogue = await catalogues.find({ categorie: categorie._id });
    
        res.json(catalogue);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for cars.' });
      }
  
    
}