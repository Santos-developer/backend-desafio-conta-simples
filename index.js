require("dotenv").config();
const consign = require("consign");
const express = require("express");
const app = express();

app.use(express.json());

consign()
  .then('./src/config/db.js')
  .then('./src/config/routes.js')
  .into(app);

app.listen(process.env.PORT, () => {
  console.log(`Server started on: ${process.env.PORT}`);
});
