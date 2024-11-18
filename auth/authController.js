import axios from "axios"
import 'dotenv/config'

export const authRequest = async (req, res) => {

    const AUTH_URL = "https://accounts.claveunica.gob.cl/openid/authorize"
    const CLIENT_ID = process.env.CLIENT_ID
    const RESPONSE_TYPE = "code"
    const SCOPE = "openid run name"
    const REDIRECT_URI = process.env.REDIRECT_URI

    try {
        const response = await axios.get(`${AUTH_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&state=${req.session.csrfToken}`)
        console.log(response)
        res.status(200).json({ message: "OK" })
    } catch (error) {
        console.error(error.message)
        res.status(200).json({ message: error.message })
    }
}

export const handleCallback = (req, res) => {

} 