import axios from 'axios'
import 'dotenv/config'
import passport from '../config/passport.js';

// Obtener información del usuario
/* export const getUserInfo = async (req, res) => {
    const userData = req.cookies['userData'];

    if (!userData) {
        return res.status(401).json({ message: 'No autorizado. Token no encontrado.' });
    }

    res.json({ message: 'Acceso autorizado', token: userData });
} */

// Solicitar autorización al servidor de autorización

export const auth = async (req, res, next) => {
    passport.authenticate('claveUnica')(req, res, next)
}

/* export const authRequest = async (req, res) => {

    const AUTH_URL = "https://accounts.claveunica.gob.cl/openid/authorize"
    const CLIENT_ID = process.env.CLIENT_ID
    const RESPONSE_TYPE = "code"
    const SCOPE = "openid run name"
    const REDIRECT_URI = process.env.REDIRECT_URI

    try {
        const requestURL = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&state=${req.session.csrfToken}`
        res.redirect(requestURL)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: error.message })
    }
} */

// Intercambiar código de autorización obtenido después de la autorización por token de acceso

export const handleCallback = async (req, res, next) => {
    passport.authenticate('claveunica', { failureRedirect: '/' })(req, res, next);
}

// Mostrar información del usuario después de la autenticación

export const getUserInfo = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado. Por favor, inicia sesión.' });
    }
    res.json({ message: 'Información del usuario', user: req.user });
}

/* export const handleCallback = async (req, res) => {
    const { code, state } = req.query
    const accessTokenURL = "https://accounts.claveunica.gob.cl/openid/token/"
    const csrfToken = req.session.csrfToken

    if (!code || !state) {
        return res.status(400).json({ message: "Faltan parámetros en la respuesta." })
    }

    try {
        // Comprueba que el token anti-falsificación sea válido
        if (state !== csrfToken) {
            return res.status(400).json({ message: "El token anti-falsificación no es válido.", csrfToken })
        }
        // Intercambiar código de autorización por un token de acceso
        const authData = new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: "authorization_code",
            code,
            state
        })
        const response = await axios.post(accessTokenURL, authData.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const { access_token } = response.data
        // Almacenar token en una sesión
        req.session.access_token = access_token
        // Obtener la información del usuario
        const userInfoURL = "https://accounts.claveunica.gob.cl/openid/userinfo/"
        if (!access_token) {
            return res.status(404).json({ message: "No hay token" })
        }
        try {
            const response = await axios.post(userInfoURL, null, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            const userData = response.data
            console.log(userData)
            // Guardar la información del usuario en una cookie y redirecciona a la página de inicio
            res.cookie('userData', userData, {
                httpOnly: false,
                secure: false,
                maxAge: 3600000,
                sameSite: 'lax'
            }).redirect(process.env.HOME_URL)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "No se pudo obtener la información del usuario", error: error.message })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Hubo un error", error: error.message
        })
    }
}  */