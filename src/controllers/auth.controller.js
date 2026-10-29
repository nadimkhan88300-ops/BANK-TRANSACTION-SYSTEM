
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function userRegisterController(req, res) {
  try {
    const { email, password, name } = req.body;

    const isExists = await userModel.findOne({ email });

    if (isExists) {
      return res.status(422).json({
        message: "User already exists with email.",
        status: "failed",
      });
    }

    const user = await userModel.create({
      email,
      password,
      name,
    });

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
      status: "success",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
}

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: "failed",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: "failed",
      });
    }

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
}

module.exports = {
  userRegisterController,
  userLoginController,
};
