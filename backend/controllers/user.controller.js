const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_user || !req.body.role || !req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    nama_user: req.body.nama_user,
    role: req.body.role,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const nama_user = req.query.nama_user;
  var condition = nama_user ? { nama_user: { [Op.like]: `%${nama_user}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving user with id: ${id}`
      });
    });
};

exports.filter = async (req, res) => {
  // define keyword to find data
  let keyword = req.body.keyword;

  let user = await User.findAll({
    where: {
      [Op.or]: [
        { nama_user: { [Op.substring]: keyword } },
        { role: { [Op.substring]: keyword } },
      ],
    },
  })
  return res.json({
    data: user
  })
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id_user: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id: ${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating user with id: ${id}`
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id_user: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id: ${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete user with id: ${id}`
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "user Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", {
      expiresIn: "24h"
    });
    
    return res.status(200).send({
      message: "user login successfully",
      token:token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err)=>{
      if(err) return res.status(400).json({msg: "Tidak dapat logout"});
      res.status(200).json({msg: "Anda telah logout"});
  });
}