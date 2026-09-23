import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Email and password validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "password should be greater or equla to 8 characters",
      });
    }

    // Password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    const token = generateToken(user._id);

    return res.json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in user register controller" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.json({message: "please enter a valid password"})
    }

    if (isValid) {
      const token = generateToken(user._id);
      return res.json({ message: "User login successfully", token });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in user login controller" });
  }
};

const userAdmin = async (req, res) => {
  try {
    const {email , password} = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      return res.json({success: true, message: "Admin user login successfully",token})
    } else {
      return res.json({success: false, message: "Invalid email and password"})
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in user login controller" });
  }
}

export { userRegister, userLogin, userAdmin };
