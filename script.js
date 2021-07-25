// INITIAL DATA
let square = { // Início sem nada preenchido
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let turn = ''; // Vez do jogador
let warning = ''; // Resultado do jogo
let playing = false; // Atualmente o jogo está parado

reset();

// EVENTS
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// FUNCTIONS
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random()*2);
    player = (random === 0) ? 'x' : 'o'; // Escolhe entre 0 e 1 sendo 0=x e 1=o

    for (let i in square) { // Loop em cada um dos itens dos objetos e colocando espaço em branco
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() { // Verifica se tem algo preenchido nos objetos e preenche o HTML
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo() { // Preenche o playing e o warning
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() { // Alterna entre os jogadores
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() { // Checar se já houve um vencedor ou um empate
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu!';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu!';
        playing = false;
    } else if (isFull()) {
        warning = 'Empatou!';
        playing = false;
    }
}

function checkWinnerFor(player) { // Verificar o vencedor
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if (hasWon) {
            return true;
        }
    }
    return false;
}

function isFull() { // VErifica se o tabuleiro está completo, porém, sem vencedor
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}