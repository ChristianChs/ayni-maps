import model from "../models/logros.model.js";

export const obtenerLogros = async (req, res) => {
  const { usuarioId } = req.query;
  try {
    const logros = await model.findLogrosByUsuario(usuarioId);
    res.json(logros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
