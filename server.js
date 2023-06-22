const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');
const cookieSession = require('cookie-session')
const Role = require('./models/role')
const api = require('./routes/api')

mongoose.connect(mongoString, { dbName: 'Careco', useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection
database.on('error', error => {
    console.log(error)
    process.exit()
  })
  
  database.once('connected', () => {
    console.log('Database Connected')

  }) 
const app= express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
      name: 'agrebi-session',
      secret: 'COOKIE_SECRET', // should use as secret environment variable
      httpOnly: true,
    }),
  )
  
  app.use('/api', api)

const port= process.env.PORT || 5000;
const populateRoles = async () => {
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
    };

app.use(cors());
populateRoles()
  .then(() => {
    // Start the server
   app.listen(port,()=> {
        console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing roles:', error);
  });



