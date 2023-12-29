const ventes = require('../models/vente') // Load the ExerciseDetails model
const users =require('../models/user')
const pieces =require('../models/piece')

// GET
exports.getAll = (req, res) => {
  ventes.find()
    .then(ventes => res.json(ventes))
    .catch(err => res.status(400).json('Error: ' + err))
}
// GET by id
exports.getById = (req, res) => {
    const { id } = req.params;

    ventes.findById(id)
      .then((vente) => {
        if (!vente) {
          return res.status(404).json({ error: 'vente not found.' });
        }
        res.json(vente);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving the vente.' });
      });
}

//Search vente by brand

exports.searchByUser = async (req,res) =>{
  const { userId } = req.params;
  try {
    const convertedMarqueName = decodeURIComponent(userId.replace(/-/g, ' '));  
    const user = await users.findOne({ name: convertedMarqueName });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const vente = await ventes.find({ user: user._id });
  
      res.json(vente);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for cars.' });
    }

  
}

// POST
exports.addNew = async (req, res) => {
  const { nom,quantite, prix, user, piece } = req.body;
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();

  // Pad single-digit day and month with a leading zero
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const date = `${formattedDay}/${formattedMonth}/${year}`;

  try {
      // Find the piece by its ID
      const existingPiece = await pieces.findById(piece);

      if (!existingPiece) {
          return res.status(404).json({ error: 'Piece not found.' });
      }

      // Check if the quantity is sufficient
      if (parseInt(existingPiece.quantite) < parseInt(quantite)) {
          return res.status(400).json({ error: 'Insufficient quantity.' });
      }

      // Subtract the vente's quantity from the piece's quantity
      existingPiece.quantite = (parseInt(existingPiece.quantite) - parseInt(quantite)).toString();

      // Save the updated piece
      const updatedPiece = await existingPiece.save();

      // Create a new vente with the updated quantity
      const newVente = new ventes({
          nom,  
          date,
          quantite,
          prix,
          user,
          piece: updatedPiece._id,
          // other vente attributes
      });

      // Save the new vente
      const savedVente = await newVente.save();

      res.status(201).json(savedVente);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding a new vente.' });
  }
}
// DELETE
exports.deleteById = (req, res) => {

  const { id } = req.params;

  ventes.findByIdAndDelete(id)
  .then(() => {
    res.json('vente deleted!'); // No Content
  })
  .catch((error) => {
    res.status(500).json({ error: 'An error occurred while deleting the brand' });
  });
}