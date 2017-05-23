$(document).ready(function () {
    $.ajax({
        url: siteRoot + '/profile',
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            $('#profile-fname').find('input').val(data.firstName);
            $('#profile-lname').html(data.lastName);
            $('#profile-email').html(data.email);
            $('#profile-phone').html(data.phone);
            $('#profile-position').find('select').find('option').first().html(data.position);
            $('#profile-div').removeAttr('hidden');
        }
    });

    $.ajax({
        url: siteRoot + '/company',
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            var co = data.company;
            if (Object.keys(co).length == 0) {
                $('#create-div').removeAttr('hidden');
                $.ajax({
                    url: siteRoot + '/constant/industries',
                    type: 'get',
                    success: function (data, textStatus, jqxhr) {
                        $('#create-industry').append(create_options(data));
                    }
                });

                $.ajax({
                    url: siteRoot + '/constant/sizes',
                    type: 'get',
                    success: function (data, textStatus, jqxhr) {
                        $('#create-size').append(create_options(data));
                    }
                });

                $.ajax({
                    url: siteRoot + '/constant/countries',
                    type: 'get',
                    success: function (data, textStatus, jqxhr) {
                        $('#create-country').append(create_options(data));
                    }
                });

                $.ajax({
                    url: siteRoot + '/constant/languages',
                    type: 'get',
                    success: function (data, textStatus, jqxhr) {
                        $('#create-language').append(create_options(data));
                    }
                });
            } else {
                $('#company-div').removeAttr('hidden');
                $('#company-name').html(co.name);
                $('#company-industry').html(co.industry);
                $('#company-country').html(co.country);
                $('#company-size').html(co.size);
                $('#company-securityEmps').html(co.securityEmps);
                $('#company-language').html(co.language);


                console.log(co);
            }
        },
        error: function (jqxhr, textStatus, errorThrown) {
            var errors = jqxhr.responseJSON;
            alert(errors);
        }
    });

    $('#create-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: siteRoot + $(this).attr('action'),
            type: 'post',
            data: $(this).serializeArray(),
            success: function (data, textStatus, jqxhr) {
                document.location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // todo: display errors
                var errors = jqXHR.responseJSON;
                msg = "Errors:\n";
                for (var key in errors) {
                    msg += key + ": " + errors[key][0] + '\n';
                }
                alert(msg);
            }
        });
    })

    
});
