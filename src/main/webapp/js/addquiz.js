
$(document).ready(function () {
    var max_fields      = 10;

    var x = 0;
    $("#addmore").click(function(e) {
        e.preventDefault();

        if (x < max_fields) {
            x++;
            $("#moreQuestions").append(
                "<div class=\"form-group\"> <label for=\"sporsmal" + x + "\"><h3>Spørsmål " + x + "</h3></label>"+
                    "<input type=\"sporsmal" + x + "\" class=\"form-control\" id=\"sporsmal" + x + "\">" +
                "</div>"+
                "<div class=\"form-group\">"+
                    "<label for=\"alt1" + x + "\">Alternativ 1</label>" +
                    "<input type=\"alt1" + x + "\" class=\"form-control\" id=\"alt1" + x + "\">" +
                "</div>" +
                "<div class=\"form-group\">" +
                    "<label for=\"alt2" + x + "\">Alternativ 2</label>" +
                    "<input type=\"alt2" + x + "\" class=\"form-control\" id=\"alt2" + x + "\">" +
                "</div>" +
                "<div class=\"form-group\">" +
                    "<label for=\"alt3" + x + "\">Alternativ 3</label>" +
                    "<input type=\"alt3" + x + "\" class=\"form-control\" id=\"alt3" + x + "\">" +
                "</div>" +
                "<div class=\"form-group\">" +
                    "<label for=\"alt4" + x + "\">Alternativ 4</label>" +
                    "<input type=\"alt4" + x + "\" class=\"form-control\" id=\"alt4" + x + "\">" +
                "</div>" +
                "<div class=\"form-group\">" +
                    "<label for=\"riktig" + x + "\">Riktig alternativ (heltall) :</label>" +
                    "<input type=\"riktig" + x + "\" class=\"form-control\" id=\"riktig" + x + "\">" +
                "</div>\n" +
                "<div class=\"form-group\">" +
                    "<label for=\"lengde" + x + "\">Lengde på spørsmål (i sekunder) :</label>" +
                    "<input type=\"lengde" + x + "\" class=\"form-control\" id=\"lengde" + x + "\">" +
                "</div>\n" +
                "<div class=\"form-group\">" +
                    "<label for=\"score" + x + "\">Score for riktig svar:</label>\n" +
                    "<input type=\"score" + x + "\" class=\"form-control\" id=\"score" + x + "\">" +
                "</div>\n" +
                "<div class=\"form-group\">" +
                    "<label for=\"imgUrl" + x + "\">Bilde: (http://guru-utvikling.no/wp-content/uploads/2017/05/Bilde-til-sak-om-bilder-750x365.jpg)</label>" +
                    "<input type=\"imgUrl" + x + "\" class=\"form-control\" id=\"imgUrl" + x + "\">" +
                "</div>"
            ); //add input box
        };
    });



    $("#question").click(function () {
        var spm = [];
        for(var i = 1;i <= x;i++){
            spm.push({
                sporsmal: $(("#sporsmal" + i)).val(),
                svarAlternativ:
                    [{
                        svaralternativ: $(("#alt1" + i)).val()}, { svaralternativ: $("#alt2" + i).val()},{ svaralternativ: $("#alt3" + i).val()},{ svaralternativ: $("#alt4" + i).val()} ],
                score: $("#score" + i).val(),
                riktigSvar: $("#riktig" + i).val(),
                lengde: $("#lengde" + i).val(),
                imgUrl: $("#imgUrl" + i).val(),
            });
        };
        var i = 1;
        spm.push({
            sporsmal: $(("#sporsmal" + i)).val(),
            svarAlternativ:
                [{
                    svaralternativ: $(("#alt1" + i)).val()}, { svaralternativ: $("#alt2" + i).val()},{ svaralternativ: $("#alt3" + i).val()},{ svaralternativ: $("#alt4" + i).val()} ],
            score: $("#score" + i).val(),
            riktigSvar: $("#riktig" + i).val(),
            lengde: $("#lengde" + i).val(),
            imgUrl: $("#imgUrl" + i).val(),
        });


        $.ajax({
            url: 'rest/quiz/',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                quizId: $("#quizId").val(),
                navn: $("#navn").val(),
                sporsmal: spm,
                opprettet: new Date(),
                start: new Date($("#startdato").val()),
            }),
            dataType: 'json',
            success: function (result) {
                console.log("POST SUCCESS");
            },
            statusCode: {
                404: function () {
                    console.log("404 - Not Found");
                }

            },
            complete: function () {
                console.log("POST COMPLETE");
            }
        });
    });

    $("#tap").click(function () {
        $("#first").hide("slow");
        $("#second").show();
        $("#addmore").show();
        $("#question").show();
    });

    $("#question").click(function () {
        $("#second").hide("slow");
        $("#question").hide("slow");
        $("#addmore").hide("slow");
        $("#formsAdd").append("<h2>Quiz er registrert.</h2>");
    });





    function calcDate(fradato, tildato) {
        var d = Math.abs((tildato.getTime()-fradato.getTime()));
      return Math.ceil(d/(1000*3600*24));

    };

});