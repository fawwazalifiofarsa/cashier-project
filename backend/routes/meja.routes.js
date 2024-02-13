module.exports = app => {
    const meja = require("../controllers/meja.controller.js");
    const {verifyLogin} = require("../middleware/verifyLogin")
    var router = require("express").Router();

    // Create a new admin
    router.post("/", verifyLogin, meja.create);
  
    // Retrieve all meja
    router.get("/", verifyLogin, meja.findAll);
  
    // Retrieve a single admin with id
    router.get("/:id", verifyLogin, meja.findOne);
  
    // Update a admin with id
    router.put("/:id", verifyLogin,  meja.update);
  
    // Delete a admin with id
    router.delete("/:id", verifyLogin, meja.delete);
  
    app.use('/meja', router);
  };