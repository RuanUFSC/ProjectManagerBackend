const user = require("../controllers/users_controller.js");
  
var router = require("express").Router();

// Create a new user
router.post("/users", user.create);

// Retrieve a single user with id
router.get("/users", user.findOne);

module.exports = router;