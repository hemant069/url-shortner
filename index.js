const express = require("express");
const connectDB = require("./connect");
const urlShortRoute = require("./routes/index");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// DB call is here

connectDB()
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("something wrong with connectDB function "));

// Router is Here

app.use("/api", urlShortRoute);

app.listen(PORT, () => console.log("server is connected "));
