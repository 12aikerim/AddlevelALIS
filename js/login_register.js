$(document).ready(function () {
	$('#login-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: siteRoot + $(this).attr('action'),
			type: 'post',
			data: $(this).serializeArray(),
			success: function(data, textStatus, jqxhr) {
				window.location.href = '/client-dashboard.html';
			},
            error: function (jqxhr, textStatus, errorThrown) {
                var errors = jqxhr.responseJSON;
				msg = "Errors:\n";
				for (var key in errors) {
					msg += key + ": " + errors[key][0] + '\n';
				}
				alert(msg);
			}
		});
	});

	$('#register-form').on('submit', function(e) {
		e.preventDefault();

		$.ajax({
			url: siteRoot + $(this).attr('action'),
			type: 'post',
			data: $(this).serializeArray(),
			success: function(data, textStatus, jqxhr) {
				// todo: tell user to go check their email
				// todo: redirect user to home page
				alert("Please check your email for verification email");
				window.location.href = '/client-dashboard.html';
			},
			error: function(jqxhr, textStatus, errorThrown) {
				// todo: display errors
				var errors = jqxhr.responseJSON;
				msg = "Errors:\n";
				for (var key in errors) {
					msg += key + ": " + errors[key][0] + '\n';
				}
				alert(msg);
			}
		});
	});

	$.ajax({
		url: siteRoot + '/constant/positions',
		type: 'get',
		success: function(data, textStatus, jqxhr) {
            $('#register-position').append(create_options(data));
		}
	});
});
