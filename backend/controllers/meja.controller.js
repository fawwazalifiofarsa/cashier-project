const db = require("../models");
const Meja = db.meja;
const Op = db.Sequelize.Op;

// Create and Save a new meja
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nomor_meja) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a meja
  const meja = {
    nomor_meja: req.body.nomor_meja
  };

  // Save meja in the database
  Meja.create(meja)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Meja."
      });
    });
};

// Retrieve all mejas from the database.
exports.findAll = (req, res) => {
  const nomor_meja = req.query.nomor_meja;
  var condition = nomor_meja ? { nomor_meja: { [Op.like]: `%${nomor_meja}%` } } : null;

  Meja.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mejas."
      });
    });
};

// Find a single meja with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Meja.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find meja with id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving meja with id: ${id}`
      });
    });
};

// Update a meja by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Meja.update(req.body, {
    where: { id_meja: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "meja was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update meja with id: ${id}. Maybe meja was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating meja with id: ${id}`
      });
    });
};

// Delete a meja with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Meja.destroy({
    where: { id_meja: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "meja was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete meja with id: ${id}. Maybe meja was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete meja with id: ${id}`
      });
    });
};

// Delete all mejas from the database.
exports.deleteAll = (req, res) => {
  Meja.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} mejas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all mejas."
      });
    });
};