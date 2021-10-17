//import ErrorMessageController from './controllers/ErrorMessageController.js'
//import SearchController from './controllers/SearchController.js'
import adListController from '../controllers/adlistController.js'

window.addEventListener('DOMContentLoaded', function() {

    // controlador de mensajes de error
    //const errorDiv = document.querySelector('.error-message')
    //const errorMessageController = new ErrorMessageController(errorDiv)

    // coger el elemento del DOM (HTML) donde quiero cargar los tweets
    const adListDiv = document.querySelector('.adList')

    // crear un controlador pasándole el elemento del DOM donde cargar los tweets
    const adlistController = new adListController(adListDiv/*, errorMessageController*/)

    // decir al controlador que pinte los tweets
    adlistController.renderAds()
/*
    const search = document.querySelector('#search')
    new SearchController(search)
*/
})
