
// Responsável pelas rotas da classe 'Project'.
 
 const router = require('express-promise-router')();
 const project = require('../controllers/project');
 const user = require('../controllers/user');

 // Responsável por criar um novo usuário: (POST): localhost:3000/api/users
router.post('/users', user.createUser);

// Responsável por criar um novo projeto: (POST): localhost:3000/api/project
router.post('/project', project.createProject);

// Responsável por listar todos os projetos: (GET): localhost:3000/api/projects
router.get('/projects', project.listProjects);

// Responsável por listar um projeto pelo title: (GET): localhost:3000/api/project/:title
// Posteriormente trocar pelo Id que deverá ser recebido pela api após o listProjects
router.get('/project/:title', project.listProjectByTitle);

// Responsável por atualizar um projeto pelo title: (PUT): localhost:3000/api/project/:title
// Posteriormente trocar pelo Id que deverá ser recebido pela api após o listProjects
router.put('/project/:title', project.editProjectByTitle);

// Responsável por apagar um projeto pelo title: (DELETE): localhost:3000/api/project/:title
// Posteriormente trocar pelo Id que deverá ser recebido pela api após o listProjects
router.delete('/project/:title', project.deleteProjectByTitle);

// Responsável por marcar um projeto como done pelo title: (PATCH): localhost:3000/api/project/:title
// Posteriormente trocar pelo Id que deverá ser recebido pela api após o listProjects
router.patch('/project/:title', project.makeProjectDoneByTitle);

module.exports = router;