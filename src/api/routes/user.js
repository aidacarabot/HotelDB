const { authenticateToken, isAdmin, isSelfOrAdmin } = require("../../middlewares/auth");
const { register, login, updateUserRole, deleteUser } = require("../controllers/user");
const usersRoutes = require("express").Router();

usersRoutes.post("/register", register);// Ruta para registrar un nuevo usuario (cualquier usuario puede registrarse)
usersRoutes.post("/login", login);// Ruta para iniciar sesión (cualquier usuario puede iniciar sesión)
usersRoutes.put("/role/:id", [ authenticateToken, isAdmin ], updateUserRole);// Ruta para actualizar el rol de un usuario (solo admins pueden cambiar roles)
usersRoutes.delete("/:id", [ authenticateToken, isSelfOrAdmin ], deleteUser);// Ruta para eliminar un usuario (admin puede eliminar cualquier usuario, usuarios pueden eliminarse a sí mismos)

module.exports = usersRoutes;