const achat = require('../models/achat')
// GET 
exports.getAll = (req, res) => {
  achat.find()
    .then(achats => res.json(achats))
    .catch(err => res.status(400).json('Error: ' + err))
}



// POST
exports.addNew = (req, res) => {
  const date = req.body.date;
  const achatt=req.body.achatt;
  const fournisseur= req.body.fournisseur;
  const prix= req.body.prix;

  const newachat = new achat({
    date,
    achatt,
    fournisseur,
    prix,
  })

  newachat
    .save()
    .then(() => res.json('achat added!'))
    .catch(err => res.status(400).json('Error: ' + err))
}


exports.getById = (req, res) => {
  const { id } = req.params;

  achat.findById(id)
    .then((achat) => {
      if (!achat) {
        return res.status(404).json({ error: 'achat not found.' });
      }
      res.json(achat);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the achat.' });
    });
}

// DELETE
exports.deleteById = (req, res) => {

    const { id } = req.params;

  achat.findByIdAndDelete(id)
    .then(() => {
      res.json('achat deleted!'); // No Content
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while deleting the achat' });
    });
}

