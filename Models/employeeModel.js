import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Employee = sequelize.define('funcionarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    run: DataTypes.STRING,
    rol: DataTypes.STRING
})

export default Employee