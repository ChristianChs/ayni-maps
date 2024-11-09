import { QueryTypes } from "sequelize";
import sequelize from "../db.js";

const model = {};

model.findLogrosByUsuario = async (usuarioId) => {
  return await sequelize.query(
    "SELECT * FROM LogrosUsuario JOIN Logros ON LogrosUsuario.logro_id = Logros.id WHERE usuario_id = :usuarioId",
    {
      replacements: { usuarioId },
      type: QueryTypes.SELECT
    }
  );
};

export default model;
