import axios from 'axios'
import 'dotenv/config'

// Solicitar autorización al servidor de autorización
export const authRequest = async (req, res) => {

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

// Intercambiar código de autorización obtenido después de la autorización por token de acceso
export const handleCallback = async (req, res) => {
    const accessTokenURL = "https://accounts.claveunica.gob.cl/openid/token"
    const { code, state } = req.query
    const csrfToken = req.session.csrfToken
    try {
        // Comprueba que el token anti-falsificación sea válido
        if (state !== csrfToken) {
            return res.status(400).json({ message: "El token anti-falsificación no es válido.", csrfToken })
        }
        // Intercambiar código de autorización por un token de acceso
        const authData = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: "authorization_code",
            code,
            state
        }
        const response = await axios.post(accessTokenURL, authData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const accessToken = response.data.access_token
        res.redirect(process.env.HOME_URL)
        res.status(200).json({ code, state, data })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Hubo un error", error: error.message })
    }
} 