import e from "express";
import { callback, login } from "./authController.js";

const router = e.Router()

router.get("/login", login)
router.get("/inicio", callback)


export default router