import model from "../models/reseña.model.js";

export const agregarReseña = async (req, res) => {
  const { usuarioId, puntoInteresId, calificacion, comentario } = req.body;
  try {
    const nuevaReseña = await model.createReseña({ usuarioId, puntoInteresId, calificacion, comentario });
    res.status(201).json(nuevaReseña);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
