import e from "express";
import { callback, login, logout, protectedRoute } from "./authController.js";
import { verifyToken } from "./authMIddleware.js";

const router = e.Router()

router.get("/login", login)
router.post("/logout", logout)
router.get("/inicio", callback)
router.get("/protected", verifyToken, protectedRoute)


export default router