import logger from "../config/winstonConfig.js"
import Procedure from "../Models/procedureModel.js"

export const getAllProcedures = async (req, res) => {
    try {
        const procedures = await Procedure.findAll({ attributes: ["id", "nombre", "titulo", "descripcion_corta", "activo"] })
        res.status(200).json({ procedures })
    } catch (error) {
        logger.error("No se pudo obtener los trámites")
        throw new Error("No se pudo obtener los trámites")
    }
}

export const getProcedureById = async (req, res) => {
    const { id } = req.params
    try {
        const procedure = await Procedure.findByPk(id)
        res.status(200).json({ procedure })
    } catch (error) {
        logger.error("No se pudo obtener el trámite solicitado.")
        throw new Error("No se pudo obtener el trámite solicitado.")
    }
}