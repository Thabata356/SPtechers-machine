const mario = document.querySelector('.img_mario'); // Query selector retorna apenas o primeiro elemento encontrado
const pipe = document.querySelector('.img_pipe');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const winScreen = document.getElementById('win-screen');
const decimal = document.getElementById('ipt_demo1');
const mensagem = document.getElementById('mensagem');

let contarCanos = 0;
let canScore;
let isGameRunning = false;
let loop;

function startGame() {
    const valorRaw = decimal.value.trim();
    if (valorRaw === "") {
        alert("O campo está vazio! Digite um número.");
        return;
    }
    if (isNaN(valorRaw)) {
        alert("Isso não é um número! Digite apenas algarismos.");
        return;
    }
    isGameRunning = true;
    startScreen.style.display = 'none';
    pipe.classList.add('pipe-animation');
    runLoop();
}

const jump = () => { // Se você clicar uma vez em qualquer tecla a animação já tera acontecido e depois não acontecera de novo
    if (!isGameRunning) return;
    if (mario.classList.contains('jump')) return;
    mario.classList.add('jump');

    setTimeout(() => { //(função, tempo) 
        mario.classList.remove('jump'); //remover a classe jump para depois adiciona-lá de novo.
    }, 500);
}

const runLoop = () => {
    loop = setInterval(() => { // Um loop que vai ficar checando se perdemos ou não
        const pipePosition = pipe.offsetLeft;  // Fica checando a posição que o pipe está.

        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // O replace ('px', '') serve para tirar o px mas ele ainda aparece em string.
        // Ao invés de utilizar o number foi utilizado o + mas o Number tambem funcionaria.

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`; // Quando ele bate ele vai parar nessa posição

            mario.style.animation = 'none'; // Quando o Mario encosta no pipe ele fica na posição que ele encostou e não desce até o final
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './Imagens/game-over.png'; // Troca a imagem do Mario caso ele perca.
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            gameOverScreen.style.display = 'flex';
            isGameRunning = false;
            clearInterval(loop); // O loop para de rodar.
        }

        else if (pipePosition < 0 && canScore) {
            let numero = Number(decimal.value);
            contarCanos = contarCanos + 1;
            canScore = false;

            if (contarCanos == 1) {
                resultado_binario.innerHTML = "Binario: " + (numero.toString(2));
            }
            else if (contarCanos == 2) {
                resultado_octal.innerHTML = "Octal: " + (numero.toString(8));
            }
            else if (contarCanos == 3) {
                resultado_hexadecimal.innerHTML = "Hexadecimal: " + (numero.toString(16));
                mensagem.innerHTML = "VOCÊ CONSEGUIU CONVERTER TODOS OS NÚMEROS!";

                winScreen.style.display = 'flex';
                isGameRunning = false;
                pipe.style.animation = 'none';
                clearInterval(loop);
            }
        }
        if (pipePosition > 120) {
            canScore = true;
        }
    }, 10);
}

const restartGame = () => {
    location.reload();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});