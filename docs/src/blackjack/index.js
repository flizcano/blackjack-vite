import _ from 'underscore';
import { crearDeck } from './usescases/crear-deck'

let deck = [];
let letras = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0,
    puntosMinimos = 0;

//Referencias del html
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const tagPuntosJugador = document.querySelector(".jugador small");
const tagPuntosComputadora = document.querySelector(".computadora small");

const contenedorJugadorCartas = document.querySelector('.jugador-cartas');
const contenedorComputadorCartas = document.querySelector('.computadora-cartas');

crearDeck();

//esta función me permite tomar una carta
const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    return  (valor == '')   ? 0               :
            !isNaN(valor)   ? parseInt(valor) :
            (valor === 'A') ? 11              : 10;

}

const pintarCarta = ( carta, contenedor ) => {
    let fragmento = document.createDocumentFragment();

    let img = document.createElement('img');
    img.src = `assets/cartas/${carta}.png`;
    img.classList.add('carta');

    fragmento.appendChild(img);
    contenedor.appendChild(fragmento);
}
//const valor = valorCarta(pedirCarta());

const turnoComputadora = async () => {

    puntosMinimos =   (puntosJugador>21) ? 1 :
                      (puntosJugador === 21 ) ? 21 : puntosJugador;

    console.log(puntosMinimos);

    do {
        const  carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);

        tagPuntosComputadora.innerText = puntosComputadora;
        pintarCarta(carta, contenedorComputadorCartas);

        // Introduce un retardo
        await new Promise(resolve => setTimeout(resolve, 1000)); // Retraso de 1 segundo

    } while (puntosComputadora < puntosMinimos);

    puntosComputadora = parseInt(puntosComputadora);

    mostrarMensajeGanador();

}

const mostrarMensajeGanador = () => {

    let mensaje = 'Gano Jugador';

    console.log('Los puntos mínimos son: ' + puntosMinimos);
    console.log('Los puntos computadora son: ' + puntosComputadora);

    if(puntosComputadora <= puntosMinimos || puntosComputadora<=21)
        if(puntosComputadora === puntosMinimos)
            mensaje = 'Es un empate';
        else
            mensaje = 'Gano computadora';

    console.warn(mensaje);
    alert(mensaje);
    btnNuevo.disabled = false;

}

//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    tagPuntosJugador.innerText = puntosJugador;

    pintarCarta(carta, contenedorJugadorCartas);

    if(puntosJugador>21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    } else if(puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    }

    console.log({carta, puntosJugador});
});

btnDetener.addEventListener('click', () => {
    if(puntosJugador>0) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();
    }
});

btnNuevo.addEventListener('click', () => {
    puntosComputadora = 0, puntosJugador=0;
    tagPuntosJugador.innerText = 0;
    tagPuntosComputadora.innerText = 0;
    contenedorComputadorCartas.innerHTML = '';
    contenedorJugadorCartas.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnNuevo.disabled = true;
    deck = [];
    crearDeck();
})