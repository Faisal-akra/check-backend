const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const verifyUSer = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        msg: "invalid token!",
      });
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "user is not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error, "you are not authorized");
  }
};

module.exports = verifyUSer;
