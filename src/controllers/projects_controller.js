const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;
let Correios = require('node-correios');
let correios = new Correios();

// Criação de novo projeto
exports.create = (req, res) => {

    // Validção da requisição
    if (!req.body.title || !req.body.zip_code || !req.body.cost || !req.body.deadline || !req.headers.username) {
      res.status(400).send({
        message: "Todos os campos devem ser preenchidos"
      });
      return;
    }
    
    // Criação do objeto
    const project = {
        title: req.body.title,
        zip_code: req.body.zip_code,
        cost: req.body.cost,
        done: false,
        deadline: req.body.deadline,
        username: req.headers.username
    };
  
    // Salva projeto no banco de dados
    Project.create(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro no cadastro do projetos."
      });
    });
};

// Retorna todos os projetos do usuário
exports.findAll = (req, res) => {

    var username = req.headers.username;
    var condition = { username: username }

    Project.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Ocorreu um erro na consulta dos projetos."
      });
    });
};

// Retorna um projeto pelo id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Project.findByPk(id)
    .then(data => {
      if (data.dataValues.zip_code) {
        let zipcode = data.dataValues.zip_code.toString()

        correios.consultaCEP({ cep: zipcode })
        .then(result => {

          if(result.localidade !== undefined && result.uf !== undefined) {
            var local = result.bairro + ' - ' + result.localidade + '/' + result.uf;     
          } else {
            var local = (`CEP ${zipcode} não localizado na base de dados`);
          }   

          var projectData = {
            id: data.dataValues.id,
            title: data.dataValues.title,
            cidade: local,
            cost: data.dataValues.cost,
            done: data.dataValues.done,
            deadline: data.dataValues.deadline,
            username: data.dataValues.username,
            createdAt: data.dataValues.createdAt,
            updatedAt: data.dataValues.updatedAt
          } 

          res.send(projectData)
        })      
             
      } else {
        res.status(404).send({
          message: `O projeto com id=${id} não foi localizado.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocorreu um erro na consulta do projeto com id=" + id
      });
    });    
};

// Atualiza um projeto utilizando seu id
exports.update = (req, res) => {
    const id = req.params.id;
  
    Project.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Projeto atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível localizar e atualizar o projeto com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o projeto de id=" + id
      });
    });
};

// Marca projeto como concluído pelo seu id
exports.makeDone = (req, res) => {
    const id = req.params.id;
    Project.update({done: true} , {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Projeto marcado como concluído."
        });
      } else {
        res.send({
          message: `Não foi possível marcar o projeto de id=${id} como concluído.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro ao marcar o projeto de id=${id} como concluído.`
      });
    });
};

// Apaga um projeto pelo id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Project.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Projeto apagado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível localizar e apagar o projeto de id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao deletar o projeto de id=" + id
      });
    });
};

  exports.findAllDone = (req, res) => {
    Project.findAll({ where: { done: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na consulta do projeto."
      });
    });
};
