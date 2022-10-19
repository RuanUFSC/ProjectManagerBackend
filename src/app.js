const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

//   db.sequelize.sync({ force: true }).then(() => {
//       console.log("Drop and re-sync db.");
//     });

// Rotas:
const index = require('./routes/index');
const projectRoute = require("./routes/project.routes");
const userRoute = require("./routes/user.routes");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(index);
app.use('/api/', projectRoute);
app.use('/api/', userRoute);

module.exports = app;