$(document).ready(function () {
    var controlId = sessionStorage.getItem('controlId');;
    $.ajax({
        url: siteRoot + '/question/questions?controlId=' + controlId,
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            sessionStorage.setItem('control-questions', jqxhr.responseText);
        }
    });
});
