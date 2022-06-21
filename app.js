const express = require('express');

const app = express();
app.use(express.static("resources"));

const http = require('http');
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(httpServer);s


var globs = {users: []};

require('./controllers/indexController.js')(httpServer);
require('./controllers/playerIO.js')(io, globs);
require('./utils/logger.js')(globs);