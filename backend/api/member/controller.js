const {
    member_signin,
    all_ongoing_project_fetch,
    all_completed_project_fetch,
    all_open_project_fetch,
    all_project_member_fetch,
    all_applied_project_fetch,
    add_project_member_insert,
    project_member_delete
} = require('./server')
const { sign } = require('jsonwebtoken')

module.exports = {
    member_login: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            member_signin(body.email, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
                if (body.password == results.password) {
                    const jwtoken = sign({
                        name: results.name,
                        userId: results.userId,
                        email: results.email
                    }, process.env.MEMBER_TOKEN, {
                        expiresIn: '10h'
                    })
                    res.cookie('log_token', jwtoken)
                    res.cookie('log_in', true)
                    return res.status(200).json({
                        success: 1,
                        message: "Successfully login"
                    })
                } else {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_project_member: (req, res) => {
        const body = req.params
        if (body.projectId != '') {
            all_project_member_fetch(body.projectId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (results.length == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Member not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Member found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_ongoing_project_view: (req, res) => {
        const body = req.params
        if (body.memberId != '') {
            all_ongoing_project_fetch(body.memberId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Ongoing project not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Ongoing project found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_completed_project_view: (req, res) => {
        const body = req.params
        if (body.memberId != '') {
            all_completed_project_fetch(body.memberId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Completed project not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Completed project found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_applied_project_view: (req, res) => {
        const body = req.params
        if (body.memberId != '') {
            all_applied_project_fetch(body.memberId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Applied project not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Applied project found",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_open_project_view: (req, res) => {
        all_open_project_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Projects not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Projects found",
                data: results
            })
        })
    },
    add_project_member: (req, res) => {
        const body = req.body
        if (body.projectId != '' && body.memberId != '') {
            const today = new Date()
            body.date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + (today.getHours() ? today.getHours() : 12) + ':' + today.getMinutes() + ' ' + (today.getHours() >= 12 ? 'pm' : 'am')
            add_project_member_insert(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Enrollment Successfully"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    project_member_remove: (req, res) => {
        const body = req.body
        if (body.projectId != '' && body.memberId != '') {
            project_member_delete(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Exit successfully"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    }
}