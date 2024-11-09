import { Router } from "express";
import { getDatosById, traerRutas } from "../controllers/rutas.controller.js";
const router = Router();

router.get('/rutas',traerRutas)

router.get('/rutas/:id',getDatosById)

export default router;