module.exports = function (io, globs) {

    io.on('connection', (socket) => {

        socket.on('ready', (json) => {
            var  p = JSON.parse(json);
            globs.users.push(p);
        })



        socket.on("disconnect", (reason) => {
          globs.users = globs.users.filter( u => u.id != socket.id);
        });
      });

}