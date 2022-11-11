$('#submit').on('click', getData);

function getData() {
    fetch('http://localhost:3030/triva')
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
    let $cardTitle = $('<h3 class="card-title"> <b>Good luck:</b></h3>');
    let $question = $(`<div class='box'> <b>question</b> ${data.question}</div>`);
    let $correct = $(`<button class='box'> <b></b> ${data.correct_answer} </button>`);
    let $optionsOne = $(`<button class='box'> <b></b> ${data.options[0]} </button>`);
    let $optionsTwo = $(`<button class='box'> <b></b> ${data.options[1]} </button>`);
    let $optionsThree = $(`<button class='box'> <b></b> ${data.options[2]} </button>`);
    $Resultcard.append($cardTitle, $question, $correct, $optionsOne, $optionsTwo, $optionsThree);
    $('#result').append($Resultcard);
}

