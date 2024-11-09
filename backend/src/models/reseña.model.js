import { QueryTypes } from "sequelize";
import sequelize from "../db.js";

const model = {};

model.createReseña = async ({ usuarioId, puntoInteresId, calificacion, comentario }) => {
  return await sequelize.query(
    "INSERT INTO Comentarios (usuario_id, punto_interes_id, calificacion, comentario) VALUES (:usuarioId, :puntoInteresId, :calificacion, :comentario)",
    {
      replacements: { usuarioId, puntoInteresId, calificacion, comentario },
      type: QueryTypes.INSERT
    }
  );
};

export default model;
