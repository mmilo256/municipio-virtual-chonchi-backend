import Jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const jwt = req.cookies.jwt

    //Comprueba que el token exista en las cookies
    if (!jwt) {
        return res.status(400).send("No has iniciado sesión")
    }

    // Verifica el token obtenido
    try {
        const decoded = Jwt.verify(jwt, process.env.JWT_SECRET)
        const data = {
            name: decoded.name,
            run: decoded.run
        }
        req.session.user = data
    } catch(error) {
        throw new Error("No se pudo verificar el token");
    }
    next()    
}