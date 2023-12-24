const app = require("express")();
const router = require("./routes/routes");
const notFound = require("./middleware/not-found");
const { connectDB } = require("./db/connection");
require("dotenv").config();

const port = process.env.PORT || 3000;

// routes
app.use("/api/v1/tasks", router);

app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.DB_PASSWORD);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
