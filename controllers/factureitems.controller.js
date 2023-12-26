const factureitemss = require('../models/factureitems')
const factures =require('../models/facture')
// GET 
exports.getAll = (req, res) => {
  factureitemss.find()
    .then(factureitemss => res.json(factureitemss))
    .catch(err => res.status(400).json('Error: ' + err))
}

// GET by id
exports.getById = (req, res) => {
    const { id } = req.params;

    factureitemss.findById(id)
      .then((factureitems) => {
        if (!factureitems) {
          return res.status(404).json({ error: 'factureitems not found.' });
        }
        res.json(factureitems);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
      });
}

// POST
exports.addNew = (req, res) => {
    const piece = req.body.piece;
    const ref = req.body.ref;
    const quantite = req.body.quantite;
    const prix = req.body.prix;
    const facture = req.body.facture;
  
  
    const newfactureitems = new factureitemss({
      piece,
      ref,
      quantite,
      prix,
      facture,
    })
  
    newfactureitems
      .save()
      .then(() => res.json('Model added!'))
      .catch(err => res.status(400).json('Error: ' + err))
  }

  exports.searchByBrand = async (req,res) =>{
    const { brandName } = req.params;
    try {
      
      const facture = await factures.findById(brandName);
    
        if (!facture) {
          return res.status(404).json({ error: 'Brand not found.' });
        }
    
        const factureitems = await factureitemss.find({ facture: facture._id });
    
        res.json(factureitems);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for cars.' });
      }
  
    
}

exports.deleteById = (req, res) => {

    const { id } = req.params;

    factureitemss.findByIdAndDelete(id)
    .then(() => {
      res.json('facture deleted!'); // No Content
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while deleting the brand' });
    });
}