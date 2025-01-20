const userModel = require("../models/user.model");

const handleUserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newuser = await userModel({ name, email, password });

    await newuser.save();

    return res.json({ msg: "user is created successfully", newuser });
  } catch (error) {
    return res.json({ msg: "somthing wrong with handlecreateuser", error });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.render("login", {
        error: "Invaild email and password",
      });
    }
  } catch (error) {}
};

module.exports = { handleUserSignup, handleUserLogin };
