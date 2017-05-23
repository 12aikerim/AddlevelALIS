$(document).ready(function () {
    var controlId = getParameterByName('controlId');
    $.ajax({
        url: siteRoot + '/question/questions?controlId=' + controlId,
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            localStorage.setItem('control-questions', jqxhr.responseText)
        }
    });
});
