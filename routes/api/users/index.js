const express = require('express')
const router = express.Router()
const userModel = require('../../../models/user')
const { verifySignUp } = require("../../../middlewares");
const controller = require("../../../controllers/auth.controller");
const controlleruser = require("../../../controllers/user.controller");
const { authJwt } = require("../../../middlewares");
const config = require("../../../config/auth.config");
const jwt = require("jsonwebtoken")

router.post(
    '/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  )

//authentication routes
router.post('/auth/signin', controller.signin)
router.put('/confirm_user/:username',controller.confirm)
router.put('/block_user/:username',controller.block)
router.post('/auth/signout', controller.signout)
router.get('/auth/allusers', controller.getAll)
router.get('/auth/UserById/:id', controller.getUserById)
//user routes
router.get('/test/all', controlleruser.allAccess)
router.get(
  '/test/Vend',
  [authJwt.verifyToken, authJwt.isVendeur],
  controlleruser.vendeurBoard
)
router.get(
  '/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  controlleruser.adminBoard
)
router.get('/me', async (req, res) => {
  try {
      // You can access the user's ID from the request object, assuming your JWT middleware sets it there
      res.header('Access-Control-Allow-Credentials', true);
      
      const authHeader = req.headers.authorization; 
      console.log(authHeader);
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized!' });
      }
  
      const token2 = authHeader.split(' ')[1];
      console.log(token2);  
      
      const token = req.cookies.serviceToken;
      //const t = req.session.token;
      //console.log(t);
      console.log(token);
      console.log(config.secret);
      jwt.verify(token2, config.secret, async (err, decoded) => {
        if (err) {
          //console.error(err);
          return res.status(401).json({ message: 'Unauthorized!' });
        }
    
        const userId = decoded.id;
    
        // Fetch user details from your database based on the userId
        const user = await userModel.findById(userId); // Implement this function to retrieve user details
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Respond with the user's details
        res.status(200).json({ user });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router