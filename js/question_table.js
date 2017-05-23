$(document).ready(function () {
    var controlId = getParameterByName('controlId');
    $.ajax({
        url: siteRoot + '/question/questions/' + controlId,
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            console.log(data);
        }
    });
});
