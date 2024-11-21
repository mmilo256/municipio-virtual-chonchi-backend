import e from "express";
import authRouter from './auth/authRoutes.js'
import session from "express-session";
import cors from 'cors'
import cookieParser from "cookie-parser";
import passport from "passport";

const port = 10000
const app = e()

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
    cookie: { maxAge: 3600000 }
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter)

// Manejo de sesiones: Passport serializa y deserializa al usuario
passport.serializeUser(function (user, done) {
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log(obj)
    done(null, obj);
});

app.listen(port, () => {
    console.log("Servidor levantado...")
})