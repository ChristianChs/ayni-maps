import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import rutaRouter from "./routes/ruta.routes.js";
import explorarRouter from "./routes/explorar.routes.js";
import logrosRouter from "./routes/logros.routes.js";
import perfilRouter from "./routes/perfil.routes.js";
import nuevaRutaRouter from "./routes/nuevaRuta.routes.js";
import reseñaRouter from "./routes/reseña.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRouter);
app.use('/api', rutaRouter);
app.use('/api', explorarRouter);
app.use('/api', logrosRouter);
app.use('/api', perfilRouter);
app.use('/api', nuevaRutaRouter);
app.use('/api', reseñaRouter);

export default app;
