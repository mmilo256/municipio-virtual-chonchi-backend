import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Request = sequelize.define('solicitudes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: DataTypes.STRING,
    folio: DataTypes.INTEGER,
    respuestas: DataTypes.JSON,
    documentos: DataTypes.JSON
})

export default Request