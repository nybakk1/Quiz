$(document).ready(function () {
    var brukernavn = "Velg Brukernavn";
    var quiz = getAllQuizzes();




    if (quiz.length == 0) {
        $("#quizview").append("<h1 class=\"text-center\"> Ser ikke ut som om det er noen quizer akkurat nå. <br> Legg til en for å spille");
    } else {
        quiz.sort(sorterTall);
        for (var i = 0; i < quiz.length; i++) {
            var d = new Date(quiz[i].start);
            var $li = $("<div class=\"text-center jumbotron\" id=\'quiz_add\'> <h4>QuizID: " + quiz[i].quizId + " Name: " + quiz[i].navn + " </h4><br><h5>Startdato: " + d.toLocaleString() + " </h5> </div> ");
            (function (i) {
                $li.click(function () {
                    showQuizOverview(quiz[i]);
                });
            }(i));
            $('#quizview').append($li);
        }
    };



    function showQuizOverview(q) {
        $("#quizview").hide("slow");
        $("#quiz_runner").show();
        $("#quiz_runner").append("<div class=\"text-center jumbotron kanten\"><h4>Du har valgt quiz #" + q.quizId + ": " + q.navn +
            "<br>Quizen består av " + (q.sporsmal.length-1) + " spørsmål  </h4>" +
            "<br><input class='text-center' id='uname' type='text' value='" + brukernavn + "'></input></div>");
        $("#uname").change(function () {
            setUname($("#uname").val());
        });
        if (q.start < new Date() && q.start != null){
            var $add = $("<div class=\"text-center jumbotron kanten \" id=\"startQuiz\"><h3> Start Quiz </h3></div>");
            $add.click(function () {
                $("#quiz_runner").hide("slow");
                kjoyr(q.quizId);
            });
            $("#quiz_runner").append($add);
        } else {
            var $nope = $("<div class=\"text-center jumbotron kanten \" id='ingenQuiz'> <h4>Quiz har ikke startet enda</h4> </div>");
            $("#quiz_runner").append($nope);
        }
    }


    function changeQuestion(kvis,i) {
        var l = kvis.sporsmal[i].lengde - 1;
        var x = setInterval(function () {
            $("#timer").html("Tid igjen " + l);
            l--;
        },1000);
        var ys = i;
        var $s = $("<div id='spmop'><div class=\"text-center jumbotron\"><h2> " + kvis.sporsmal[ys].sporsmal +
            "</h2><img src=\" " + kvis.sporsmal[ys].imgUrl + "\"  style='width:200;height:200px'><div id='timer'></div> </div></div>");
        var $alts = $("<div id='nuKjorVi'><div class=\'text-center jumbotron altser\' id='ssss' style='width: 50%; float: left'> " + kvis.sporsmal[ys].svarAlternativ[0].svaralternativ + "</div>" +
            "<div class=\'text-center jumbotron altser\' id='ssss' style='width: 50%; float:left'> " + kvis.sporsmal[ys].svarAlternativ[1].svaralternativ + "</div>" +
            "<div class=\'text-center jumbotron altser\' id='ssss' style='width: 50%; float: left'> " + kvis.sporsmal[ys].svarAlternativ[2].svaralternativ + "</div>" +
            "<div class=\'text-center jumbotron altser\' id='ssss' style='width: 50%; float: left'> " + kvis.sporsmal[ys].svarAlternativ[3].svaralternativ + "</div></div>");
        $("#spmop").replaceWith($s);
        $("#nuKjorVi").replaceWith($alts);
    };

    function kjoyr(inn) {
        var kvis = getQuiz(inn);
        var sum = 0;
        var ys = 0;
        var i = 0;
        var duration = 0;
        function waitQuiz(duration){
            setTimeout(function(){
                duration = kvis.sporsmal[i].lengde * 1000;
                changeQuestion(kvis,i);
                $(".altser").one("click",function () {
                    $(this).addClass("clickedOn");
                    if (($(".clickedOn").text().trim() == kvis.sporsmal[i-1].svarAlternativ[(kvis.sporsmal[i -1].riktigSvar - 1)].svaralternativ.trim())){
                        $(".clickedOn").css("background-color","green");
                        sum += kvis.sporsmal[i - 1].score;
                    } else{
                        $(".clickedOn").css("background-color","red");
                    }
                    $(".altser").unbind();
                    //setScoreboard(kvis.quizId);
                    setScoreboard();
                });

                i++;
                if(i < kvis.sporsmal.length){
                    console.log(kvis.sporsmal.length);
                    console.log(i);
                    console.log(duration);
                    waitQuiz(duration);
                } else {
                    console.log("SUM " + sum);
                    $("#nuKjorVi").hide("slow");
                    $("#spmop").hide("slow");
                    $("body").append("<div class=\"text-center\"><h2>QUIZ FULLFØRT<br>" + getUname() + ",du fikk " + sum + " poeng</h2></div>");
                }
            },duration);
        }
        waitQuiz(duration);

    };



    function getAllQuizzes() {
        var allquiz = '';
        $.ajax({
            url: 'rest/quiz/',
            async: false,    // ikke optimal, gir advarsel i browser. ad-hoc løsning.
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                allquiz = result;
            }
        });
        return allquiz;
    };

    $("#nuKjorVi").click(function (){
        $(this).addClass("clickedOn");
        console.log("INNE I ALTS");
    });


    function getQuiz(quizId) {
        var q = '';
        $.ajax({
            url: 'rest/quiz/' + quizId,
            async: false,        // ikke optimal, gir advarsel i browser. ad-hoc løsning.
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                q = result;
            }
        });
        return q;
    };

    function calcDates(fradato, tildato) {
        var d = Math.abs(tildato - fradato);
        var arr = [];
        arr[0] = Math.floor(d/(1000*60) % 60);
        arr[1] = Math.floor(d/(1000*3600) % 24);
        arr[2] = Math.floor(d/(1000*3600*24));
        return arr;

    };
    function calcSpesDate(date) {
        var array = [];
        const millisLeft = date - Date.now();

        if (millisLeft > 0) {
            array[0] = Math.floor((millisLeft / 1000) % 60);
            array[1] = Math.floor((millisLeft / 1000 / 60) % 60);
            array[2] = Math.floor((millisLeft / (1000 * 60 * 60)) % 24);
            array[3] = Math.floor(millisLeft / (1000 * 60 * 60 * 24));
            return array;
        }
        return -1;


    }

    function getUsername() {
        return brukernavn;

    }
    function sorterTall(a,b) {
        return a.quizId - b.quizId;

    }
    function getUname() {
        return brukernavn;
    }

    function setUname(newName) {
        brukernavn = newName;
    }
    function getScoreboard(quizId) {
        var q = '';
        $.ajax({
            url: 'rest/scoreboard/' + quizId,
            async: false,        // ikke optimal, gir advarsel i browser. ad-hoc løsning.
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                q = result;
            }
        });
        return q;
    };

    function setScoreboard() {
        $.ajax({
            url: 'rest/scoreboard/',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                qid: 1, spiller: {navn: "KRistian",score:45}
            }),
            dataType: '',
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

    }
    function setNewScoreboard(id,scoreboard) {
        $.ajax({
            url: 'rest/scoreboard/' + id,
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(scoreboard),
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

    };




});

