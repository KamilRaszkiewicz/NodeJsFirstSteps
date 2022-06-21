const express = require('express');

const app = express();
app.use(express.static("resources"));

const http = require('http');
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(httpServer);


var globs = {users: []};

require('./controllers/index_controller.js')(httpServer);
require('./controllers/player_io.js')(io, globs);