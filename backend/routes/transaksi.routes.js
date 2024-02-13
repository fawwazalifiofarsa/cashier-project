module.exports = app => {
    const transaksi = require("../controllers/transaksi.controller.js");
    const {verifyLogin} = require("../middleware/verifyLogin")
    var router = require("express").Router();

    // Create a new admin
    router.post("/", verifyLogin, transaksi.create);
  
    // Retrieve all transaksi
    router.get("/", verifyLogin, transaksi.findAll);
  
    // Retrieve a single admin with id
    router.get("/:id", verifyLogin, transaksi.findOne);
  
    // Retrieve data by filter
    router.post("/find", verifyLogin,  transaksi.filter);
  
    // Update a admin with id
    router.put("/:id", verifyLogin,  transaksi.update);
  
    // Delete a admin with id
    router.delete("/:id", verifyLogin, transaksi.delete);
  
    app.use('/transaksi', router);
  };