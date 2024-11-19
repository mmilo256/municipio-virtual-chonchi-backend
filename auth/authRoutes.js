import e from "express";
import { authRequest, getUserInfo, handleCallback } from "./authController.js";

const router = e.Router()

router.get("/solicitar-autorizacion", authRequest)
router.get("/token-acceso", getUserInfo)
router.get("/inicio", handleCallback)

export default router