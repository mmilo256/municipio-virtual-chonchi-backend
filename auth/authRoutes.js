import e from "express";
import { authRequest, getAccessToken, handleCallback } from "./authController.js";

const router = e.Router()

router.get("/solicitar-autorizacion", authRequest)
router.get("/token-acceso", getAccessToken)
router.get("/inicio", handleCallback)

export default router