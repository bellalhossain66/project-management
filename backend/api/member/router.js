const router = require('express').Router()
const { member_authentication } = require('../authentication/authentication')
const {
    member_login,
    all_ongoing_project_view,
    all_completed_project_view,
    all_open_project_view,
    all_project_member,
    all_applied_project_view,
    add_project_member,
    project_member_remove
} = require('./controller')

router.post('/login', member_login)
router.get('/project-member/:projectId', member_authentication, all_project_member)
router.get('/all-ongoing-project/:memberId', member_authentication, all_ongoing_project_view)
router.get('/all-completed-project/:memberId', member_authentication, all_completed_project_view)
router.get('/all-applied-project/:memberId', member_authentication, all_applied_project_view)
router.get('/all-open-project', member_authentication, all_open_project_view)
router.post('/project-enrollment', member_authentication, add_project_member)
router.delete('/exit-enrollment', member_authentication, project_member_remove)

module.exports = router