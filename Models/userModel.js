import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    run: DataTypes.STRING
})

export default User