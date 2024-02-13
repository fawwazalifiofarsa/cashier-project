const db = require("../models");
const Detail_transaksi = db.detailTransaksi;
const Op = db.Sequelize.Op;

// Create and Save a new detail_transaksi
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_transaksi || !req.body.id_menu || !req.body.harga) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a detail_transaksi
  const detail_transaksi = {
    id_transaksi: req.body.id_transaksi,
    id_menu: req.body.id_menu,
    harga: req.body.harga
  };

  // Save detail_transaksi in the database
  Detail_transaksi.create(detail_transaksi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Detail_transaksi."
      });
    });
};

// Retrieve all transaction details from the database.
exports.findAll = (req, res) => {
  const id_transaksi = req.query.id_transaksi;
  var condition = id_transaksi ? { id_transaksi: { [Op.like]: `%${id_transaksi}%` } } : null;

  Detail_transaksi.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transaction details."
      });
    });
};

// Find a single detail_transaksi with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Detail_transaksi.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find detail_transaksi with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving detail_transaksi with id=" + id
      });
    });
};

// Update a detail_transaksi by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Detail_transaksi.update(req.body, {
    where: { id_detail_transaksi: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "detail_transaksi was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update detail_transaksi with id=${id}. Maybe detail_transaksi was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating detail_transaksi with id=" + id
      });
    });
};

// Delete a detail_transaksi with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Detail_transaksi.destroy({
    where: { id_detail_transaksi: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "detail_transaksi was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete detail_transaksi with id=${id}. Maybe detail_transaksi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete detail_transaksi with id=" + id
      });
    });
};

// Delete all transaction details from the database.
exports.deleteAll = (req, res) => {
  Detail_transaksi.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} transaction details were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all transaction details."
      });
    });
};