const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateSign } = require("../../config/jwt");

//! REGISTER USER
const register = async (req, res, next) => {
  try {
    // Verifica si el nombre de usuario ya existe
    const userDuplicated = await User.findOne({ userName: req.body.userName });
    if (userDuplicated) {
      return res.status(400).json("That username already exists. Please try another one.");
    }

    // Crea un nuevo usuario con la contraseña sin hashear; el middleware pre('save') la hasheará automáticamente
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password, // No hashear aquí
      role: 'user' // Establece el rol por defecto como 'user'
    });

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);

  } catch (error) {
    return res.status(400).json(error);
  }
};

//!USER LOGIN
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Genera un token JWT
        const token = generateSign(user._id);
        
        // Retorna el usuario y el token
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
    // Solo los admins pueden cambiar el rol de un usuario
    if (req.user.role !== 'admin') {
      return res.status(403).json("Access denied. Admins only.");
    }

    const { id } = req.params;
    const { role } = req.body;

    // Asegúrate de que el rol proporcionado sea válido ('admin' o 'user')
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json("Invalid role. Role must be 'admin' or 'user'.");
    }

    // Actualiza el rol del usuario
    const userUpdated = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!userUpdated) return res.status(404).json("User not found.");

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//!DELETE USER (Admin or Self)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Solo los admins pueden eliminar cualquier usuario o un usuario puede eliminar su propia cuenta
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

module.exports = { register, login, updateUserRole, deleteUser }; //exportamos para usarlo en routes
