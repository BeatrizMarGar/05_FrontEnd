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
    return `<a href="/adDetail.html?id=${ad.id}">
    <div class="adfromdb">
        <strong class="name">${ad.name}</strong>
        <p class="description">${ad.description}</p>
        <p class="sale">${ad.sale}</p> 
    </div>
    
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
        <h1><h1>
        <strong class="author">${ad.name}</strong>
        <p class="description">${ad.description}</p>
        <p class="sale">${ad.sale}</p> 
        ${button}
    `
}
