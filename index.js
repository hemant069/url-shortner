const express = require("express");
const connectDB = require("./connect");
const urlShortRoute = require("./routes/index");
const userRoute = require("./controller/user");
// server side rendering using EJS
const ejs = require("ejs");
const path = require("path");
const urlModel = require("./models/url-shorter.model");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const urls = await urlModel.find();

  return res.render("Home", { urls });
});

// DB call is here

connectDB()
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("something wrong with connectDB function "));

// Router is Here

app.use("/api", urlShortRoute);
app.use("api/user", userRoute);

app.listen(PORT, () => console.log("server is connected "));
