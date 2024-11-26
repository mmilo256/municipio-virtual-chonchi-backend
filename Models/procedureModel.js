import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Procedure = sequelize.define('tramites', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    descripcion_corta: DataTypes.STRING,
    info_adicional: DataTypes.JSON,
    requisitos: DataTypes.JSON,
    costo: DataTypes.INTEGER,
    modalidad_pago: DataTypes.STRING,
    direccion: DataTypes.STRING,
    horario_atencion: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
})

export default Procedure