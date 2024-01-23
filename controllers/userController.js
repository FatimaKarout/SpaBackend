const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/generateToken");
const { request } = require("express");
// get all users
const getuser = async (_, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({
      success: true,
      message: "all users found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error while retrieved data",
      error: error.message,
    });
  }
};

// user by id
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error while retrieving user",
      error: error.message,
    });
  }
};
//register

const register = async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      
    });
    await user.save();
    console.log(user)
    return res.json({ 
      message: "Registration successful",
      data:user
     });
  } catch (error) {
    return res.status(400).json({
      message : error.message
    }
    )}}
// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or Password  Wrong",
      });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// upade 
const updateUser = async (req, res) => {
  const { ID } = req.params;
  const { fullName, email, password, phoneNumber } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      ID,
      { fullName, email ,password, phoneNumber},
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to update user',
      error: error.message,
    });
  }
};


// switch to admin
const switchToAdmin = async (req, res) => {
  const { ID } = req.params;
  try {
    const switchUser = await User.findOneAndUpdate(
      { _id: ID },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!switchUser) {
      return res.status(400).json({
        success: false,
        message: `User with ID = ${ID} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `User with ID = ${ID} switched to admin successfully`,
      data: switchUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to switch to admin for user with ID = ${ID}`,
      error: error.message,
    });
  }
};

// delete
const deleteById = async (req, res) => {
  try {
    const { ID } = req.params;
    const user = await User.deleteOne({ _id:ID})
    res.status(200).json({
      success: true,
      message: 'user deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error occured while deleting the user',
      error: error.message,
    });
  }
};



module.exports = {
  getuser,
  getUserById,
  register,
  login,
  updateUser,
  switchToAdmin,
  deleteById,
};
