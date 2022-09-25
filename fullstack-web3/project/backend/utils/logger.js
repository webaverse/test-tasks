const path = require("path");
// const LOGGER = require("logger").createLogger(
//   path.join(__dirname, "../logs/development.log")
// );
// const LOGGER = require("logger").createLogger();

class LOGGER {
  log() { }
  info() { }
  error() { }
  fatal() { }
  debug() { }
}

module.exports = new LOGGER();
