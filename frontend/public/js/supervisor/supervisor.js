$(function() {
    $("#example1").DataTable({
        "responsive": true,
        "autoWidth": false,
        "stateSave": true
    })
})

function all_members() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/all-member',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('#total-member').text(data.data.total)
            }
        }
    })
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/all-project',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('#total-project').text(data.data.total)
            }
        }
    })
}

function my_member() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/member',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + (i + 1) + '</td>'
                    html += '<td>' + data.data[i].name + '</td>'
                    html += '<td>' + data.data[i].userId + '</td>'
                    html += '<td>' + data.data[i].email + '</td>'
                    html += '<td>' + data.data[i].designation + '</td>'
                    html += '<td>' + data.data[i].status + '</td>'
                    html += '</tr>'
                }
                $('#member-list').html(html)
            }
        }
    })
}

function all_project() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/project',
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
                    html += '<span class="btn btn-sm btn-success add-member" data-toggle="modal" data-target="#add-member" projectId="' + data.data[i].project_id + '" title="add member"><i class="fas fa-plus"></i></span> '
                    html += '<span class="btn btn-sm btn-danger delete-member" data-toggle="modal" data-target="#delete-member" projectId="' + data.data[i].project_id + '" title="delete member"><i class="fas fa-minus"></i></span>'
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">' + data.data[i].status + '</td>'
                    html += '<td>'
                    html += '<a class="btn btn-primary btn-sm" href="/view-project/' + data.data[i].project_id + '"> <i class="fas fa-folder"> </i> View </a> '
                    html += '<a class="btn btn-info btn-sm" href="/edit-project/' + data.data[i].project_id + '"> <i class="fas fa-pencil-alt"> </i> Edit </a> '
                    html += '<a class="btn btn-danger btn-sm delete-project" projectId="' + data.data[i].project_id + '" href="#"> <i class="fas fa-trash"> </i> Delete </a>'
                    html += '</td>'
                    html += '</tr>'
                    all_project_member(data.data[i].project_id)
                }
                $('#project-list').html(html)
            }
        }
    })
}

function all_project_member(projectId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/project-member/' + projectId,
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

function project_view_by_id(projectId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/project-view/' + projectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('#name').val(data.data.project_name)
                $('#description').val(data.data.description)
                $('#client').val(data.data.project_name)
                $('#budget').val(data.data.project_budget)
                $('#amountSpend').val(data.data.amount_spend)
                $('#duration').val(data.data.project_duration)
                $('#status').val(data.data.status)
                $('.name').text(data.data.project_name)
                $('#description').text(data.data.description)
                $('.client').text(data.data.project_name)
                $('.budget').text(data.data.project_budget)
                $('.amountSpend').text(data.data.amount_spend)
                $('.duration').text(data.data.project_duration)
                $('.status').text(data.data.status)
            }
        }
    })
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/project-member/' + projectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="post">'
                    html += '<div class="user-block">'
                    html += '<img class="img-circle img-bordered-sm" src="/img/profile.png" alt="user image">'
                    html += '<span class="username"><a href="#">' + data.data[i].member_id + '</a></span>'
                    html += '<span class="description">Shared publicly</span>'
                    html += '</div>'
                    html += '<p><span class="text-info">' + data.data[i].member_id + '</span> is added in project at <span class="text-info">' + data.data[i].join_time + '<span></p>'
                    html += '</div>'
                }
                $('#project-activity').html(html)
            }
        }
    })
}

function ongoing_project() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/all-ongoing-project',
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
                    html += '<span class="btn btn-sm btn-success add-member" data-toggle="modal" data-target="#add-member" projectId="' + data.data[i].project_id + '" title="add member"><i class="fas fa-plus"></i></span> '
                    html += '<span class="btn btn-sm btn-danger delete-member" data-toggle="modal" data-target="#delete-member" projectId="' + data.data[i].project_id + '" title="delete member"><i class="fas fa-minus"></i></span>'
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">' + data.data[i].status + '</td>'
                    html += '<td>'
                    html += '<a class="btn btn-primary btn-sm" href="/view-project/' + data.data[i].project_id + '"> <i class="fas fa-folder"> </i> View </a> '
                    html += '<a class="btn btn-info btn-sm" href="/edit-project/' + data.data[i].project_id + '"> <i class="fas fa-pencil-alt"> </i> Edit </a> '
                    html += '<a class="btn btn-danger btn-sm delete-project" projectId="' + data.data[i].project_id + '" href="#"> <i class="fas fa-trash"> </i> Delete </a>'
                    html += '</td>'
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
        url: 'http://localhost:5005/api/supervisor/all-completed-project',
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
                    html += '<span class="btn btn-sm btn-success add-member" data-toggle="modal" data-target="#add-member" projectId="' + data.data[i].project_id + '" title="add member"><i class="fas fa-plus"></i></span> '
                    html += '<span class="btn btn-sm btn-danger delete-member" data-toggle="modal" data-target="#delete-member" projectId="' + data.data[i].project_id + '" title="delete member"><i class="fas fa-minus"></i></span>'
                    html += '</td>'
                    html += '<td class="project_progress">'
                    html += '<div class="progress progress-sm">'
                    html += '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="' + data.data[i].progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + data.data[i].progress + '%"></div>'
                    html += '</div>'
                    html += '<small>' + data.data[i].progress + '% complete</small>'
                    html += '</td>'
                    html += '<td> <span class="badge badge-info">' + data.data[i].status + '</td>'
                    html += '<td>'
                    html += '<a class="btn btn-primary btn-sm" href="/view-project/' + data.data[i].project_id + '"> <i class="fas fa-folder"> </i> View </a> '
                    html += '<a class="btn btn-info btn-sm" href="/edit-project/' + data.data[i].project_id + '"> <i class="fas fa-pencil-alt"> </i> Edit </a> '
                    html += '<a class="btn btn-danger btn-sm delete-project" projectId="' + data.data[i].project_id + '" href="#"> <i class="fas fa-trash"> </i> Delete </a>'
                    html += '</td>'
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
if (url == 'supervisor') {
    all_members()
} else if (url == 'members') {
    my_member()
} else if (url == 'all-Project') {
    all_project()
} else if (window.location.href.includes("edit-project") == true) {
    var url = window.location.href.split('edit-project/')[1]
    project_view_by_id(url.substring(0, url.length - 1))
} else if (window.location.href.includes("view-project") == true) {
    var url = window.location.href.split('view-project/')[1]
    project_view_by_id(url.substring(0, url.length - 1))
} else if (url == 'ongoing-Project') {
    ongoing_project()
} else if (url == 'completed-Project') {
    completed_project()
}

var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
$(document).on('click', '.add-new-project', function() {
    var name = $('#name').val()
    var description = $('#description').val()
    var client = $('#client').val()
    var budget = $('#budget').val()
    var amountSpend = $('#amountSpend').val()
    var duration = $('#duration').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5005/api/supervisor/add-project',
        dataType: 'json',
        data: {
            name: name,
            description: description,
            client: client,
            budget: budget,
            amountSpend: amountSpend,
            duration: duration
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
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
$(document).on('click', '.add-member', function() {
    $('.projectId').val($(this).attr('projectId'))
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/member',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = '<option value="" disabled selected>Select member</option>'
                for (var i = 0; i < data.data.length; i++) {
                    html += '<option value="' + data.data[i].userId + '">' + data.data[i].userId + '</option>'
                }
                $('.member-list').html(html)
            }
        }
    })
})
$(document).on('click', '.add-member-submit', function() {
    var memberId = $('.member-list').val()
    var projectId = $('.projectId').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:5005/api/supervisor/add-member',
        dataType: 'json',
        data: {
            memberId: memberId,
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

function delete_member(projectId) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5005/api/supervisor/project-member/' + projectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                html = '<table class="table border-0"><tbody><tr>'
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + data.data[i].member_id + '</td>'
                    html += '<td><span class="btn btn-danger btn-sm project-member-delete" id="' + data.data[i].id + '" projectId="' + data.data[i].project_id + '" href="#"> <i class="fas fa-trash"> </i></span></td>'
                    html += '</tr>'
                }
                html += '</tobody></table>'
                $('.member-for-delete').html(html)
            }
        }
    })
}
$(document).on('click', '.delete-member', function() {
    delete_member($(this).attr('projectId'))
})
$(document).on('click', '.project-member-delete', function() {
    var projectId = $(this).attr('projectId')
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:5005/api/supervisor/project-member-delete/' + $(this).attr('id'),
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                all_project_member(projectId)
                delete_member(projectId)
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
$(document).on('click', '.delete-project', function() {
    var projectId = $(this).attr('projectId')
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:5005/api/supervisor/project-delete/' + projectId,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                all_project()
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
$(document).on('click', '.update-project-submit', function() {
    var name = $('#name').val()
    var description = $('#description').val()
    var client = $('#client').val()
    var budget = $('#budget').val()
    var amountSpend = $('#amountSpend').val()
    var duration = $('#duration').val()
    var status = $('#status').val()
    var url = window.location.href.split('edit-project/')[1]
    var projectId = url.substring(0, url.length - 1)
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:5005/api/supervisor/project-update',
        dataType: 'json',
        data: {
            name: name,
            description: description,
            client: client,
            budget: budget,
            amountSpend: amountSpend,
            duration: duration,
            status: status,
            projectId: projectId
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
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