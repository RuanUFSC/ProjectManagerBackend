const project = require("../controllers/projects_controller.js");

var router = require("express").Router();

// Create a new project
router.post("/project", project.create);

// Retrieve all projects
router.get("/projects", project.findAll);

// Retrieve all published project
router.get("/projects/done", project.findAllDone);

// Retrieve a single project with id
router.get("/project/:id", project.findOne);

// Update a project with id
router.put("/project/:id", project.update);

// Mark a project as done with id
router.patch("/project/:id/done", project.makeDone);

// Delete a project with id
router.delete("/project/:id", project.delete);

module.exports = router;