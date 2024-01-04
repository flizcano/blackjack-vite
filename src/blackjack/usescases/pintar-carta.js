export const pintarCarta = ( carta, contenedor ) => {
    let fragmento = document.createDocumentFragment();

    let img = document.createElement('img');
    img.src = `assets/cartas/${carta}.png`;
    img.classList.add('carta');

    fragmento.appendChild(img);
    contenedor.appendChild(fragmento);
}
