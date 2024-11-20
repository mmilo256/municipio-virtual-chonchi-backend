import e from "express";
import { auth, fastAccessToken, getJWT, handleCallback } from "./authController.js";

const router = e.Router()

router.get("/solicitar-autorizacion", auth)
router.get("/inicio", handleCallback)
router.get("/login", getJWT)

export default router