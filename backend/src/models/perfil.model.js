import { QueryTypes } from "sequelize";
import sequelize from "../db.js";

const model = {};

model.findPerfilByUsuario = async (usuarioId) => {
  return await sequelize.query(
    "SELECT * FROM Usuarios WHERE id = :usuarioId",
    {
      replacements: { usuarioId },
      type: QueryTypes.SELECT
    }
  );
};

export default model;
