$(document).ready(function () {
    $.ajax({
        url: siteRoot + '/profile',
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            $('#profile-fname').find('input').val(data.firstName);
            $('#profile-lname').find('input').val(data.lastName);
            $('#profile-email').find('input').val(data.email);
            $('#profile-phone').find('input').val(data.phone);
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
                $('#company-name').find('input').val(co.name);
                $('#company-industry').find('select').find('option').first().html(co.industry);
                $('#company-country').find('select').find('option').first().html(co.country);
                $('#company-size').find('select').find('option').first().html(co.size);
                $('#company-securityEmps').find('input').val(co.securityEmps);
                $('#company-language').find('select').find('option').first().html(co.language);
                $('#company-budget').find('input').val(co.budget);
                $('#company-div').removeAttr('hidden');
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
    });

    $('#profile-edit-btn').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: siteRoot + '/constant/positions',
            type: 'get',
            success: function (data, textStatus, jqxhr) {
                $('#profile-position').find('select').first().append(create_options(data));
            }
        });
        var selects = $('#profile-edit-form').find('select');
        var inputs = $('#profile-edit-form').find('input');
        inputs.removeAttr('disabled');
        inputs.removeClass('no_field');
        selects.removeAttr('disabled');
        selects.removeClass('no_field');
        $('#profile-edit-form').find('input[name=email]').attr('disabled', 'disabled');
        $('#profile-edit-form').find('input[name=email]').addClass('no_field');
        $(this).attr('hidden', 'hidden');
        $('#profile-edit-form').find('input[type=submit]').removeAttr('hidden');

    });

    $('#profile-edit-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: siteRoot + $(this).attr('action'),
            type: 'put',
            data: $(this).serializeArray(),
            success: function (data, textStatus, jqxhr) {
                document.location.reload();
            },
            error: function (jqxhr, textStatus, errorThrown) {
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

    $('#company-edit-btn').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: siteRoot + '/constant/countries',
            type: 'get',
            success: function (data, textStatus, jqxhr) {
                $('#company-country').find('select').first().append(create_options(data));
            }
        });
        $.ajax({
            url: siteRoot + '/constant/industries',
            type: 'get',
            success: function (data, textStatus, jqxhr) {
                $('#company-industry').find('select').first().append(create_options(data));
            }
        });
        $.ajax({
            url: siteRoot + '/constant/sizes',
            type: 'get',
            success: function (data, textStatus, jqxhr) {
                $('#company-size').find('select').first().append(create_options(data));
            }
        });
        $.ajax({
            url: siteRoot + '/constant/languages',
            type: 'get',
            success: function (data, textStatus, jqxhr) {
                $('#company-language').find('select').first().append(create_options(data));
            }
        });
        var selects = $('#company-edit-form').find('select');
        var inputs = $('#company-edit-form').find('input');
        inputs.removeAttr('disabled');
        inputs.removeClass('no_field');
        selects.removeAttr('disabled');
        selects.removeClass('no_field');
        $(this).attr('hidden', 'hidden');
        $('#company-edit-form').find('input[type=submit]').removeAttr('hidden');

    });

    $('#company-edit-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: siteRoot + $(this).attr('action'),
            type: 'put',
            data: $(this).serializeArray(),
            success: function (data, textStatus, jqxhr) {
                document.location.reload();
            },
            error: function (jqxhr, textStatus, errorThrown) {
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

});
