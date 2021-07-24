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

// FUNCTIONS
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
}

function renderInfo() { // Preenche o playing e o warning
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}