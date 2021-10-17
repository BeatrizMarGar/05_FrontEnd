import msgController from '../controllers/msgController.js'
//import SearchController from './controllers/SearchController.js'
import adListController from '../controllers/adlistController.js'

window.addEventListener('DOMContentLoaded', function() {

    // controlador de mensajes de error
    const errorDiv = document.querySelector('.error-message')
    const MSGController = new msgController(errorDiv)

    const adListDiv = document.querySelector('.adList')

    const adlistController = new adListController(adListDiv, MSGController)

    adlistController.renderAds()
/*
    const search = document.querySelector('#search')
    new SearchController(search)
*/
})
