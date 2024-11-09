import {QueryTypes} from "sequelize";
import sequelize from "./db.js";

const model = {};

model.findUser = async(email)=>{
    return sequelize.query("CALL SP_SEL_ValidarUsuario(:email)",
    {
        replacements:{email},
        type:QueryTypes.RAW
    }).then((result)=>{
        return result
    })
}


export default model;