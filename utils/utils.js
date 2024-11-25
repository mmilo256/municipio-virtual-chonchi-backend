// Información del usuario autenticado para mostrar en los logs
export const userInfoLogFormat = (
    namesArray,
    lastNamesArray,
    runObject
) => {
    let namesString = ""
    let lastNamesString = ""
    let run = `${runObject.numero}-${runObject.DV}`

    namesArray.forEach(name => {
        namesString += `${name} `
    })
    lastNamesArray.forEach(lastName => {
        lastNamesString += `${lastName} `
    })

    const fullName = namesString + lastNamesString
    return `USUARIO: ${fullName} | RUN: ${run}`
}