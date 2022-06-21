module.exports = function (globs) { 

    setInterval(() => {
        clearConsole();
        console.log("Users connected: ");
        console.log(globs.users);
        
      }, 1000);

      clearConsole = function () {
        process.stdout.write('\033c');
    }

 }