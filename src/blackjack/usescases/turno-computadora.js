import { pedirCarta  } from "./";
import { pintarCarta  } from "./";
import { valorCarta  } from "./";

let puntosComputadora = 0,
    puntosMinimos = 0;
/**
 *
 * @param {Number} puntosJugador puntos del jugador que permiten calcular los puntos mínimos que la computadora necesita para ganar
 * @param {Array<String>} deck
 * @param {HTMLElement} contenedorComputadorCartas
 * @param {HTMLElement} tagPuntosComputadora
 */
export const turnoComputadora = async (puntosJugador, deck, contenedorComputadorCartas, tagPuntosComputadora) => {

    if( !puntosJugador ) throw new Error("Puntos del jugador son necesarios");
    if( !deck ) throw new Error("El deck es requerido");

    puntosMinimos =   (puntosJugador>21) ? 1 :
                      (puntosJugador === 21 ) ? 21 : puntosJugador;

    do {
        const  carta = pedirCarta(deck);
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
}