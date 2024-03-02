const combateArena = document.getElementById('arena');
const msjBatalla = document.getElementById('msj-batalla');
const imgTurnoJugador = document.getElementById('img-jugador-elige');
const imgTurnoComputadora = document.getElementById('img-pc-elige');
const botonPiedra = document.getElementById('btn-piedra');
const botonPapel = document.getElementById('btn-papel');
const botonTijera = document.getElementById('btn-tijera');
const inputIntentos = document.getElementById('intentos'); // Agregamos un input para que el usuario elija la cantidad de intentos

let opcionJugador;
let opcionComputadora;
let imgJugador;
let imgComputadora;
let intentosRestantes; // Variable para llevar el control de los intentos restantes
let jugadasRealizadas = 0; // Variable para contar las jugadas realizadas

const imagenes = [
    {
        name: "Piedra",
        url: "./assets/img/piedra.jpg"
    },
    {
        name: "Papel",
        url: "./assets/img/papel.jpg"

    },
    {
        name: "Tijera",
        url: "./assets/img/tijera.jpg"
    }
];

function iniciar() {
    combateArena.style.display = 'none';
    botonPiedra.disabled = true; // Desactivamos los botones hasta que el usuario elija la cantidad de intentos
    botonPapel.disabled = true;
    botonTijera.disabled = true;
}

inputIntentos.addEventListener('change', function () {
    const intentosElegidos = parseInt(inputIntentos.value); // Convertimos el valor del input a un número entero
    if (!isNaN(intentosElegidos) && intentosElegidos > 0) { // Verificamos que sea un número válido
        intentosRestantes = intentosElegidos; // Asignamos la cantidad de intentos restantes
        botonPiedra.disabled = false; // Activamos los botones una vez que el usuario elige la cantidad de intentos
        botonPapel.disabled = false;
        botonTijera.disabled = false;
    } else {
        alert("Por favor, ingresa una cantidad válida de intentos.");
    }
});

botonPiedra.addEventListener('click', function () {
    jugar("Piedra");
});

botonPapel.addEventListener('click', function () {
    jugar("Papel");
});

botonTijera.addEventListener('click', function () {
    jugar("Tijera");
});

function jugar(opcionSeleccionada) {
    opcionJugador = opcionSeleccionada;
    opPc();
    intentosRestantes--; // Descontamos un intento en cada jugada
    jugadasRealizadas++; // Aumentamos el contador de jugadas realizadas
    if (intentosRestantes === 0) {
        // Si se agotan los intentos, desactivamos los botones y mostramos un mensaje de finalización
        botonPiedra.disabled = true;
        botonPapel.disabled = true;
        botonTijera.disabled = true;
        alert("¡Se han agotado los intentos!");
    }
}

function opPc() {
    let aleatorio = nAleatorio();
    if (aleatorio === 0) {
        opcionComputadora = "Piedra";
    } else if (aleatorio === 1) {
        opcionComputadora = "Papel";
    } else if (aleatorio === 2) {
        opcionComputadora = "Tijera";
    }
    batalla();
}

function batalla() {
    if (opcionJugador === opcionComputadora) {
        msjBatalla.innerHTML = "Empate :)";
    } else if ((opcionJugador === "Piedra" && opcionComputadora === "Tijera") ||
        (opcionJugador === "Papel" && opcionComputadora === "Piedra") ||
        (opcionJugador === "Tijera" && opcionComputadora === "Papel")) {
        msjBatalla.innerHTML = "Ganaste!!!";
    } else {
        msjBatalla.innerHTML = "Perdiste :(";
    }

    addImagenes();
}

function nAleatorio() {
    return Math.floor(Math.random() * 3);
}

function addImagenes() {
    for (let i = 0; i < imagenes.length; i++) {
        if (opcionJugador === imagenes[i].name) {
            imgJugador = imagenes[i].url;
            imgTurnoJugador.innerHTML = `<img class="img-batalla" src=${imgJugador} alt="">`;
        }

        if (opcionComputadora === imagenes[i].name) {
            imgComputadora = imagenes[i].url;
            imgTurnoComputadora.innerHTML = `<img class="img-batalla" src=${imgComputadora} alt="">`;
        }
    }

    combateArena.style.display = 'flex';
}

window.addEventListener('load', iniciar);


