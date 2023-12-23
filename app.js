const app = require("express")();
const notFound = require("./middleware/not-found");
require("dotenv").config();

const port = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => {
  res.send("<h1> Hello </h1>");
});

app.use(notFound);

const start = () => {
  try {
    // DB Connections
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
