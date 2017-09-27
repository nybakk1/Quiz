$(document).ready(function () {
    var brukernavn = "anon";
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
        $("#quiz_runner").append("<div class=\"text-center jumbotron kanten\"><h4>Du har valgt quiz #" + q.quizId + ": " + q.navn + "<br>Quizen består av " + q.sporsmal.length + " spørsmål  </h4></div>");
        if (q.start < new Date() && q.start != null){
            var $add = $("<div class=\"text-center jumbotron kanten \" id=\"startQuiz\"><h3> Start Quiz </h3></div>");
            $add.click(function () {
                $("#quiz_runner").hide("slow");
                runQuiz(q.quizId,0);
            });
            $("#quiz_runner").append($add);
        } else {
            var $nope = $("<div class=\"text-center jumbotron kanten \" id='ingenQuiz'> <h4>Quiz har ikke startet enda</h4> </div>");
            $("#quiz_runner").append($nope);
        }


    }
    function runQuiz(qz,i) {
        var kvis = getQuiz(qz);
        //$("#quiz_runner").hide("slow");
        $("#spmop").show();
        $("#nuKjorVi").show();
        var $s = $("<div class=\"text-center jumbotron\"> " + kvis.sporsmal[i].sporsmal + "<img src=\"http://d1qtywusn5i66q.cloudfront.net/app/uploads/2016/03/Bilde-elephant-80x120cm-kr1499-A-m%C3%B8bler.jpg\"  style='width:200;height:200px'> </div>");
        $("#spmop").replaceWith($s);
        var $alts = $("<div class=\'text-center jumbotron\' id='ssss' style='width: 50%; float: left'> " + kvis.sporsmal[i].svarAlternativ[0].svaralternativ + "</div>" +
            "<div class=\'text-center jumbotron\' id='ssss' style='width: 50%; float:right'> " + kvis.sporsmal[i].svarAlternativ[1].svaralternativ + "</div>" +
            "<div class=\'text-center jumbotron\' id='ssss' style='width: 50%; float: left'> " + kvis.sporsmal[i].svarAlternativ[2].svaralternativ + "</div>" +
            "<div class=\'text-center jumbotron\' id='ssss' style='width: 50%; float: right'> " + kvis.sporsmal[i].svarAlternativ[3].svaralternativ + "</div>");
        $alts.click(function () {
            if (this.innerHTML.trim() == kvis.sporsmal[i].svarAlternativ[kvis.sporsmal[i].riktigSvar - 1].svaralternativ){
                console.log("BRAPPP" + this.innerHTML);
                $(this).css("background-color","darkgreen");
            } else {
                $(this).css("background-color","red");
            }

        });
        $("#nuKjorVi").replaceWith($alts);

    }

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



});


