const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { handleHome, handleNewGuide } = require("./handlers");

const PORT = 5678;

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//ENDPOINTS
app.get("/home", handleHome);
app.post("/createGuide", handleNewGuide);

const server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
