const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename to be unique
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;