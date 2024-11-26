import Employee from "../../Models/employeeModel.js"
import Input from "../../Models/inputModel.js"
import Log from "../../Models/logModel.js"
import Request from "../../Models/requestModel.js"
import Procedure from "../../Models/procedureModel.js"
import User from "../../Models/UserModel.js"


const defineAssociations = async () => {
    // Campo - Trámite
    Input.belongsTo(Procedure, { foreignKey: 'tramite_id' })
    Procedure.hasMany(Input, { foreignKey: 'tramite_id' })
    // Solicitud - Trámite
    Request.belongsTo(Procedure, { foreignKey: 'tramite_id' })
    Procedure.hasMany(Request, { foreignKey: 'tramite_id' })
    // Solicitud - Usuario
    Request.belongsTo(User, { foreignKey: 'usuario_id' })
    User.hasMany(Request, { foreignKey: 'usuario_id' })
    // Solicitud - Log
    Log.belongsTo(Request, { foreignKey: 'solicitud_id' })
    Request.hasMany(Log, { foreignKey: 'solicitud_id' })
    // Employee - Log
    Log.belongsTo(Employee, { foreignKey: 'funcionario_id' })
    Employee.hasMany(Log, { foreignKey: 'funcionario_id' })

}

export default defineAssociations