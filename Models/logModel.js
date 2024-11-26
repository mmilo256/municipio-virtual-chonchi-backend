import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Log = sequelize.define('logs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    accion: DataTypes.STRING
})

export default Log