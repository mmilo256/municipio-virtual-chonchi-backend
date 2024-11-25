import axios from 'axios'
import 'dotenv/config'
import crypto from 'node:crypto'
import Jwt from 'jsonwebtoken'
import logger from '../config/winstonConfig.js'
import { userInfoLogFormat } from '../utils/utils.js'

// Cerrar sesión
export const logout = async (req, res) => {
    const { user } = req.session
    console.log(user.name)
    res.clearCookie('jwt', {
        secure: false, // Cambiar a true en producción
        httpOnly: true
    })
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: "No se pudo destruir la sesión" })
        }
    })
    logger.info(`${userInfoLogFormat(user.name.nombres, user.name.apellidos, user.run)} | Se ha cerrado la sesión`)
    res.send("Se ha destruido la sesión")
}


// Función para ingresar credenciales en ClaveÚnica
export const login = async (req, res) => {
    try {
        // Crear token anti-falsificación
        const csrfToken = crypto.randomBytes(30).toString('hex');
        req.session.csrfToken = csrfToken;

        // Construir URL para solicitar autorización
        const params = {
            client_id: process.env.CLIENT_ID,
            response_type: "code",
            scope: "openid run name",
            redirect_uri: process.env.REDIRECT_URI,
            state: csrfToken
        };

        const queryString = new URLSearchParams(params).toString();
        const authURL = `https://accounts.claveunica.gob.cl/openid/authorize/?${queryString}`;

        // Redirigir al usuario a la URL de autorización
        logger.info("Redirigiendo al login de ClaveÚnica...")
        res.redirect(authURL);
    } catch (error) {
        // Manejo de errores
        logger.error(`No se pudo iniciar sesión en ClaveÚnica. ${error.message}`)
        console.error('Error en el proceso de login:', error);
        res.status(500).send('Error al procesar la solicitud de login');
    }
};

export const callback = async (req, res) => { // Callback para develop
    const { code, state } = req.query
    if (!code || !state) {
        return res.send('No funcionó...')
    }
    res.send('¡Funcionó!')

}

// Función callback, luego de que el usuario autoriza a la aplicación
export const callbackProd = async (req, res) => { // Cambiar nombre a callback en prod
    const { code, state } = req.query

    // Verifica que se haya recibido el code y state correctamente
    if (!code || !state) {
        console.log(error)
        logger.error("Faltan parámetros código o estado")
        return res.json({ message: "Faltan parámetros", error })
    }

    // Confirmación del token anti-falsificación
    const csrfToken = req.session.csrfToken
    if (state !== csrfToken) {
        logger.error("El token anti-falsificación no es válido.")
        return res.json({ message: "El token anti-falsificación no es válido." })
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
        if (!access_token) {
            logger.error("No se pudo obtener el token de acceso")
            return res.send("No se pudo obtener el token de acceso")
        }
        // Obtener información del usuario
        const userDataResponse = await axios.post('https://accounts.claveunica.gob.cl/openid/userinfo', null, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const userData = userDataResponse.data

        if (!userData) {
            logger.error("No se pudo obtener la información del usuario.")
            return res.send("No se pudo obtener la información del usuario.")
        }

        // Crear JSON Web Token
        const payload = {
            run: userData.RolUnico,
            name: userData.name
        }
        const jwt = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.cookie('jwt', jwt, {
            secure: false, // Cambiar a true en producción
            httpOnly: true
        })
        logger.info("Se creo el token JWT")
        res.redirect("http://localhost:5173/inicio")
    } catch (error) {
        console.log(error)
        logger.error("No se pudo generar el token JWT.", error.message)
        res.json({ message: "No se pudo generar el token JWT.", error })
    }
}

// Comprobación de sesión para entrar a rutas protegidas
export const protectedRoute = (req, res) => {
    const { user } = req.session
    if (!user) {
        return res.status(400).send("Debes iniciar sesión para acceder a la ruta protegida")
    }
    res.status(200).json({ user })
}
