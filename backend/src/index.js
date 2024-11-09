import app from "./app.js";
import dotenv from "dotenv"
import sequelize from "./models/db.js";

dotenv.config();

sequelize
const PORT = process.env.PORT_SERVER;
app.listen(PORT);
  
console.log("Servidor corriendo en puerto ", PORT)