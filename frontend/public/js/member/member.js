$(function() {
    $("#example1").DataTable({
        "responsive": true,
        "autoWidth": false,
        "stateSave": true
    })
})

function all_project_member(projectId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/member/project-member/' + projectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<span class="btn btn-sm btn-default">' + data.data[i].member_id + '</span> '
                }
                $('.member' + projectId).html(html)
            }
        }
    })
}

function open_project() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/member/all-open-project',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].project_id + '</td>'
                    html += '<td><a>' + data.data[i].project_name + '</a><br /><small>' + data.data[i].opening_time + '</small></td>'
                    html += '<td>'
                    html += '<span class="member' + data.data[i].project_id + '"></span> '
                    html += '<span class="btn btn-sm btn-success add-member-submit" projectId="' + data.data[i].project_id + '" title="Enrollment"><i class="fas fa-plus"></i></span> '
                    html += '<span class="btn btn-sm btn-danger delete-member-submit" projectId="' + data.data[i].project_id + '" title="Exit"><i class="fas fa-minus"></i></span>'
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">Open</td>'
                    html += '</tr>'
                    all_project_member(data.data[i].project_id)
                }
                $('#project-list').html(html)
            }
        }
    })
}

function progress_project() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/member/all-ongoing-project/' + $('#userId').attr('userId'),
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].project_id + '</td>'
                    html += '<td><a>' + data.data[i].project_name + '</a><br /><small>' + data.data[i].opening_time + '</small></td>'
                    html += '<td>'
                    html += '<span class="member' + data.data[i].project_id + '"></span> '
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">Progress</td>'
                    html += '</tr>'
                    all_project_member(data.data[i].project_id)
                }
                $('#project-list').html(html)
            }
        }
    })
}

function completed_project() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/member/all-completed-project/' + $('#userId').attr('userId'),
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].project_id + '</td>'
                    html += '<td><a>' + data.data[i].project_name + '</a><br /><small>' + data.data[i].opening_time + '</small></td>'
                    html += '<td>'
                    html += '<span class="member' + data.data[i].project_id + '"></span> '
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">Completed</td>'
                    html += '</tr>'
                    all_project_member(data.data[i].project_id)
                }
                $('#project-list').html(html)
            }
        }
    })
}

function applied_project() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/member/all-applied-project/' + $('#userId').attr('userId'),
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].project_id + '</td>'
                    html += '<td><a>' + data.data[i].project_name + '</a><br /><small>' + data.data[i].opening_time + '</small></td>'
                    html += '<td>'
                    html += '<span class="member' + data.data[i].project_id + '"></span> '
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">' + data.data[i].status + '</td>'
                    html += '</tr>'
                    all_project_member(data.data[i].project_id)
                }
                $('#project-list').html(html)
            }
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'open-project') {
    open_project()
} else if (url == 'progress-project') {
    progress_project()
} else if (url == 'completed-projectt') {
    completed_project()
} else if (url == 'applied-project') {
    applied_project()
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})

$(document).on('click', '.add-member-submit', function() {
    var userId = $('#userId').attr('userId')
    var projectId = $(this).attr('projectId')
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5005/api/member/project-enrollment',
        dataType: 'json',
        data: {
            memberId: userId,
            projectId: projectId
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                all_project_member(projectId)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        },
        error: function(err) {
            Toast.fire({
                icon: 'error',
                title: err.status + ' ' + err.statusText
            })
        },
        statusCode: {
            500: function() {
                Toast.fire({
                    icon: 'error',
                    title: 'Database connection error!'
                })
            }
        }
    })
})
$(document).on('click', '.delete-member-submit', function() {
    var userId = $('#userId').attr('userId')
    var projectId = $(this).attr('projectId')
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:5005/api/member/exit-enrollment',
        dataType: 'json',
        data: {
            memberId: userId,
            projectId: projectId
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                all_project_member(projectId)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        },
        error: function(err) {
            Toast.fire({
                icon: 'error',
                title: err.status + ' ' + err.statusText
            })
        },
        statusCode: {
            500: function() {
                Toast.fire({
                    icon: 'error',
                    title: 'Database connection error!'
                })
            }
        }
    })
})