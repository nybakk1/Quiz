

function getAllQuizzes() {
        var allquiz = '';
            $.ajax({
            url: 'rest/quiz/',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                allquiz = result;
            }
        });
        return allquiz;
}

function getQuiz(quizId) {
    var q = '';
    $.ajax({
        url:'rest/quiz' + quizId,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            q = result;
        }
    });
    return q;
}
