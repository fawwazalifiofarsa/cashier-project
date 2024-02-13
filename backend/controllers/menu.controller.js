const db = require("../models");
const Menu = db.menu;
const Op = db.Sequelize.Op;

// Create and Save a new menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_menu || !req.body.jenis || !req.body.harga || !req.file.filename) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a menu
  const menu = {
    nama_menu: req.body.nama_menu,
    jenis: req.body.jenis,
    deskripsi: req.body.deskripsi,
    gambar: req.file.filename,
    harga: req.body.harga
  };

  // Save menu in the database
  Menu.create(menu)
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

// Retrieve all menus from the database.
exports.findAll = (req, res) => {
  const nama_menu = req.query.nama_menu;
  var condition = nama_menu ? { nama_menu: { [Op.like]: `%${nama_menu}%` } } : null;

  Menu.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menus."
      });
    });
};

// Find a single menu with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Menu.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find menu with id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving menu with id: ${id}`
      });
    });
};

exports.filter = async (req, res) => {
  // define keyword to find data
  let keyword = req.body.keyword;

  let menu = await Menu.findAll({
    where: {
      [Op.or]: [
        { nama_menu: { [Op.substring]: keyword } },
        { jenis: { [Op.substring]: keyword } },
        { deskripsi: { [Op.substring]: keyword } },
        { harga: { [Op.substring]: keyword } },
      ],
    },
  })
  return res.json({
    data: menu
  })
};

// Update a menu by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id_menu: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "menu was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update menu with id: ${id}. Maybe menu was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating menu with id: ${id}`
      });
    });
};

// Delete a menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.destroy({
    where: { id_menu: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "menu was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete menu with id: ${id}. Maybe menu was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete menu with id: ${id}`
      });
    });
};

// Delete all menus from the database.
exports.deleteAll = (req, res) => {
  Menu.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} menus were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all menus."
      });
    });
};
