import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import 'dotenv/config'

export default passport.use('claveUnica', new OAuth2Strategy({
    authorizationURL: "https://accounts.claveunica.gob.cl/openid/authorize",
    tokenURL: "https://accounts.claveunica.gob.cl/openid/token",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    state: true
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    return done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

