import model from "../models/auth.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const userFound = await model.findUser(email);
    if (userFound.length===0)
      return res.status(400).json({ message: "Usuario no encontrado" });
    console.log(userFound)
    const isMatch = userFound[0].contrasena_hash === password ? true : false;
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });
    res.json({
      id: userFound[0].id,
      username: userFound[0].nombre_usuario,
      ciudad: userFound[0].ciudad,
      preferencia: userFound[0].preferencia,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
