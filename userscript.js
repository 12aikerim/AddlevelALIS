siteRoot = 'http://localhost:61071'

$(document).ready(function() {
	$('#login-form').on('submit', function(e) {
		e.preventDefault();
		
		$.ajax({
			url: siteRoot + $(this).attr('action'),
			type: 'post',
			data: $(this).serializeArray(),
			success: function(data, textStatus, jqxhr) {
				// todo: move the user to profile page
				// navigate to a page on the same domain
				// document.location = "/profile";
			},
			error: function(jqXHR, textStatus, errorThrown) {
				var errors = jqXHR.responseJSON;
				msg = "Errors:\n";
				for (var key in errors) {
					msg += key + ": " + errors[key][0] + '\n';
				}
				alert(msg);
				// todo: display errors
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
			},
			error: function(jqXHR, textStatus, errorThrown) {
				var errors = jqXHR.responseJSON
				// todo: display errors
			}
		});
	});
	
	$.ajax({
		url: siteRoot + '/constant/positions',
		type: 'get',
		success: function(data, textStatus, jqxhr) {
			pos = data.positions;
			var html = "";
			$.each(pos, function(idx, obj) {
				html += "<option value=\"" + obj.id + "\">" + obj.title + "</option>\n";
			});
			$('#register-position').append(html);
		}
	});
});