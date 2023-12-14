const categories = require('../models/categorie')
exports.getAll = (req, res) => {
    categories.find()
      .then(categories => res.json(categories))
      .catch(err => res.status(400).json('Error: ' + err))
  }
  
  // GET by id
  exports.getById = (req, res) => {
      const { id } = req.params;
  
      categories.findById(id)
        .then((categorie) => {
          if (!categorie) {
            return res.status(404).json({ error: 'Categorie not found.' });
          }
          res.json(categorie);
        })
        .catch((error) => {
          res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
        });
  }
  
  // POST
// POST
exports.addNew = (req, res) => {
    const name = req.body.name
    const images = req.files.map((file) => file.path);
  
    const newCategorie = new categories({
      name,
      images,
    })
  
    newCategorie
      .save()
      .then(() => res.json('Categorie added!'))
      .catch(err => res.status(400).json('Error: ' + err))
  }