import axios from 'axios'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const getUserInfo = (req, res) => {
    console.log(req.session.messages)
    if (!req.isAuthenticated()) {
        return res.redirect("http://localhost:5173")
    }
    res.json(req.user)
}