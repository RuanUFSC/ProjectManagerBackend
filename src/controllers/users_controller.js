const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Criação de usuário
exports.create = (req, res) => {
    // Valida os dados informados
    if (!req.body.name || !req.body.username || !req.body.password) {
      res.status(400).send({
        message: "Todos os campos devem ser preenchidos"
      });
      return;
    }

    // Cria objeto user
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    const query = `INSERT INTO users (id, name, password, username) VALUES (uuid_generate_v4(), '${user.name}', crypt('${user.password}', gen_salt('bf')), '${user.username}') `

    // Realiza a inserção no banco de dados com  a senha criptografada
    User.sequelize.query(query)
        .then(data => {
            res.send(`Usuário ${user.username} criado com sucesso`);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro no cadastro do usuário."
            });
        });
  };

exports.findOne = (req, res) => {

    const user = {
        username: req.body.username,
        password: req.body.password
    };

    const query = `SELECT id FROM USERS WHERE username = '${user.username}' AND password = crypt('${user.password}', password)`;

    // Realiza a consulta no banco de dados com a senha criptografada
    User.sequelize.query(query)
        .then(data => {
            if(data[0][0]) {
                var id = (data[0][0].id);
                res.send(`Usuário ${user.username} logado com sucesso, id ${id}.`);
            } else {
                res.send('Usuário ou senha incorreto.')
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro na requisição de login."
            });
        });
  };