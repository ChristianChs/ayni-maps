import { QueryTypes } from "sequelize";
import sequelize from "../db.js";

const model = {};

model.createRuta = async ({ nombre, tipo, descripcion, recomendado_para, dificultad, duracion }) => {
  return await sequelize.query(
    "INSERT INTO Rutas (nombre, tipo, descripcion, recomendado_para, dificultad, duracion) VALUES (:nombre, :tipo, :descripcion, :recomendado_para, :dificultad, :duracion)",
    {
      replacements: { nombre, tipo, descripcion, recomendado_para, dificultad, duracion },
      type: QueryTypes.INSERT
    }
  );
};

export default model;
