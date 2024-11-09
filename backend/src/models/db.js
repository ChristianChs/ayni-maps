import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
)

sequelize.authenticate().then(() => {
    console.log("Conexion a BD establecida");
}).catch((error) => {
    console.log("Falló la conexión con la BD", error);
})

export default sequelize;