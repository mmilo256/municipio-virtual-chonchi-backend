import e from "express";
import { auth, getUserInfo, handleCallback } from "./authController.js";

const router = e.Router()

router.get("/solicitar-autorizacion", auth)
router.get("/inicio", handleCallback)
router.get("/user-info", getUserInfo)

export default router