import { Router } from "express";
import { obtenerPerfil } from "../controllers/perfil.controller.js";

const router = Router();

router.get('/perfil', obtenerPerfil);

export default router;
