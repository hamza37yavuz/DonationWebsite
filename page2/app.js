const express = require('express')
const app = express()

require("dotenv").config()
require("./src/db/dbConnection")
const port = process.env.PORT || 5001

const router = require("./src/routers")

// Middleware
app.use(express.json())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb", extended: true, parameterLimit:50000}))

app.use("/api", router)


app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
// const start = () => {
//     try {
//       // DB Connections
//       app.listen(port, () => console.log(`Server is listening port ${port}...`));
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
// start();

