import model from "../models/explorar.model.js";

export const explorarRutas = async (req, res) => {
  const { departamento } = req.query;
  try {
    const rutas = await model.findRutasByDepartamento(departamento);
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
