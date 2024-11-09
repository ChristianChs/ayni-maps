import { QueryTypes } from "sequelize";
import sequelize from "../db.js";

const model = {};

model.findRutasByDepartamento = async (departamento) => {
  return await sequelize.query(
    "SELECT * FROM Rutas WHERE departamento = :departamento",
    {
      replacements: { departamento },
      type: QueryTypes.SELECT
    }
  );
};

export default model;
