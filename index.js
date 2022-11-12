$('#submit').on('click', getData);

function clearResults() {
    $('#result').empty();
}

function getData() {
    clearResults();
    fetch(`http://localhost:3030/triva/${$('#input').val()}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0;i< data.length; i++){
                trivaCards(data[i]);
            }
        });
}

function trivaCards(data){
    console.log(data);
    
    let $Resultcard = $('<span class="card">');
    let $cardTitle = $('<h3 class="card-title" style=text-align:center;> <b>Good luck!</b></h3>');
    let $cardImg = $(`<img class="img-thumbnail" src="${data.img}"></ul>`)
    let $question = $(`<div class='box'> <b>question</b> ${data.question}</div>`);
    let $correct = $(`<button class='choice'> <b></b> ${data.correct_answer} </button>`);
    let $optionsOne = $(`<button class='choice'> <b></b> ${data.options[0]} </button>`);
    let $optionsTwo = $(`<button class='choice'> <b></b> ${data.options[1]} </button>`);
    let $optionsThree = $(`<button class='choice'> <b></b> ${data.options[2]} </button>`);
    $Resultcard.append($cardTitle, $cardImg, $question, $correct, $optionsOne, $optionsTwo, $optionsThree);
    $('#result').append($Resultcard);
}

