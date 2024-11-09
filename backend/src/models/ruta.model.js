import {QueryTypes} from "sequelize";
import sequelize from "./db.js";

const model = {};

model.getDatos = async()=>{
    return sequelize.query("CALL SP_SEL_Rutas")
    .then((result)=>{
        return result
    })
}
model.getDatosById = async(id)=>{
    return sequelize.query("CALL SP_SEL_RutasById(:id)",
        {
            replacements:{id},
            type:QueryTypes.RAW
        }
    )
    .then((result)=>{
        return result
    })
}


export default model;