const ENV = 'production';
//const ENV = 'dev';

let apiUrl =
    ENV == 'dev'
        ? 'http://localhost:3001/'
        : 'https://trivia-mvp-project.onrender.com/';
console.log('API', apiUrl);


$('#submit').on('click', getInputquestions);
$('#submitTwo').on('click', getAllQuestions);
$('#ScoreBoard').on('click', getScoreBoard);
$('#createUser').on('click', getPost);
function clearResults() {
    $('#result').empty();
}

function getAllQuestions() {
    clearResults();
    fetch('http://localhost:3030/trivia')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                trivaCards(data[i]);
            }
        });
}

function getScoreBoard() {
    clearResults();
    fetch('http://localhost:3030/scoreboard')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                ScoreBoardDisplay(data[i]);
            }
        });
}

function getInputquestions() {
    clearResults();
    fetch(`http://localhost:3030/trivia/${$('#input').val()}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                trivaCards(data[i]);
            }

        });
}


function trivaCards(data) {
    console.log(data);

    let $Resultcard = $('<span class="card">');
    let $cardTitle = $('<h3 class="card-title" style=text-align:center;> <b>Good luck!</b></h3>');
    let $cardImg = $(`<img class="img-thumbnail" src="${data.img}"></ul>`);
    let $question = $(`<div class='box'> <b>question</b> ${data.question}</div>`);
    let $correct = $(`<button id='submitThree' class='choice'> <b></b> ${data.correct_answer} </button>`);
    let $optionsOne = $(`<button id='submitFour' class='choice'> <b></b> ${data.options[0]} </button>`);
    let $optionsTwo = $(`<button id='submitFive' class='choice'> <b></b> ${data.options[1]} </button>`);
    let $optionsThree = $(`<button id='submitSix' class='choice'> <b></b> ${data.options[2]} </button>`);
    $Resultcard.append($cardTitle, $cardImg, $question, $correct, $optionsOne, $optionsTwo, $optionsThree);
    $('#result').append($Resultcard);

    $('#submitThree').on('click', function onClick() {
        $('#submitThree').css('background-color', 'green');

    });

    $('#submitFour').on('click', function onClick() {
        $('#submitFour').css('background-color', 'salmon');
    });

    $('#submitFive').on('click', function onClick() {
        $('#submitFive').css('background-color', 'salmon');
    });

    $('#submitSix').on('click', function onClick() {
        $('#submitSix').css('background-color', 'salmon');
    });
}

function ScoreBoardDisplay(data) {
    console.log(data);

    let $Resultcard = $('<span class="card">');
    let $cardTitle = $('<h3 class="card-title" style=text-align:center;> <b>ScoreBoard</b></h3>');
    let $name = $(`<div class='box'> <b></b> Name:${data.name} </div>`);
    let $age = $(`<div class='box'> <b></b> Age: ${data.age} </div>`);
    let $score = $(`<div class='box'> <b></b> Score:${data.score} </div>`);
    $Resultcard.append($cardTitle, $name, $age, $score);
    $('#result').append($Resultcard);


}

function getPost() {
    clearResults();
    let $div = $('<div id=\'order\' class=\'card\' style=\'width: 25rem;\'></div>');
    let $input = $('<input class="form-control" type="text" placeholder="name" aria-label="default input example">');
    let $input1 = $('<input class="form-control" type="text" placeholder="age" aria-label="default input example">');
    let $input2 = $('<input class="form-control" type="text" placeholder="score" aria-label="default input example">');
    var $a = $('<a id=\'submit\' class=\'btn btn-primary\'>Submit</a>');
    $div.append($input, $input1, $input2, $a);
    $('#result').append($div);
    $a.on('click', function () {
        clearResults();
        fetch('http://localhost:3030/scoreboard', {
            // Adding method type
            method: 'POST',
            // Adding body or contents to send
            body: JSON.stringify({
                name: $input.val(),
                age: $input1.val(),
                score: $input2.val()
            }),
            // Adding headers to the request
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            // Converting to JSON
            .then(res => res.json())

            // Displaying results to console
            .then(data => console.log(data));
    });
}





