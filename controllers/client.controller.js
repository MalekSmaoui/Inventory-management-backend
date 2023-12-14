const client = require('../models/client')
// GET 
exports.getAll = (req, res) => {
  client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err))
}



// POST
exports.addNew = (req, res) => {
  const name = req.body.name;
  const num=req.body.num;
  const adresse= req.body.adresse;


  const newClient = new client({
    name,
    num,
    adresse,
  })

  newClient
    .save()
    .then(() => res.json('client added!'))
    .catch(err => res.status(400).json('Error: ' + err))
}


exports.getById = (req, res) => {
  const { id } = req.params;

  client.findById(id)
    .then((client) => {
      if (!client) {
        return res.status(404).json({ error: 'client not found.' });
      }
      res.json(client);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the client.' });
    });
}

// DELETE
exports.deleteById = (req, res) => {

    const { id } = req.params;

  client.findByIdAndDelete(id)
    .then(() => {
      res.json('client deleted!'); // No Content
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while deleting the client' });
    });
}

