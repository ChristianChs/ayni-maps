import { Router } from "express";
import { obtenerLogros } from "../controllers/logros.controller.js";

const router = Router();

router.get('/logros', obtenerLogros);

export default router;
