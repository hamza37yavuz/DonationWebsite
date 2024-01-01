require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const router = require("./routes/routes");
const notFound = require("./middleware/not-found");
const pageController = require("./controllers/pageControllers");

const ejs = require("ejs");
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

app.use(express.static("./public"));
app.use(express.json());

// routes
// admin sayfasına localhost:3000/adminLogin diyerek girmek için
app.get("/adminLogin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use("/api", router);
app.get("/secondPage", pageController.getSecondPage);

app.use(notFound);

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
