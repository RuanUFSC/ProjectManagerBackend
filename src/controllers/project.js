const db = require("../config/database");

// Criar um novo Project:

exports.createProject = async (req, res) => {
  const { title, zip_code, cost, done, deadline, username, created_at, updated_at } = req.body;
  const { rows } = await db.query(
    " INSERT INTO projects (title, zip_code, cost, done, deadline, username, created_at, updated_at) " + 
    " VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ",
    [title, zip_code, cost, done, deadline, username, created_at, updated_at]
  );

  res.status(201).send({
    message: "Projeto adicionado com sucesso!",
    body: {
      project: { title, zip_code, cost, done, deadline, username, created_at, updated_at }
    },
  });
};

exports.listProjects = async (req, res) => {
  const response = await db.query("SELECT * FROM projects ORDER BY created_at ASC");
  res.status(200).send(response.rows);
};

exports.listProjectByTitle = async (req, res) => {
  const title = req.params.title;
  const response = await db.query("SELECT * FROM projects WHERE title = $1", [title]);
  // const id = parseInt(req.params.id);
  // const response = await db.query("SELECT * FROM projects WHERE id = $1", [id]);
  res.status(200).send(response.rows);
};

exports.editProjectByTitle = async (req, res) => {
  const title = req.params.title;
  const { zip_code, cost, done, deadline, username, created_at, updated_at } = req.body;
  const response = await db.query(
    " UPDATE projects " +
    " SET zip_code = $2, cost = $3, done = $4, deadline = $5, username = $6, created_at = $7, updated_at = $8 " + 
    " WHERE title = $1 ",
    [title, zip_code, cost, done, deadline, username, created_at, updated_at]);
  res.status(200).send({ message: "Projeto atualizado com sucesso!" });
};


exports.deleteProjectByTitle = async (req, res) => {
  const title = req.params.title;
  const response = await db.query("DELETE FROM projects WHERE title = $1", [title]);
  res.status(200).send({ message: "Projeto apagado com sucesso!" });
};

exports.makeProjectDoneByTitle = async (req, res) => {
  const title = req.params.title;
  const response = await db.query("UPDATE projects SET done = true WHERE title = $1", [title]);
  res.status(200).send({ message: "Projeto concluído com sucesso!" });
};