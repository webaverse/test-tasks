//node_modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//routes
const appRoutes = require("../routes");

//config
const { ROUTE_VERSION, PORT } = require("../config");

//const
const { MESSAGES } = require("../consts");

//middleware
const { routeMiddleware } = require("../utils");

const createApp = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(routeMiddleware);

  app.use(`/`, appRoutes);

  return app;
}

const backendSetup = () => {
  const app = createApp();

  app.listen(PORT, () => {
    console.info(MESSAGES.SERVER_START_SUCCESS);
  })
}

const App = createApp();

module.exports = {
  backendSetup,
  App
};