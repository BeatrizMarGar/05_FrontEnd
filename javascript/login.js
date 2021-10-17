import loginController from '../controllers/loginController.js';
import msgController from '../controllers/msgController.js';
import errorController from '../controllers/errorController.js';

window.addEventListener('DOMContentLoaded', function(){

    const form = document.querySelector('form')

    new loginController(form)

    const msg = document.querySelector('.error_message')

    new msgController(msg)
    //new errorController(msg)

})