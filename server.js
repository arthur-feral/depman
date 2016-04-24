'use strict';

const http    = require('http');
const express = require('express');
const app     = express();
const port    = 8080;

app.use(express.static(process.cwd() + '/build'));

app.get('/', (req, res) => {
  res.render('index.jade');
});

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log('Server listening at port %d', port);
});
