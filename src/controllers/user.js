const db = require("../config/database");

// Criar um novo usuário:

exports.createUser = async (req, res) => {
  const { name, password, username } = req.body;
  const { rows } = await db.query(
    "INSERT INTO users (name, password, username) " + 
    " VALUES ($1, crypt($2, gen_salt('bf')), $3) ",
    [name, password, username]
  );

  res.status(201).send({
    message: "Usuário criado com sucesso!",
    body: {
      user: { name, username, password }
    },
  });
};