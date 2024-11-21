import axios from 'axios'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

// Redirección al login de ClaveÚnica
export const auth = async (req, res) => {

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
}

export const getJWT = async (req, res) => {
    const token = req.session.access_token
    const tokenCookie = req.cookies.access_token
    if (!token) {
        return res.status(400).json({message: "No se pudo generar el JWT"})
    }
    try {
        // Obtiene información del usuario
        const response = await axios.post("https://accounts.claveunica.gob.cl/openid/userinfo/", null, {
            headers: {
                Authorization: `Bearer ${tokenCookie}`
            }
        })
        // Genera el JWT
        const payload = response.data
        const tokenJWT = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({ jwt: tokenJWT })
    } catch (error) {
        console.log(error)
    }
}

// Callback para intercambiar el código obtenido por un token de acceso
export const handleCallback = async (req, res, next) => {
    const { code, state } = req.query
    const accessTokenURL = "https://accounts.claveunica.gob.cl/openid/token/"
    const csrfToken = req.session.csrfToken

    // Comprueba que code y state no estén vacíos
    if (!code || !state) {
        return res.status(400).json({ message: "Faltan parámetros en la respuesta." })
    }
    // Comprueba que el token anti-falsificación sea válido
    if (state !== csrfToken) {
        return res.status(400).json({ message: "El token anti-falsificación no es válido.", csrfToken })
    }
    try {

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
        res.redirect("https://municipio-virtual-chonchi.onrender.com").cookie('access_token', access_token, {
            maxAge: 360000000, 
            httpOnly: true,
            sameSite: none,
            secure: true,

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Hubo un error", error: error.message
        })
    }
} 