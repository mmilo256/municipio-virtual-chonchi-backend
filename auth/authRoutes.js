import e from "express";
import { getUserInfo } from "./authController.js";
import './strategies/openid-strategy.js'
import passport from "passport";


const router = e.Router()

router.get("/user-info", getUserInfo)
router.get("/login", passport.authenticate('openidconnect'))
router.get("/inicio", passport.authenticate('openidconnect', { failureRedirect: "http://localhost:5173", failureMessage: true }), (req, res) => {
    console.log(req.session.messages)
    res.redirect("http://localhost:5173/inicio")
})


export default router