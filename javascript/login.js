import loginController from '../controllers/loginController.js';
import msgController from '../controllers/msgController.js';

window.addEventListener('DOMContentLoaded', function(){

    const form = document.querySelector('form')

    new loginController(form)

    const msg = document.querySelector('.messages')

    new msgController(msg)

})