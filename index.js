import e from "express";
import authRouter from './auth/authRoutes.js'
import crypto from 'node:crypto'
import session from "express-session";
import cookieParser from "cookie-parser";

const port = 10000
const app = e()
app.use(cors())
app.use(cookieParser())

// Configuración del middleware de sesión
app.use(session({
    secret: 'dev',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Si usas HTTPS, debes poner `secure: true`
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