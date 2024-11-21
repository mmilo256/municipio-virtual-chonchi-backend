import e from "express";
import { auth, getJWT, handleCallback } from "./authController.js";
import './strategies/openid-strategy.js'
import passport from "passport";


const router = e.Router()

router.get("/solicitar-autorizacion", auth)
router.get("/inicio", passport.authenticate('openidconnect', { failureRedirect: "/login", failureMessage: true }), (req, res) => {
    res.redirect("/")
})
router.get("/login", passport.authenticate('openidconnect'))

export default router