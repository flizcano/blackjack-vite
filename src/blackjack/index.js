import _ from 'underscore';
import { crearDeck, pedirCarta, valorCarta, pintarCarta, turnoComputadora } from "./usescases";

let deck = [];
const letras = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;

//Referencias del html
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const tagPuntosJugador = document.querySelector(".jugador small");
const tagPuntosComputadora = document.querySelector(".computadora small");

const contenedorJugadorCartas = document.querySelector('.jugador-cartas');
const contenedorComputadorCartas = document.querySelector('.computadora-cartas');

deck = crearDeck(letras, especiales);


//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta(deck);

    puntosJugador = puntosJugador + valorCarta(carta);

    tagPuntosJugador.innerText = puntosJugador;

    pintarCarta(carta, contenedorJugadorCartas);

    if(puntosJugador>21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador, deck, contenedorComputadorCartas, tagPuntosComputadora);
    } else if(puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador, deck, contenedorComputadorCartas, tagPuntosComputadora);
    }

});

btnDetener.addEventListener('click', () => {
    if(puntosJugador>0) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador, deck, contenedorComputadorCartas, tagPuntosComputadora);
    }
});

btnNuevo.addEventListener('click', () => {
    puntosComputadora = 0, puntosJugador=0;
    tagPuntosJugador.innerText = 0;
    tagPuntosComputadora.innerText = 0;
    contenedorComputadorCartas.innerHTML = '';
    contenedorJugadorCartas.innerHTML = '';
    //btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnNuevo.disabled = true;

    deck = crearDeck(letras, especiales);
})