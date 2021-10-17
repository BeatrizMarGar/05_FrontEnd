import DataService from "../services/DataService.js";
import adnewController from "../controllers/adnewController.js"
import MessageController from "../controllers/msgController.js"



window.addEventListener('DOMContentLoaded', function () {
    // Comprobamos que el usuario está autentificado, sino lo mandamos al login
    if (DataService.isAuthenticed() === false) {
        window.location.href = '/login.html?next=/new.html'
    }
    // Seleccionamos el nodo
    const form = document.querySelector('form')

    // Instanciamos el controlador
    new adnewController(form)

    // Nodo para mensajes
    const messages = document.querySelector('.error_message')

    // Instanciamos el controlador de mensajes
    new MessageController(messages)

})
