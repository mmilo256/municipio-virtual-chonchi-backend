import e from "express";
import { authRequest, handleCallback } from "./authController.js";

const router = e.Router()

router.get("/solicitar-autorizacion", authRequest)
router.get("/inicio", handleCallback)

export default router