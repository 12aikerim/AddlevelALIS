siteRoot = 'http://localhost:61071'

function create_control(data) {
    var control =
        '<div>' +
        '<div class="uk-card uk-card-default' + (!data.included ? ' disabled_card' : '') + '">' +
        '<div class="uk-card-header">' +
        '</div>' +
        '<div class="uk-card-body"' +
        '<h3 class="uk-card-title">' + data.title + '</h3>' +
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
});
