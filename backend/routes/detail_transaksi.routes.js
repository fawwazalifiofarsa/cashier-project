module.exports = app => {
    const detail_transaksi = require("../controllers/detail_transaksi.controller.js");
    const {verifyLogin} = require("../middleware/verifyLogin")
    var router = require("express").Router();

    // Create a new admin
    router.post("/", detail_transaksi.create);
  
    // Retrieve all admins
    router.get("/", verifyLogin, detail_transaksi.findAll);
  
    // Retrieve a single admin with id
    router.get("/:id", verifyLogin, detail_transaksi.findOne);
  
    // Update a admin with id
    router.put("/:id", verifyLogin,  detail_transaksi.update);
  
    // Delete a admin with id
    router.delete("/:id", verifyLogin, detail_transaksi.delete);
  
    app.use('/detail_transaksi', router);
  };