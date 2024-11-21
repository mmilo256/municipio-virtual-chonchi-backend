import e from "express";
import authRouter from './auth/authRoutes.js'
import session from "express-session";
import cors from 'cors'
import cookieParser from "cookie-parser";

const port = 10000
const app = e()

app.use(cookieParser())
app.use(e.urlencoded({
    extended: true,
}));

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
    cookie: { maxAge: 3600000 }
}));

app.use('/', authRouter)

app.listen(port, () => {
    console.log("Servidor levantado...")
})