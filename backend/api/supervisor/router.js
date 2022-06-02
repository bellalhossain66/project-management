const router = require('express').Router()
const { supervisor_authentication } = require('../authentication/authentication')
const {
    supervisor_login,
    all_member_view,
    all_member_records,
    add_new_project,
    all_project_records,
    all_project_view,
    add_project_member,
    all_project_member,
    project_member_remove,
    delete_project,
    project_view_by_id,
    update_project,
    all_ongoing_project_view,
    all_completed_project_view
} = require('./controller')

router.post('/login', supervisor_login)
router.get('/member', supervisor_authentication, all_member_view)
router.get('/all-member', supervisor_authentication, all_member_records)
router.post('/add-project', supervisor_authentication, add_new_project)
router.get('/all-project', supervisor_authentication, all_project_records)
router.get('/project', supervisor_authentication, all_project_view)
router.post('/add-member', supervisor_authentication, add_project_member)
router.get('/project-member/:projectId', supervisor_authentication, all_project_member)
router.delete('/project-member-delete/:id', supervisor_authentication, project_member_remove)
router.delete('/project-delete/:projectId', supervisor_authentication, delete_project)
router.get('/project-view/:projectId', supervisor_authentication, project_view_by_id)
router.patch('/project-update', supervisor_authentication, update_project)
router.get('/all-ongoing-project', supervisor_authentication, all_ongoing_project_view)
router.get('/all-completed-project', supervisor_authentication, all_completed_project_view)

module.exports = router