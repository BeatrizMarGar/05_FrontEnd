//import LoaderController from "./controllers/LoaderController.js"
import msgController from "../controllers/msgController.js"
import addetailController from "../controllers/addetailController.js"

window.addEventListener('DOMContentLoaded', function() {

    const messagesDiv = document.querySelector('.messages')
    new msgController(messagesDiv)
/*
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)
*/
    // obtengo el ID del tweet a cargar de la URL
    const id = new URLSearchParams(window.location.search).get('id')
    
    // instanciamos el controlador del detalle del tweet
    const adDiv = document.querySelector('.ad')
    new addetailController(adDiv, id)

})
