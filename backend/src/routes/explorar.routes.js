import { Router } from "express";
import { explorarRutas } from "../controllers/explorar.controller.js";

const router = Router();

router.get('/explorar', explorarRutas);

export default router;
