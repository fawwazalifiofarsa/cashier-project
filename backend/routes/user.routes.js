module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const {verifyLogin} = require("../middleware/verifyLogin")
    var router = require("express").Router();
  
    // Login as an admin
    router.post('/login', user.login); 

    // Create a new admin
    router.post("/", user.create);
  
    // Retrieve all user
    router.get("/", verifyLogin, user.findAll);
  
    // Retrieve a single admin with id
    router.get("/:id", verifyLogin, user.findOne);

    // Retrieve data by filter
    router.post("/find", verifyLogin,  user.filter);
  
    // Update a admin with id
    router.put("/:id", verifyLogin,  user.update);
  
    // Delete a admin with id
    router.delete("/:id", verifyLogin, user.delete);
  
    app.use('/user', router);
  };