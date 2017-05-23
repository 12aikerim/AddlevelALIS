function create_control(data) {
    var control =
        '<div>' +
        '<div class="control-card uk-card uk-card-default' + (data.included ? ' uk-card-hover' : ' card_disabled') + '">' +
        '<div class="uk-card-header card_header">' +
        '</div>' +
        '<div class="uk-card-body card_body">' +
        '<h4 class="uk-card-title">' + data.title + '</h4>' +
        '<p class="card_body_bottom">' + data.count + ' questions</p>' +
        '<input type="hidden" value="' + data.id + '">' +
        '</div>' +
        '<div class="uk-card-footer">' +
        '<progress class="uk-progress" value="' + data.progress + '" max="100"></progress>' +
        '</div></div></div>\n';
    return control;
}

$(document).ready(function () {

    $.ajax({
        url: siteRoot + '/question/controls',
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            var controls = '';
            $.each(data, function (idx, obj) {
                controls += create_control(obj);
            });
            $('#control-grid').append(controls);
        }
    });

    $(document).on('click', '.control-card', function (e) {
        e.preventDefault();

        if ($(this).hasClass("card_disabled"))
            alert("This control is not included in your current plan.\nIf you wish to utilize this control, please consider upgrading your plan.");
        else {
            var id = $('input[type=hidden]', this).val();
            document.location.href = "/question_table.html?controlId=" + id;
        }

    });
});
