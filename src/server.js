const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();
const app = express();

const setupServer = () => {
  app.use(cors());
  app.use(express.json());
  app.use(pino);

  app.use('/contacts', require('./routes/contacts'));

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  return app;
};

module.exports = setupServer;




