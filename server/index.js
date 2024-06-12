const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Started on port: ${PORT}`);
});
