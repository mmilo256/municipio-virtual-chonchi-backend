import passport from "passport";
import OpenIDConnectStrategy from "passport-openidconnect";
import 'dotenv/config'

export default passport.use(new OpenIDConnectStrategy({
    issuer: "https://accounts.claveunica.gob.cl",
    authorizationURL: "https://accounts.claveunica.gob.cl/openid/authorize",
    tokenURL: "https://accounts.claveunica.gob.cl/openid/token",
    userInfoURL: "https://accounts.claveunica.gob.cl/openid/userinfo",
    clientID: process.env.CLIENT_ID,
    scope: ["run", "name"],
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://municipio-virtual.onrender.com/inicio"
}, (issuer, profile, cb) => {
    // Verificamos que la información del perfil esté disponible y es válida
    if (!profile) {
        console.log("No se pudo obtener el perfil del usuario de Clave Única")
        return cb(new Error('No se pudo obtener el perfil del usuario de Clave Única'));
    }
    const user = {
        ...profile
    }
    console.log(user)
    return cb(null, user)
}))