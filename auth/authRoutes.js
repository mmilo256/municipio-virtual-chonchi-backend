import e from "express";
import { authRequest } from "./authController.js";

const router = e.Router()

router.get("solicitar-autorizacion", authRequest)
router.get("inicio", authRequest)

export default router