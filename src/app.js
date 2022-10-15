const express = require('express');
const cors = require('cors');

const app = express();

// Rotas:
const index = require('./routes/index');
const projectRoute = require('./routes/project_routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', projectRoute);

module.exports = app;