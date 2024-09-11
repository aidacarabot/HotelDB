const jwt = require("jsonwebtoken");

//Crear una llave
const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

//Comprobar si esa llave fue creada por el cerrajero de confianza
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateSign, verifyJwt }