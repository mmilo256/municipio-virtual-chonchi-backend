import e from "express";
import { auth, getJWT, handleCallback } from "./authController.js";
import './strategies/openid-strategy.js'
import passport from "passport";


const router = e.Router()

router.get("/solicitar-autorizacion", auth)
router.get("/login", passport.authenticate('openidconnect'))
router.get("/inicio", passport.authenticate('openidconnect', { failureRedirect: "http://localhost:5173", failureMessage: true }), (req, res) => {
    res.redirect("http://localhost:5173/inicio")
})


export default router