const facture = require('../models/facture')
// GET 
exports.getAll = (req, res) => {
  facture.find()
    .then(factures => res.json(factures))
    .catch(err => res.status(400).json('Error: ' + err))
}




// POST
exports.addNew = (req, res) => {
    const { client,clientid } = req.body;
    const currentDate = new Date();
  
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
  
    // Pad single-digit day and month with a leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const etat = false;
    const date = `${formattedDay}/${formattedMonth}/${year}`;


  const newfacture = new facture({
    client,
    etat,
    date,
    clientid,
  })

  newfacture
    .save()
    .then(() => res.json('Brand added!'))
    .catch(err => res.status(400).json('Error: ' + err))
}


exports.markFactureAsPaid= async (req, res) => {
    const { factureId } = req.params;
    try {
        const { factureId } = req.params;
    
        // Find the Facture document by ID and update the etat field
        const updatedFacture = await facture.findByIdAndUpdate(
          factureId,
          { etat: true },
          { new: true } // Return the updated document
        );
    
        if (!updatedFacture) {
          return res.status(404).json({ error: 'Facture not found' });
        }
    
        res.json(updatedFacture);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

exports.getById = (req, res) => {
  const { id } = req.params;

  facture.findById(id)
    .then((facture) => {
      if (!facture) {
        return res.status(404).json({ error: 'facture not found.' });
      }
      res.json(facture);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
    });
}

// DELETE
exports.deleteById = (req, res) => {

    const { id } = req.params;

  facture.findByIdAndDelete(id)
    .then(() => {
      res.json('facture deleted!'); // No Content
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while deleting the brand' });
    });
}


