module.exports = function (io, globs) {
    var logger = require("../utils/logger.js");

    io.on('connection', (socket) => {

        socket.on('ready', (json) => {
            var  p = JSON.parse(json);
            p.socket_id = socket.id
            globs.users.push(p);
            logger(globs);
        });
        

        socket.on("disconnect", (reason) => {
          globs.users = globs.users.filter( u => u.socket_id != socket.id);
          logger(globs);
        });
      });

}