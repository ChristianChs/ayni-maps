import model from "../models/ruta.model.js";

export const traerRutas = async(req,res)=>{
    try {
        const rutas = await model.getDatos();
        res.json({
            datos: rutas
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const getDatosById = async(req,res)=>{
    console.log(req.params)
    const {id}=req.params;

    try {
        const rutas = await model.getDatosById(id);
        res.json({
            datos: rutas
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}