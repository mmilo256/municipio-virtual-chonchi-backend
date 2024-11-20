import e from "express";
import authRouter from './auth/authRoutes.js'
import crypto from 'node:crypto'
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { MemoryStore } from "express-session";

const port = 10000
const app = e()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
}))

app.use(cookieParser())

// Configuración del middleware de sesión
app.use(session({
    secret: 'dev',
    resave: false,
    store: new MemoryStore({
        checkPeriod: 3600000
    }),
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }  // Si usas HTTPS, debes poner `secure: true`
}));

// Middleware para generar el Token CSRF
app.use((req, res, next) => {
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(30).toString('hex')
    }
    next()
})

app.use('/', authRouter)

app.listen(port, () => {
    console.log("Servidor levantado...")
})