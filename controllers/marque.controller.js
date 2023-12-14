const marque = require('../models/marque')
// GET 
exports.getAll = (req, res) => {
  marque.find()
    .then(marques => res.json(marques))
    .catch(err => res.status(400).json('Error: ' + err))
}


exports.searchByName = (req, res) => {
  const name = req.params.name
  marque.find({ name: { $regex: name, $options: 'i' } })
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err))
}

// POST
exports.addNew = (req, res) => {
  const name = req.body.name
  const images = req.files.map((file) => file.path);

  const newMarque = new marque({
    name,
    images,
  })

  newMarque
    .save()
    .then(() => res.json('Brand added!'))
    .catch(err => res.status(400).json('Error: ' + err))
}


exports.getById = (req, res) => {
  const { id } = req.params;

  marque.findById(id)
    .then((marque) => {
      if (!marque) {
        return res.status(404).json({ error: 'Marque not found.' });
      }
      res.json(marque);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the piece.' });
    });
}

// DELETE
exports.deleteById = (req, res) => {

    const { id } = req.params;

  marque.findByIdAndDelete(id)
    .then(() => {
      res.json('Brand deleted!'); // No Content
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while deleting the brand' });
    });
}


exports.imageName = async (req,res) => {
  const marqueName = req.params.name;

  try {
    const marquee = await marque.findOne({ name: marqueName });

    if (!marquee) {
      return res.status(404).json({ message: 'Marque not found' });
    }

    if (marquee.images.length === 0) {
      return res.status(404).json({ message: 'No images found for this marque' });
    }

    // Get the first image name
    const firstImageName = marquee.images[0];
    const id = marquee._id;
    return res.status(200).json({ firstImageName,id });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}