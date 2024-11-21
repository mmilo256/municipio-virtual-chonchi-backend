import 'dotenv/config'
import * as client from 'openid-client'

export const callback = async (req, res) => {
    let currentUrl = req.originalUrl
    res.json({ message: "Funcionó", currentUrl })
}

export const login = async (req, res) => {

    let server = new URL('https://accounts.claveunica.gob.cl/openid')
    let clientId = process.env.CLIENT_ID || "eca504a7dd70494aa708445892dfb514"
    let clientSecret = process.env.CLIENT_SECRET || "96df11a9787c4c43bb300f0339fad9cf"
    let redirect_uri = process.env.REDIRECT_URI || "https://municipio-virtual.onrender.com/inicio"
    let scope = "openid run name"
    let codeVerifier = client.randomPKCECodeVerifier()
    let codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier)
    let state

    const config = await client.discovery(
        server,
        clientId,
        clientSecret
    )

    let parameters = {
        redirect_uri,
        scope,
        codeChallenge,
        codeChallengeMethod: 'S256'
    }

    if (!config.serverMetadata().supportsPKCE()) {
        state = client.randomState()
        parameters.state = state
        req.session.state = state
    }

    req.session.config = config
    req.session.code_verifier = codeVerifier

    let redirectTo = client.buildAuthorizationUrl(config, parameters)

    res.redirect(redirectTo.href)
}

export const getUserInfo = (req, res) => {
    console.log(req.session.messages)
    if (!req.isAuthenticated()) {
        return res.redirect("http://localhost:5173")
    }
    res.json(req.user)
}