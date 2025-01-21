const { v4: uuidv4 } = require("uuid");
const { getSessionId, setSessionId } = require("../service/index");
const userModel = require("../models/user.model");

const handleUserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    const newuser = await userModel({ name, email, password });

    await newuser.save();
    return res.render("Login");
    // return res.json({ msg: "user is created successfully", newuser });
  } catch (error) {
    return res.json({ msg: "somthing wrong with handlecreateuser", error });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({ email, password });

    console.log(user);

    if (!user) {
      return res.render("login", {
        error: "Invaild email and password",
      });
    }
    const sessionId = uuidv4();

    setSessionId(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (error) {
    return res.json({ msg: "invaild error" });
  }
};

module.exports = { handleUserSignup, handleUserLogin };
