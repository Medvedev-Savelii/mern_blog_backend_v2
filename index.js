const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const multer = require("multer");
const path = require("path");
///////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, "/images")));
app.use(express.json());
dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      },
      () => {
        console.log(chalk.bgBlue("DB CONECTION"));
      }
    );

    app.listen(process.env.PORT, () => {
      console.log(chalk.bgBlue(`Server started in port: ${process.env.PORT}`));
    });
  } catch (error) {
    console.error(error);
  }
};

app.use("/api/auth", authRoute);

start();
