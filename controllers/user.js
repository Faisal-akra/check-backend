const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const errorMsg = "unexpected error";
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).json({
        msg: "All fields is required!",
      });
    }

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      res.status(202).json({
        msg: `user is already exists in this email ${email}`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await  userModel.create({
      name,
      email,
      password: hashedPassword,
    });

      if (!newUser) {
      throw new Error("Failed to create user");
    }

    res.status(200).json({
      msg: "User is registered successfully",
    });
  } catch (error) {
    console.log(errorMsg, error);
    res.status(500).json({
      msg: "User is not registered!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        msg: "all fields are required!",
      });
    }

    const checkEmail = await userModel.findOne({ email });

    if (!checkEmail) {
      return res.status(404).json({
        msg: "user is not found!",
      });
    }

    const comparePass = await bcrypt.compare(password, checkEmail.password);

    if (!comparePass) {
      return res.status(404).json({
        msg: "Invalid Credentials!",
      });
    }

    const token = jwt.sign({ id: checkEmail._id }, process.env.SECRET_KEY, {
      expiresIn: "10hr",
    });

    res.status(200).json({
      msg: "user is loged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error, errorMsg);
    res.status(404).json({
      msg: "user is not login!",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        msg: "user is not found",
      });
    }

    res.status(200).json({
      msg: "succesfully get profile",

      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error, errorMsg);
    res.status(404).json({
      msg: "internal server error",
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const update = req.body;

    const user = userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "user is not found!",
      });
    }

    const updateProfile = await userModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json({
      msg: "profile update successfully",
      updatedProfile: updateProfile,
    });
  } catch (error) {
    console.log(error, errorMsg);
    res.status(404).json({
      msg: "internal server error",
    });
  }
};
module.exports = {
  register,
  login,
  getProfile,
  editProfile,
};
