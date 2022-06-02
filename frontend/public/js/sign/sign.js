$(document).on('click', '#login', function() {
    var email = $('.email').val()
    var password = $('.password').val()
    var type = $('.type').val()
    $('.notice').removeClass('d-none')
    if (type == '1') {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5005/api/supervisor/login',
            dataType: 'json',
            data: {
                email: email,
                password: password
            },
            success: function(data) {
                if (data.success == 1) {
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                    setTimeout(function() {
                        window.location.replace('/supervisor')
                    }, 2000)
                } else {
                    $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
                }
            },
            error: function(err) {
                $('.notice-text').html('<span class="text-danger">' + err.statusText + '</span>')
            },
            statusCode: {
                404: function() {
                    $('.notice-text').html('<span class="text-danger">Email or password invalid</span>')
                },
                500: function() {
                    $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
                }
            }
        })
    } else if (type == '2') {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5005/api/member/login',
            dataType: 'json',
            data: {
                email: email,
                password: password
            },
            success: function(data) {
                if (data.success == 1) {
                    $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                    setTimeout(function() {
                        window.location.replace('/member')
                    }, 2000)
                } else {
                    $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
                }
            },
            error: function(err) {
                $('.notice-text').html('<span class="text-danger">' + err.statusText + '</span>')
            },
            statusCode: {
                404: function() {
                    $('.notice-text').html('<span class="text-danger">Email or password invalid</span>')
                },
                500: function() {
                    $('.notice-text').html('<span class="text-danger">Database connection error!</span>')
                }
            }
        })
    } else {
        $('.notice-text').html('<span class="text-danger">Fields are required</span>')
    }
})