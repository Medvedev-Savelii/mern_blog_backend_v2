const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const multer = require("multer");
const path = require("path");
///////////////////////////////////////////////////////

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log(chalk.bgBlue("Connected to MongoDB")))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => {
  console.log(chalk.bgBlue(`Server started in port: ${process.env.PORT}`));
});
