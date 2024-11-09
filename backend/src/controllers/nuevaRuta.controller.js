import model from "../models/nuevaRuta.model.js";

export const agregarNuevaRuta = async (req, res) => {
  const { nombre, tipo, descripcion, recomendado_para, dificultad, duracion } = req.body;
  try {
    const nuevaRuta = await model.createRuta({ nombre, tipo, descripcion, recomendado_para, dificultad, duracion });
    res.status(201).json(nuevaRuta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
