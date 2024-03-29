import express from "express";

import logger, {
  logUncaughtException,
  logUnhandledRejection,
} from "./startup/logger.js";
import config from "./startup/config.js";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import validation from "./startup/validation.js";
import prod from "./startup/prod.js";
import cors from "./startup/cors.js";

if (!process.env.NODE_ENV) {
  throw new Error(
    "FATAL ERROR: NODE_ENV is not defined. Set to either development or production"
  );
}

const app = express();

logUncaughtException();
logUnhandledRejection();
cors(app);
routes(app);
db();
config();
validation();
prod(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

console.log("Running in " + process.env.NODE_ENV);

//throw new Error("Something is wrong");

// const p = Promise.reject(new Error("Fail promise"));
// p.then(() => console.log("Done"));

export default server;
