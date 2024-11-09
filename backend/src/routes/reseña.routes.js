import { Router } from "express";
import { agregarReseña } from "../controllers/reseña.controller.js";

const router = Router();

router.post('/reseña', agregarReseña);

export default router;
