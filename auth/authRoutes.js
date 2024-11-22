import e from "express";
import { callback, getUserInfo, login } from "./authController.js";

const router = e.Router()

router.get("/login", login)
router.get("/inicio", callback)
router.get("/user-info", getUserInfo)


export default router