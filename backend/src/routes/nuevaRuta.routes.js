import { Router } from "express";
import { agregarNuevaRuta } from "../controllers/nuevaRuta.controller.js";

const router = Router();

router.post('/rutas', agregarNuevaRuta);

export default router;
