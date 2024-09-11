const { verifyJwt } = require("../config/jwt");
const User = require("../api/models/user");

//! Middleware para autenticar el token -> Si es así, decodifica el token para obtener la información del usuario, verifica la existencia de ese usuario en la base de datos y asigna su rol al request (req.user.role). Si todo está bien, permite que la solicitud continúe; de lo contrario, devuelve un error.
const authenticateToken = async (req, res, next) => {
  // Intenta obtener el token de la cabecera 'Authorization'. 
  // Se asume que el token JWT está precedido por la palabra 'Bearer', por eso se usa split(' ')[1] para obtener solo el token.
  const token = req.header('Authorization')?.split(' ')[1];

  // Si no hay token, se responde con un error 401 (No autorizado).
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    // Intenta verificar el token utilizando la función verifyJwt (que asume que el token es válido).
    const decoded = verifyJwt(token);
    // Decodifica el token y asigna la información del usuario decodificada al request (req.user).
    req.user = decoded;

    // Busca al usuario en la base de datos usando el ID extraído del token.
    const user = await User.findById(req.user.id);
    // Si no se encuentra el usuario, responde con un error 404 (No encontrado).
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Asigna el rol del usuario encontrado al objeto `req.user` para que esté disponible en la siguiente fase del middleware o controlador.
    req.user.role = user.role; 

    // Llama a `next()` para continuar con el siguiente middleware o controlador.
    next();
  } catch (error) {
    // Si algo sale mal (por ejemplo, el token no es válido), responde con un error 400 (Solicitud incorrecta).
    res.status(400).json({ message: 'Invalid token.' });
  }
};

//! Middleware para verificar si es admin. -> Si no lo es, se le deniega el acceso (error 403). Solo los administradores pueden continuar.
const isAdmin = (req, res, next) => {
  // Verifica si el rol del usuario es 'admin'.
  if (req.user.role !== 'admin') {
    // Si el usuario no es un administrador, responde con un error 403 (Prohibido).
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  // Si es administrador, continúa con el siguiente middleware o controlador.
  next();
};

//! Middleware para verificar si el usuario está autenticado o es admin. ->  Este middleware permite el acceso si el usuario autenticado es un administrador o si el usuario está accediendo a su propia información (por ejemplo, viendo o editando su perfil). Si ninguna de estas condiciones se cumple, se deniega el acceso (error 403).
const isSelfOrAdmin = (req, res, next) => {
  // Verifica si el usuario es un administrador o si el usuario autenticado está intentando acceder a su propia información.
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
    // Si no es administrador ni está accediendo a su propia información, responde con un error 403 (Prohibido).
    return res.status(403).json({ message: 'Access denied. You can only access your own profile.' });
  }
  // Si es administrador o está accediendo a su propia información, continúa con el siguiente middleware o controlador.
  next();
};


module.exports = { authenticateToken, isAdmin, isSelfOrAdmin };