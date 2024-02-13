const db = require("../models");
const Transaksi = db.transaksi;
const Op = db.Sequelize.Op;

// Create and Save a new Transaksi
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_user || !req.body.id_meja || !req.body.nama_pelanggan || !req.body.status) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Transaksi
  const transaksi = {
    tgl_transaksi: req.body.tgl_transaksi,
    id_user: req.body.id_user,
    id_meja: req.body.id_meja,
    nama_pelanggan: req.body.nama_pelanggan,
    status: req.body.status,
  };

  // Save Transaksi in the database
  Transaksi.create(transaksi)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Menu."
    });
  });
};

// Retrieve all Transaksis from the database.
exports.findAll = (req, res) => {
  const tgl_transaksi = req.query.tgl_transaksi;
  var condition = tgl_transaksi ? { tgl_transaksi: { [Op.like]: `%${tgl_transaksi}%` } } : null;

  Transaksi.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transaksis."
      });
    });
};

// Find a single Transaksi with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Transaksi.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaksi with id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Transaksi with id: ${id}`
      });
    });
};

exports.filter = async (req, res) => {
  // define keyword to find data
  let keyword = req.body.keyword;

  let transaksi = await Transaksi.findAll({
    where: {
      [Op.or]: [
        { tgl_transaksi: { [Op.substring]: keyword } },
        { id_user: { [Op.substring]: keyword } },
        { id_meja: { [Op.substring]: keyword } },
        { nama_pelanggan: { [Op.substring]: keyword } },
        { status: { [Op.substring]: keyword } },
      ],
    },
  })
  return res.json({
    data: transaksi
  })
};

// Update a Transaksi by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Transaksi.update(req.body, {
    where: { id_transaksi: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Transaksi was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Transaksi with id: ${id}. Maybe Transaksi was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Transaksi with id: ${id}`
      });
    });
};

// Delete a Transaksi with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Transaksi.destroy({
    where: { id_transaksi: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Transaksi was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Transaksi with id: ${id}. Maybe Transaksi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Transaksi with id: ${id}`
      });
    });
};

// Delete all Transaksis from the database.
exports.deleteAll = (req, res) => {
  Transaksi.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Transaksis were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Transaksis."
      });
    });
};