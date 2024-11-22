import axios from 'axios'
import 'dotenv/config'
import crypto from 'node:crypto'

// Función para ingresar credenciales en ClaveÚnica
export const login = async (req, res) => {
    // Crear token anti-falsificación
    const csrfToken = crypto.randomBytes(30).toString('hex')
    req.session.csrfToken = csrfToken

    // Construir URL para solicitar autorización
    const params = {
        client_id: process.env.CLIENT_ID,
        response_type: "code",
        scope: "openid run name",
        redirect_uri: process.env.REDIRECT_URI,
        state: csrfToken
    };
    const queryString = new URLSearchParams(params).toString()
    const authURL = `https://accounts.claveunica.gob.cl/openid/authorize/?${queryString}`
    res.redirect(authURL)
}

// Función callback, luego de que el usuario autoriza a la aplicación
export const callback = async (req, res) => {
    const { code, state } = req.query

    // Confirmación del token anti-falsificación
    const csrfToken = req.session.csrfToken
    if (state !== csrfToken) {
        return res.json({ message: "El token anti-falsificación no es válido" })
    }

    // Cambiar código de autorización por un token de acceso
    const authData = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
        code,
        state
    }
    try {
        const response = await axios.post('https://accounts.claveunica.gob.cl/openid/token', authData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const { access_token } = response.data

        res.cookie('access_token', access_token, {
            secure: false, // Cambiar a true en producción
            httpOnly: true
        })
        res.redirect("https://municipio-virtual-chonchi.onrender.com/pruebas")
    } catch (error) {
        console.log(error)
        res.json({ message: "Error", error })
    }
}

// Obtener información del usuario
export const getUserInfo = async (req, res) => {
    const accessToken = req.cookies['access_token']
    // Obtener información del usuario con el access_token
    const userDataResponse = await axios.post('https://accounts.claveunica.gob.cl/openid/userinfo', null, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    const userData = userDataResponse.data
    const sessionData = {
        accessToken,
        ...userData
    }
    req.user = sessionData
    console.log("--------------------------------------")
    console.log(data)
    res.json({ data })
}
