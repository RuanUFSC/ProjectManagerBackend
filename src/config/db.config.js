const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    HOST: process.env.HOST, //|| "localhost",
    USER: process.env.USER, //|| "postgres",
    PASSWORD: process.env.PASSWORD, //|| "123",
    DB: process.env.DB, //|| "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };