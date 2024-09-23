const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateSign } = require("../../config/jwt");

//! REGISTER USER
const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // Verifica si el nombre de usuario ya existe
    const userDuplicated = await User.findOne({ userName });
    if (userDuplicated) {
      return res.status(400).json("That username already exists. Please try another one.");
    }

    // Crea un nuevo usuario con la contraseña sin hashear; el middleware pre('save') la hasheará automáticamente
    const newUser = new User({ userName, password, role: 'user' });

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);

  } catch (error) {
    return res.status(400).json(error);
  }
};

//!USER LOGIN
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        // Genera un token JWT
        const token = generateSign(user._id);
        return res.status(200).json({ user, token });
      } else {
        return res.status(400).json("The username or password is incorrect.");
      }
    } else {
      return res.status(400).json("The username or password is incorrect.");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}

//!UPDATE USER ROLE (Admins only)
const updateUserRole = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json("Access denied. Admins only.");
    }

    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json("Invalid role. Role must be 'admin' or 'user'.");
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json("User not found.");

    user.role = role;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//!DELETE USER (Admin or Self)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'admin' || req.user.id === id) {
      const userDeleted = await User.findByIdAndDelete(id);
      if (!userDeleted) return res.status(404).json("User not found.");

      return res.status(200).json("User deleted successfully.");
    } else {
      return res.status(403).json("Access denied. You can only delete your own account.");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { register, login, updateUserRole, deleteUser };
