// crear anillos de carga
export function loaderView() {
    return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
}
// carga exitosa
export function successView(msg) {
    return `<div class="success">
        ${msg}
        <button>Cerrar</button>
    </div>`
}
// carga fallida
export function errorView(msg) {
    return `<div class="error">
        ${msg}
        <button>Cerrar</button>
    </div>`
}
// estructura del anuncio
export function adView(ad) {
    return `<a href="/detail.html?id=${ad.id}">
    <div class="post">
        <strong class="author">${ad.author}</strong>
        <p class="description">${ad.description}</p>
        <p class="picture">${ad.picture}</p>
        <time datetime="${ad.date}">${ad.date}</time>
    </div>
    <hr>
</a>`
}
// detalle del anuncio
export function adDetailView(ad) {
    if (ad === null) { //si no existe el anuncio que vamos a cargar
        return '<h1>Lo siento, este anuncio no existe</h1>'
    }
    let button = ''
    if (ad.canBeDeleted) {
        button = '<button class="delete">Borrar</button>'
    }
    return `
        <strong class="author">${ad.author}</strong>
        <p class="description">${ad.description}</p>
        <p class="picture">${ad.picture}</p> 
        <time datetime="${ad.date}">${ad.date}</time>
        ${button}
    `
}
