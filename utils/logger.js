module.exports = function (globs) {
  process.stdout.write('\033c');
  console.log("Users connected: ");
  console.log(globs.users);
}