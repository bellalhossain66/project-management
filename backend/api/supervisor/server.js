const pool = require('../../system/database/database')

module.exports = {
    supervisor_signin: (email, callBack) => {
        pool.query(
            "select * from `supervisor` where `email`=?", [email],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    all_member_fetch: (callBack) => {
        pool.query(
            "select * from `member`",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_member_records_fetch: (callBack) => {
        pool.query(
            "select count(*) as total from `member`",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    last_project_id: (callBack) => {
        pool.query(
            "select `id`,`status` from `project` order by id desc limit 1",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    add_new_project_insert: (body, callBack) => {
        pool.query(
            "insert into `project`(`project_id`,`project_name`,`description`,`client_company`,`project_budget`,`amount_spend`,`project_duration`,`opening_time`) " +
            "values(?,?,?,?,?,?,?,?)", [
                body.projectId,
                body.name,
                body.description,
                body.client,
                body.budget,
                body.amountSpend,
                body.duration,
                body.date
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_project_records_fetch: (callBack) => {
        pool.query(
            "select count(*) as total from `project`",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    all_project_fetch: (callBack) => {
        pool.query(
            "select * from `project`",
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
    all_project_member_fetch: (projectId, callBack) => {
        pool.query(
            "select * from `project_member` where `project_id`=?", [projectId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    project_member_delete: (id, callBack) => {
        pool.query(
            "delete from `project_member` where `id`=?", [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    project_delete: (projectId, callBack) => {
        pool.query(
            "delete from `project` where `project_id`=?", [projectId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    project_fetch_by_id: (projectId, callBack) => {
        pool.query(
            "select * from `project` where `project_id`=?", [projectId],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    project_update: (body, callBack) => {
        pool.query(
            "update `project` set `project_name`=?,`description`=?,`client_company`=?,`project_budget`=?,`amount_spend`=?,`project_duration`=?,`status`=?" +
            " where `project_id`=?", [
                body.name,
                body.description,
                body.client,
                body.budget,
                body.amountSpend,
                body.duration,
                body.status,
                body.projectId
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_ongoing_project_fetch: (callBack) => {
        pool.query(
            "select * from `project` where `status`='on-going'",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    all_completed_project_fetch: (callBack) => {
        pool.query(
            "select * from `project` where `status`='completed'",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}