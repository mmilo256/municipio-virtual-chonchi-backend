import e from "express";
import { getAllProcedures, getProcedureById } from "../Controllers/proceduresController.js";

const router = e.Router()

router.get("/", getAllProcedures)
router.get("/:id", getProcedureById)

export default router