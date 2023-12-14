const config = require("../config/auth.config");
const express = require("express");
const router = express.Router();
const User = require("../models/user")
const Role = require("../models/role")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        image: req.body.image,
      });
    user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }    
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles },
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
    
                res.send({ message: "User was registered successfully!" });
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            user.roles = [role._id];
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              res.send({ message: "User was registered successfully!" });

            });
          });
        }
      });
  };
  

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    const usersWithRoles = await Promise.all(users.map(async (user) => {
        const roles = await Role.find({ _id: { $in: user.roles } }, 'name');
        return {
            ...user._doc,
            roles: roles.map(role => role.name)
        };
    }));
    res.json(usersWithRoles);
} catch (err) {
    res.status(400).json('Error: ' + err);
}
};
exports.confirm = (req, res) => {
  User.findOne({
    username: req.params.username,
  })
    .then((user) => {
      if (!user) {
        return res.send({
          message: "User not found !",
        });
      } else if (user && user.accountStatus == true) {
        return res.send({
          message: "Votre compte est déja activé !",
        });
      } else {
        user.accountStatus = true;
        user.save((err) => {
          return res.send({
            message: "Votre compte est activé avec succées !",
          });
        });
      }
    })
    .catch((e) => console.log("error", e));
};
exports.block = (req, res) => {
  User.findOne({
    username: req.params.username,
  })
    .then((user) => {
      if (!user) {
        return res.send({
          message: "User not found !",
        });
      } else if (user && user.accountStatus == false) {
        return res.send({
          message: "Votre compte est déja blocké !",
        });
      } else {
        user.accountStatus = false;
        user.save((err) => {
          return res.send({
            message: "le compte est blocké avec succées !",
          });
        });
      }
    })
    .catch((e) => console.log("error", e));
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

     if (user.accountStatus === false) {
        return res.status(401).send({message : "Account not activated. Please Consult Mr.Smaoui."});
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());
      console.log(user.roles);
      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        token: token,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
exports.getUserById= (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'user not found.' });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    });
}