const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")


function parseCookieHeader(cookieHeader) {
    const cookies = {}
    if (!cookieHeader) return cookies

    cookieHeader.split(";").forEach(pair => {
        const index = pair.indexOf("=")
        if (index > -1) {
            const key = pair.slice(0, index).trim()
            const value = pair.slice(index + 1).trim()
            cookies[ key ] = decodeURIComponent(value)
        }
    })

    return cookies
}


async function authUser(req, res, next) {

    const cookies = (req.cookies && Object.keys(req.cookies).length > 0)
        ? req.cookies
        : parseCookieHeader(req.headers.cookie)

    const token = cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token."
        })
    }

}


module.exports = { authUser }