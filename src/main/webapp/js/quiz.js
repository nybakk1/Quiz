
$(document).ready(function () {
    function getAllQuizzes() {
        var allquiz = '';
        $.ajax({
            url:'rest/quiz/',
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
            url:'rest/quiz/' + quizId,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                q = result;
            }
        });
        return q;
    }



    $("#question").click(function () {
        $.ajax({
            url: 'rest/quiz/',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                quizId: $("#quizId").val(),
                navn: $("#navn").val(),
                sporsmal: [{
                    sporsmal: $("#sporsmal").val(),
                    svarAlternativ:
                        [{
                        svaralternativ: $("#alt1").val()}, {svaralternativ: $("#alt2").val()}],
                    score: $("#score").val(),
                    riktigSvar: $("#riktig").val(),
                    lengde: $("#lengde").val(),
                    imgUrl: $("#imgUrl").val(),
                }],
                opprettet: new Date(),
                start: new Date($("#startdato").val()),
                avsluttes: new Date($("#avsluttdato").val()),
            }),
            dataType: 'json',
            success: function (result) {
                console.log("Success");
            },
            statusCode: {
                404: function () {
                    console.log("404");
                }

            },
            complete: function () {
                console.log("Complete");
            }
        });
    });

    $("#tap").click(function () {
        $("#first").hide("slow");
        $("#second").show();
    });

    $("#quizlength").click(function () {
        $("#second").hide("slow");
        $("#third").show();
    });
    $("#question").click(function () {
        $("#third").hide("slow");
        $("#formsAdd").append("REG ER FULLFØRT");
    })





    function calcDate(fradato, tildato) {
        var d = Math.abs((tildato.getTime()-fradato.getTime()));
      return Math.ceil(d/(1000*3600*24));

    };

});