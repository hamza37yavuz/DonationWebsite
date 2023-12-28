require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/routes");
const notFound = require("./middleware/not-found");

const port = process.env.PORT || 3000;

app.use(express.json());

// routes
app.use("/api/", router);

app.use(notFound);

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
