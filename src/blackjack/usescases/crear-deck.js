import _ from 'underscore';

/**
 * Esta función crea un nuevo deck
 * @param {Array<string>} letras Ejemplo: ['C', 'D', 'H', 'S']
 * @param {Array<string>} especiales Ejemplo: ['A', 'J', 'Q', 'K']
 * @returns {Array<string>} retorna un nuevo deck de cartas
 */
export const crearDeck = (letras, especiales) => {

    if( !letras || letras.length === 0 )
        throw new Error('letras es obligatorio como un arreglo de string');

    if( !especiales || especiales.length === 0 )
        throw new Error('especiales es obligatorio como un arreglo de string');

    let deck = [];

    for(let letra of letras) {
        for(let i=2; i<=10; i++) {
            deck.push(i + letra);
        }

        for(let especial of especiales) {
            deck.push(especial + letra);
        }
    }

    deck = _.shuffle(deck);

    return deck;
}