module.exports = app => {
    const menu = require("../controllers/menu.controller.js");
    const {verifyLogin} = require("../middleware/verifyLogin");
    const upload = require("../middleware/upload.js");
    var router = require("express").Router();

    // Create a new admin
    router.post("/", verifyLogin, upload, menu.create);
  
    // Retrieve all menu
    router.get("/", verifyLogin, menu.findAll);
  
    // Retrieve a single admin with id
    router.get("/:id", verifyLogin, menu.findOne);
  
    // Retrieve data by filter
    router.post("/find", verifyLogin,  menu.filter);
  
    // Update a admin with id
    router.put("/:id", verifyLogin,  menu.update);
  
    // Delete a admin with id
    router.delete("/:id", verifyLogin, menu.delete);
  
    app.use('/menu', router);
  };