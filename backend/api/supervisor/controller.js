const {
    supervisor_signin,
    all_member_fetch,
    all_member_records_fetch,
    last_project_id,
    add_new_project_insert,
    all_project_records_fetch,
    all_project_fetch,
    add_project_member_insert,
    all_project_member_fetch,
    project_member_delete,
    project_delete,
    project_fetch_by_id,
    project_update,
    all_completed_project_fetch,
    all_ongoing_project_fetch
} = require('./server')
const { sign } = require('jsonwebtoken')

module.exports = {
    supervisor_login: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            supervisor_signin(body.email, (err, results) => {
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
                    }, process.env.SUPERVISOR_TOKEN, {
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
    all_member_view: (req, res) => {
        all_member_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
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
    },
    all_member_records: (req, res) => {
        all_member_records_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
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
    },
    add_new_project: (req, res) => {
        const body = req.body
        if (body.name != '' && body.description != '' && body.client != '' && body.budget != '' && body.amountSpend != '' && body.duration != '') {
            last_project_id((err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    body.projectId = 'P-0001'
                } else {
                    body.projectId = 'P-000' + results.id
                }
                const today = new Date()
                body.date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + (today.getHours() ? today.getHours() : 12) + ':' + today.getMinutes() + ' ' + (today.getHours() >= 12 ? 'pm' : 'am')
                add_new_project_insert(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Project Successfully Addedd"
                    })
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    all_project_records: (req, res) => {
        all_project_records_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Project not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Project found",
                data: results
            })
        })
    },
    all_project_view: (req, res) => {
        all_project_fetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Project not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Project found",
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
                    message: "Member Successfully Addedd"
                })
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
    project_member_remove: (req, res) => {
        const body = req.params
        if (body.id != '') {
            project_member_delete(body.id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Member deleted successfully"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    delete_project: (req, res) => {
        const body = req.params
        if (body.projectId != '') {
            project_delete(body.projectId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Project deleted successfully"
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fields are required"
            })
        }
    },
    project_view_by_id: (req, res) => {
        const body = req.params
        if (body.projectId != '') {
            project_fetch_by_id(body.projectId, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Project not found"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Project found",
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
    update_project: (req, res) => {
        const body = req.body
        if (body.projectId != '' && body.name != '' && body.description != '' && body.client != '' && body.budget != '' && body.amountSpend != '' && body.duration != '' && body.status != '') {
            project_update(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Project update successfully"
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
        all_ongoing_project_fetch((err, results) => {
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
    },
    all_completed_project_view: (req, res) => {
        all_completed_project_fetch((err, results) => {
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
    }
}