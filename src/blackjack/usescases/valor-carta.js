/**
 * Obtener el valor de la carta
 * @param {String} carta
 * @returns {Number} Retorna el valor de la carta
 */
export const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    return  (valor == '')   ? 0               :
            !isNaN(valor)   ? parseInt(valor) :
            (valor === 'A') ? 11              : 10;

}
