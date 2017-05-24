function create_li(control) {
    $.ajax({
        url: siteRoot + '/question/isanswered?controlId=' + control.id,
        type: 'get',
        success: function (data, textStatus, jqxhr) {
            var html = "";
            $.each(data, function (idx, obj) {
                if (obj.answered)
                    html += '<li><span class="uk-margin-small-right" uk-icon="icon: check" style="color:green" href="#modal-table" uk-toggle></span>' +
                        `<a href="question_individual.html?qId=${obj.subControl}">Question ${obj.subControl}</a></li>`;
                else
                    html += '<li><span class="uk-margin-small-right" uk-icon="icon: minus-circle" style="color:red" href="#modal-caption" uk-toggle></span>' +
                        `<a href="question_individual.html?qId=${obj.subControl}">Question ${obj.subControl}</a></li>`;
            });
            $('#sidebar-questions').html(html);

        }
    });
}
//<span class="uk-margin-small-right" uk-icon="icon: check" style="color:green" href="#modal-table" uk-toggle></span>
//<span class="uk-margin-small-right" uk-icon="icon: minus-circle" style="color:red" href="#modal-caption" uk-toggle></span>

function create_opt(question) {
    var opt = question.options;
    opt = JSON.parse(opt);
    var html = "";
    if (question.type.toLowerCase() == 'radiobutton')
        $.each(opt, function (idx, obj) {
            html += `<div class="radio"><input type="radio" id="checkrads_${idx}" name="answer" value="${idx}"><label for="checkrads_${idx}">${obj}</label></div>`
        });
    else if (question.type.toLowerCase() == 'checkbox')
        $.each(opt, function (idx, obj) {
            html += `<div class="checkbox"><input type="checkbox" id="checkrads_${idx}" name="answer" value="${idx}"><label for="checkrads_${idx}">${obj}</label></div>`;
        });
    return html;
}


$(document).ready(function () {
    var controlId = sessionStorage.getItem('controlId');
    var scId = getParameterByName('qId');
    if (!scId)
        scId = 1;
    else
        scId = parseInt(scId);

    var control;
    var question;

    $.ajax({
        url: siteRoot + `/question/question?controlId=${controlId}&subControl=${scId}`,
        type: 'get',
        async: false,
        success: function (data, textStatus, jqxhr) {
            question = data;
        }
    });

    $.ajax({
        url: siteRoot + `/question/controls?controlId=${controlId}`,
        type: 'get',
        async: false,
        success: function (data, textStatus, jqxhr) {
            control = data;
        }
    });

    console.log(control);
    console.log(question);

    $('#sidebar-control').html(control.title);
    create_li(control)

    $('#question-title').html(`Question ${question.subControl}`);
    $('#question-text').html(question.question);

    console.log(question.options);

    $('#question-options').html(create_opt(question));


    $('#control-wiki').html(question.recommendation);
    if (!question.answer) {
        $('#control-wiki').parent().parent().attr('hidden', 'hidden');
    } else {
        if (question.type.toLowerCase() == 'radiobutton' || question.type.toLowerCase() == 'checkbox') {

            var ans = JSON.parse(question.answer.answer);
            $.each(ans, function (idx, obj) {
                $(`#checkrads_${obj}`).prop('checked', true);
            });
        }
    }

    $('#progress-bar').val(control.progress);
    if (question.subControl == 1) {
        $('#question-previous').addClass('not-active');
        $('#question-previous').click(function (e) {
            e.preventDefault();
            return false;
        });
    }

    if (question.subControl == control.count) {
        $('#question-next').addClass('not-active');
        $('#question-next').click(function (e) {
            e.preventDefault();
            return false;
        });
    }

    $('#question-count').html(`${question.subControl}/${control.count}`);

    $('#question-previous, #question-next, #answer-save').click(function (e) {
        e.preventDefault();
        var ans = null;
        var caller_id = $(this).attr('id');
        if (question.type.toLowerCase() == 'radiobutton' || question.type.toLowerCase() == 'checkbox') {
            var checked = $('input[name=answer]:checked');
            ans = [];
            checked.each(function (idx) {
                ans.push($(this).val());
            });
            ans = JSON.stringify(ans);
            console.log(ans);
        }
        if (ans != null && ans != '[]') {
            data = {
                'QuestionId': question.id,
                'Answer': ans
            };
            $.ajax({
                url: siteRoot + '/question/answer',
                type: 'put',
                data: data,
                success: function (data, textStatus, jqxhr) {

                    if (caller_id == 'answer-save')
                        window.location.href = '/question_control.html';
                    else if (caller_id == 'question-previous')
                        window.location.href = `/question_individual.html?qId=${question.subControl - 1}`;
                    else if (caller_id == 'question-next')
                        window.location.href = `/question_individual.html?qId=${question.subControl + 1}`;
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
        } else {
            if (caller_id == 'answer-save')
                window.location.href = '/question_control.html';
            else if (caller_id == 'question-previous')
                window.location.href = `/question_individual.html?qId=${question.subControl - 1}`;
            else if (caller_id == 'question-next')
                window.location.href = `/question_individual.html?qId=${question.subControl + 1}`;
        }

    });

});
