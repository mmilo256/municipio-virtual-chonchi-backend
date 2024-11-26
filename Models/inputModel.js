import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Input = sequelize.define('campos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    etiqueta: DataTypes.STRING,
    tipo: DataTypes.ENUM(["text", "textarea", "number", "select", "date", "time", "email", "password", "radio"]),
    es_requerido: DataTypes.BOOLEAN,
    opciones: DataTypes.JSON,
    placeholder: DataTypes.STRING,
})

export default Input