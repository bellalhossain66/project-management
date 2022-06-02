const { verify } = require('jsonwebtoken')
module.exports = app => {
    app.get('/', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                        if (err) {
                            res.clearCookie('log_token')
                            res.clearCookie('log_in')
                            res.redirect('/')

                        }
                        res.render('supervisor/index', {
                            title: 'Dashboard',
                            name: decoded.name,
                            userId: decoded.userId,
                            email: decoded.email
                        })
                    })
                }
                res.render('supervisor/index', {
                    title: 'Dashboard',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.redirect('/login')
        }
    })
    app.get('/login', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            res.redirect('/')
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/registration', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            res.redirect('/')
        } else {
            res.render('sign/signup')
        }
    })
    app.get('/supervisor', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/index', {
                    title: 'Dashboard',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/members', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/members', {
                    title: 'Members',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/add-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/add-project', {
                    title: 'Add Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/all-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/all-project', {
                    title: 'All Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/edit-project/:projectId', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/edit-project', {
                    title: 'Edit Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/view-project/:projectId', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/view-project', {
                    title: 'Project Detail',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/ongoing-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/ongoing-project', {
                    title: 'Ongoing Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/completed-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.SUPERVISOR_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('supervisor/completed-project', {
                    title: 'Completed Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/logout', (req, res) => {
        res.clearCookie('log_token')
        res.clearCookie('log_in')
        res.redirect('/')
    })
    app.get('/member', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('member/index', {
                    title: 'Member',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/open-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('member/open-project', {
                    title: 'Open Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/progress-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('member/progress-project', {
                    title: 'Progress Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/completed-projectt', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('member/completed-project', {
                    title: 'Completed Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
    app.get('/applied-project', (req, res) => {
        const jwtoken = req.cookies.log_token
        if (jwtoken != undefined && req.cookies.log_in == 'true') {
            verify(jwtoken, process.env.MEMBER_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('log_token')
                    res.clearCookie('log_in')
                    res.redirect('/')
                }
                res.render('member/applied-project', {
                    title: 'Applied Project',
                    name: decoded.name,
                    userId: decoded.userId,
                    email: decoded.email
                })
            })
        } else {
            res.render('sign/signin')
        }
    })
}