import e from "express";
import authRouter from './auth/authRoutes.js'
import session from "express-session";
import cors from 'cors'
import cookieParser from "cookie-parser";
import 'dotenv/config'
import logger from "./config/winstonConfig.js";

const port = 10000
const app = e()



// Middleware para registrar solicitudes HTTP
app.use((req, res, next) => {
    const { method, url } = req;
    let message
    message = `${method} ${url}`;
    logger.info(`Solicitud HTTP: ${message}`);
    next();
});

app.use(cookieParser())

app.use(cors({
    origin: ['https://municipio-virtual.onrender.com', 'https://municipio-virtual-chonchi.onrender.com', 'http://localhost:10000', 'http://localhost:5173', 'https://accounts.claveunica.gob.cl/'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
}))

// Configuración del middleware de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true en producción
        httpOnly: true
    }
}));

app.use('/', authRouter)

app.listen(port, () => {
    console.log("Servidor levantado...")
})