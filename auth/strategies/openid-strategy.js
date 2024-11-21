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
}, (issuer, profile) => {
    console.log({ issuer, profile })
}))