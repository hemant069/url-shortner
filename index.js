const express = require("express");
const connectDB = require("./connect");
const urlShortRoute = require("./routes/index");
const userRoute = require("./controller/user");
const staticRoute = require("./routes/static.routes");
const cookie = require("cookie-parser");
// server side rendering using EJS
const ejs = require("ejs");
const path = require("path");
const urlModel = require("./models/url-shorter.model");
const { restrictTo, checkForAuthentication } = require("./middleware");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookie());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// DB call is here

connectDB()
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("something wrong with connectDB function "));

// Middleware

app.use(checkForAuthentication);

// Router is Here

app.use("/", staticRoute);
app.use("/api", restrictTo(["NORMAL"]), urlShortRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log("server is connected "));
