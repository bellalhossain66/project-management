const { verify } = require('jsonwebtoken')

module.exports = {
    supervisor_authentication: (req, res, next) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken) {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        message: "Please Login"
                    })
                }
                next()
            })
        } else {
            return res.status(403).json({
                success: 0,
                message: "Access denied"
            })
        }
    },
    member_authentication: (req, res, next) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken) {
            verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        message: "Please Login"
                    })
                }
                next()
            })
        } else {
            return res.status(403).json({
                success: 0,
                message: "Access denied"
            })
        }
    }
}