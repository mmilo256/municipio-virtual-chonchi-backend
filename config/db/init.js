import Input from "../../Models/inputModel.js";
import Procedure from "../../Models/procedureModel.js";
import logger from "../winstonConfig.js";
import defineAssociations from "./associations.js";
import { sequelize } from "./config.js";
import { permisosTransitoriosInputs } from "./data/inputs.js";
import { permisosTransitorios } from "./data/procedures.js"

const initializeDB = async () => {
    // Definir asociaciones
    await defineAssociations()
    // Inicialización base de datos
    await sequelize.sync()
    // Insertar datos iniciales
    const t = await sequelize.transaction()
    try {
        const count = await Procedure.count({ transaction: t })
        if (count === 0) {
            const { dataValues } = await Procedure.create(permisosTransitorios, { transaction: t })
            const camposFormulario = permisosTransitoriosInputs.map(campo => ({
                ...campo,
                tramite_id: dataValues.id
            }))
            await Input.bulkCreate(camposFormulario, { transaction: t })
        }
        await t.commit()
        logger.info("Se ha inicializado la base de datos")
    } catch (error) {
        await t.rollback()
        throw new Error(`No se pudo inicializar la base de datos. ${error.message}`)
    }
}

export default initializeDB