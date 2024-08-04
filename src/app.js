const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.use((req, res) => {
  res.status(404).send("<h1>PAGE NOT FOUND </h1>");
});
app.listen(3000);
