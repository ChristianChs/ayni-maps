import model from "../models/perfil.model.js";

export const obtenerPerfil = async (req, res) => {
  const { usuarioId } = req.query;
  try {
    const perfil = await model.findPerfilByUsuario(usuarioId);
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
