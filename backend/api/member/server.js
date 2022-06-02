const pool = require('../../system/database/database')

module.exports = {
    member_signin: (email, callBack) => {
        pool.query(
            "select * from `member` where `email`=?", [email],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    all_project_member_fetch: (projectId, callBack) => {
        pool.query(
            "select * from `project_member` where `project_id`=?", [projectId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_ongoing_project_fetch: (memberId, callBack) => {
        pool.query(
            "select * from `project` join `project_member` on " +
            "project.project_id=project_member.project_id and project_member.member_id=? where `status`='on-going'", [memberId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_completed_project_fetch: (memberId, callBack) => {
        pool.query(
            "select * from `project` join `project_member` on " +
            "project.project_id=project_member.project_id and project_member.member_id=?  where `status`='completed'", [memberId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_applied_project_fetch: (memberId, callBack) => {
        pool.query(
            "select * from `project` join `project_member` on " +
            "project.project_id=project_member.project_id and project_member.member_id=?", [memberId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_open_project_fetch: (callBack) => {
        pool.query(
            "select * from `project` where `status`='open'",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    add_project_member_insert: (body, callBack) => {
        pool.query(
            "insert into `project_member`(`project_id`,`member_id`,`join_time`) values(?,?,?)", [
                body.projectId,
                body.memberId,
                body.date
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    project_member_delete: (body, callBack) => {
        pool.query(
            "delete from `project_member` where `project_id`=? and `member_id`=?", [
                body.projectId,
                body.memberId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}