const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');
const cookieSession = require('cookie-session')
const Role = require('./models/role')
const api = require('./routes/api')
const path = require('path');
mongoose.connect(mongoString, { dbName: 'Careco', useNewUrlParser: true, useUnifiedTopology: true,   bufferCommands: false });
const database = mongoose.connection
database.on('error', error => {
    console.log(error)
    process.exit(1)
  })
  
  database.once('open',async () => {
    console.log('Database Connected');
    try {
      // Check if roles already exist
      const rolesCount = await Role.countDocuments();
      if (rolesCount === 0) {
        // Create roles
        await Role.create({ name: 'admin' });
        await Role.create({ name: 'vendeur' });
      }
    } catch (error) {
      console.error('Error populating roles:', error);
    }
    

  }) ;
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with the request
};
const app= express();
app.use(cors(corsOptions));
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
    cookieSession({
      name: 'serviceToken',
      secret: 'agrebi-secret-key', // should use as secret environment variable
      httpOnly: true,
    }),
  )
  
  app.use('/api', api)
// Serve the default image
app.get('/default-image.png', (req, res) => {
  // Set the content type of the response
  res.setHeader('Content-Type', 'image/png');

  // Send the default image file from the "uploads" folder
  const defaultImagePath = path.join(__dirname, 'uploads', 'default-image.png');
  res.sendFile(defaultImagePath);
});
const port= process.env.PORT || 5000;



   app.listen(port,()=> {
        console.log(`Server running on port ${port}`);
    });



  app.use('/api/marques/images', express.static(path.join(__dirname, 'uploads')));
